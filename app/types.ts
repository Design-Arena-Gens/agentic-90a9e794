export interface SearchParams {
  city: string;
  state: string;
  country: string;
  category: string;
  numberOfLeads?: number;
}

export interface BusinessLead {
  businessName: string;
  category: string;
  phone?: string;
  email?: string;
  address: string;
  website?: string;
  websiteStatus: "No Website" | "Low Quality" | "Good Quality" | "Unknown";
  qualityScore?: number;
  websiteIssues?: string[];
  googleMapsUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  justdialUrl?: string;
  indiamartUrl?: string;
}

export interface WebsiteQuality {
  score: number;
  issues: string[];
  hasSSL: boolean;
  isMobileFriendly: boolean;
  loadTime?: number;
  hasContactInfo: boolean;
  isModern: boolean;
}
