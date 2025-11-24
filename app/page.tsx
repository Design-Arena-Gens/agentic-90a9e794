"use client";

import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsTable from "./components/ResultsTable";
import { BusinessLead } from "./types";

export default function Home() {
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchParams: any) => {
    setLoading(true);
    setError(null);
    setLeads([]);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setLeads(data.leads);
    } catch (err: any) {
      setError(err.message || "An error occurred during search");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "Business Name",
      "Category",
      "Phone",
      "Email",
      "Address",
      "Website",
      "Website Status",
      "Quality Score",
      "Issues",
      "Google Maps URL",
      "Facebook",
      "Instagram",
    ];

    const rows = leads.map((lead) => [
      lead.businessName,
      lead.category,
      lead.phone || "",
      lead.email || "",
      lead.address,
      lead.website || "",
      lead.websiteStatus,
      lead.qualityScore?.toString() || "",
      lead.websiteIssues?.join("; ") || "",
      lead.googleMapsUrl || "",
      lead.facebookUrl || "",
      lead.instagramUrl || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Website Opportunity Finder AI
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover businesses with poor or missing websites
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Searching for businesses...
            </p>
          </div>
        )}

        {leads.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Found {leads.length} Leads
              </h2>
              <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Export to CSV
              </button>
            </div>
            <ResultsTable leads={leads} />
          </div>
        )}
      </div>
    </div>
  );
}
