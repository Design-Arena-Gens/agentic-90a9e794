import { BusinessLead, SearchParams } from "@/app/types";
import axios from "axios";
import * as cheerio from "cheerio";

export async function searchGoogleMaps(
  params: SearchParams
): Promise<BusinessLead[]> {
  const leads: BusinessLead[] = [];

  try {
    // Build search query
    const query = `${params.category} in ${params.city}, ${params.state}, ${params.country}`;
    const encodedQuery = encodeURIComponent(query);

    // Use Google search to find businesses
    // Note: In production, you should use Google Places API or similar
    const searchUrl = `https://www.google.com/search?q=${encodedQuery}`;

    // Generate mock data since web scraping Google is blocked
    // In production, use Google Places API, Yelp API, or similar services
    leads.push(...generateMockBusinessData(params));

    return leads;
  } catch (error) {
    console.error("Error searching Google Maps:", error);
    return leads;
  }
}

function generateMockBusinessData(params: SearchParams): BusinessLead[] {
  const businesses = [
    {
      name: `${params.category} Express`,
      hasWebsite: false,
      phone: "+91-9876543210",
      email: "",
    },
    {
      name: `City ${params.category}`,
      hasWebsite: true,
      website: "http://old-site-example.com",
      phone: "+91-9876543211",
      email: "contact@example.com",
    },
    {
      name: `Premium ${params.category} Studio`,
      hasWebsite: false,
      phone: "+91-9876543212",
      email: "",
    },
    {
      name: `${params.category} Hub`,
      hasWebsite: true,
      website: "http://basic-site.com",
      phone: "+91-9876543213",
      email: "info@example.com",
    },
    {
      name: `Modern ${params.category} Center`,
      hasWebsite: false,
      phone: "+91-9876543214",
      email: "",
    },
    {
      name: `Elite ${params.category}`,
      hasWebsite: true,
      website: "http://outdated-website.com",
      phone: "+91-9876543215",
      email: "",
    },
    {
      name: `${params.category} Pro`,
      hasWebsite: false,
      phone: "+91-9876543216",
      email: "hello@example.com",
    },
    {
      name: `Best ${params.category}`,
      hasWebsite: true,
      website: "http://simple-site.com",
      phone: "+91-9876543217",
      email: "",
    },
    {
      name: `${params.category} Plus`,
      hasWebsite: false,
      phone: "+91-9876543218",
      email: "",
    },
    {
      name: `Top ${params.category}`,
      hasWebsite: true,
      website: "http://basic-business.com",
      phone: "+91-9876543219",
      email: "contact@business.com",
    },
  ];

  return businesses.slice(0, params.numberOfLeads || 10).map((biz, index) => ({
    businessName: biz.name,
    category: params.category,
    phone: biz.phone,
    email: biz.email || undefined,
    address: `${index + 1}, Main Street, ${params.city}, ${params.state}, ${params.country}`,
    website: biz.hasWebsite ? biz.website : undefined,
    websiteStatus: biz.hasWebsite ? "Unknown" : "No Website",
    googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(
      biz.name + " " + params.city
    )}`,
    facebookUrl:
      Math.random() > 0.5
        ? `https://facebook.com/${biz.name.toLowerCase().replace(/\s+/g, "")}`
        : undefined,
    instagramUrl:
      Math.random() > 0.5
        ? `https://instagram.com/${biz.name.toLowerCase().replace(/\s+/g, "")}`
        : undefined,
  }));
}
