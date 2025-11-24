import { NextRequest, NextResponse } from "next/server";
import { BusinessLead, SearchParams } from "@/app/types";
import { searchGoogleMaps } from "@/app/utils/scrapers/googleMaps";
import { analyzeWebsiteQuality } from "@/app/utils/websiteAnalyzer";

export async function POST(request: NextRequest) {
  try {
    const searchParams: SearchParams = await request.json();

    if (!searchParams.city || !searchParams.country || !searchParams.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const leads: BusinessLead[] = [];

    // Search Google Maps (primary source)
    try {
      const googleResults = await searchGoogleMaps(searchParams);
      leads.push(...googleResults);
    } catch (error) {
      console.error("Google Maps search error:", error);
    }

    // Limit to requested number of leads
    const limitedLeads = leads.slice(0, searchParams.numberOfLeads || 10);

    // Analyze websites for quality
    const analyzedLeads = await Promise.all(
      limitedLeads.map(async (lead) => {
        if (lead.website && lead.websiteStatus !== "No Website") {
          try {
            const quality = await analyzeWebsiteQuality(lead.website);
            return {
              ...lead,
              qualityScore: quality.score,
              websiteIssues: quality.issues,
              websiteStatus:
                quality.score < 50
                  ? "Low Quality"
                  : quality.score < 70
                  ? "Low Quality"
                  : "Good Quality",
            };
          } catch (error) {
            console.error(`Error analyzing ${lead.website}:`, error);
            return lead;
          }
        }
        return lead;
      })
    );

    // Filter for businesses with no website or low quality websites
    const opportunityLeads = analyzedLeads.filter(
      (lead) =>
        lead.websiteStatus === "No Website" ||
        lead.websiteStatus === "Low Quality"
    );

    return NextResponse.json({
      leads: opportunityLeads,
      total: opportunityLeads.length,
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: error.message || "Search failed" },
      { status: 500 }
    );
  }
}

export const maxDuration = 60;
