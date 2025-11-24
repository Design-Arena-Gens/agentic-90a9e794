"use client";

import { useState } from "react";

interface SearchFormProps {
  onSearch: (params: any) => void;
  loading: boolean;
}

const CATEGORIES = [
  "Salon",
  "Gym",
  "Restaurant",
  "Boutique",
  "Coaching Classes",
  "Cafe",
  "Spa",
  "Yoga Studio",
  "Dental Clinic",
  "Law Firm",
  "Real Estate",
  "Auto Repair",
  "Pet Store",
  "Bakery",
  "Dry Cleaner",
  "Photography Studio",
  "Beauty Parlor",
  "Barber Shop",
  "Pharmacy",
  "Florist",
];

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [category, setCategory] = useState("");
  const [numberOfLeads, setNumberOfLeads] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      city,
      state,
      country,
      category,
      numberOfLeads,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Mumbai, Bangalore"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            State *
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Maharashtra, Karnataka"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country *
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., India, USA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Leads
          </label>
          <input
            type="number"
            value={numberOfLeads}
            onChange={(e) => setNumberOfLeads(parseInt(e.target.value) || 10)}
            min="1"
            max="50"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {loading ? "Searching..." : "Find Opportunities"}
      </button>
    </form>
  );
}
