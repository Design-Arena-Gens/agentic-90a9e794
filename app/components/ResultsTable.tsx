"use client";

import { BusinessLead } from "../types";

interface ResultsTableProps {
  leads: BusinessLead[];
}

export default function ResultsTable({ leads }: ResultsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "No Website":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Low Quality":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Good Quality":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Business Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Address
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Website Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Quality Score
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Links
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {leads.map((lead, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {lead.businessName}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {lead.category}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                <div>{lead.phone}</div>
                {lead.email && (
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    {lead.email}
                  </div>
                )}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                {lead.address}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    lead.websiteStatus
                  )}`}
                >
                  {lead.websiteStatus}
                </span>
                {lead.websiteIssues && lead.websiteIssues.length > 0 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {lead.websiteIssues.slice(0, 2).join(", ")}
                  </div>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {lead.qualityScore !== undefined ? (
                  <span
                    className={`font-semibold ${
                      lead.qualityScore >= 70
                        ? "text-green-600"
                        : lead.qualityScore >= 40
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {lead.qualityScore}/100
                  </span>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-4 py-4 text-sm">
                <div className="flex flex-col space-y-1">
                  {lead.website && (
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Website
                    </a>
                  )}
                  {lead.googleMapsUrl && (
                    <a
                      href={lead.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Maps
                    </a>
                  )}
                  {lead.facebookUrl && (
                    <a
                      href={lead.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Facebook
                    </a>
                  )}
                  {lead.instagramUrl && (
                    <a
                      href={lead.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
