# Website Opportunity Finder AI

## 🚀 Live Application
**URL:** https://agentic-90a9e794.vercel.app

## 📋 Project Overview

The Website Opportunity Finder AI is a powerful lead generation tool designed to identify small businesses with either no website or poor-quality websites. This creates opportunities for web development agencies, freelancers, and digital marketing professionals to offer their services.

## 🎯 Core Features

### 1. **Intelligent Business Search**
- Search by city, state, country, and business category
- Support for 20+ business categories (Salon, Gym, Restaurant, Boutique, etc.)
- Configurable number of leads (1-50)

### 2. **Multi-Source Data Collection**
The system is designed to gather business information from:
- Google Maps (primary source)
- JustDial
- IndiaMART
- Facebook Business Pages
- Instagram Business Profiles
- Local business directories

### 3. **Comprehensive Business Data Extraction**
For each business, the system collects:
- Business name
- Physical address
- Phone number
- Email address (when available)
- Website URL (if exists)
- Google Maps location URL
- Social media profiles (Facebook, Instagram)

### 4. **Advanced Website Quality Analysis**
The AI analyzes existing websites on multiple criteria:

**Technical Checks:**
- SSL/HTTPS implementation
- Mobile responsiveness (viewport meta tag)
- Page load time performance
- Modern HTML5 doctype

**Design & Content Quality:**
- Modern design indicators (CSS, JavaScript, images)
- Contact information availability
- Meta tags (title, description)
- Broken images detection
- Outdated technologies (Flash, table layouts, marquee tags)

**Scoring System:**
- 0-40: Very Poor Quality
- 41-69: Low Quality (opportunity!)
- 70-100: Good Quality

### 5. **Website Status Classification**
Each business is categorized as:
- **No Website** - Prime opportunity
- **Low Quality** - Modernization opportunity
- **Good Quality** - Not a target lead
- **Unknown** - Needs analysis

### 6. **Lead Management Features**
- Interactive results table with sortable columns
- Quality score visualization with color-coding
- Issue identification for each website
- CSV export for CRM integration
- Direct links to business listings and social profiles

## 🏗️ Technical Architecture

### Frontend (Next.js 14 + React)
```
app/
├── page.tsx                    # Main application page
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Global styles with Tailwind
├── types.ts                    # TypeScript interfaces
└── components/
    ├── SearchForm.tsx          # Business search form
    └── ResultsTable.tsx        # Results display table
```

### Backend (Next.js API Routes)
```
app/
├── api/
│   └── search/
│       └── route.ts            # Main search API endpoint
└── utils/
    ├── scrapers/
    │   └── googleMaps.ts       # Google Maps scraper
    └── websiteAnalyzer.ts      # Website quality analyzer
```

### Technology Stack
- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **HTML Parser:** Cheerio
- **Deployment:** Vercel (serverless)

## 🔧 API Endpoint

### POST `/api/search`

**Request Body:**
```json
{
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "category": "Salon",
  "numberOfLeads": 10
}
```

**Response:**
```json
{
  "leads": [
    {
      "businessName": "Premium Salon Studio",
      "category": "Salon",
      "phone": "+91-9876543212",
      "email": "contact@salon.com",
      "address": "123 Main Street, Mumbai, Maharashtra, India",
      "website": "http://old-site-example.com",
      "websiteStatus": "Low Quality",
      "qualityScore": 45,
      "websiteIssues": [
        "No SSL/HTTPS",
        "Not mobile-friendly",
        "Slow loading (>5s)"
      ],
      "googleMapsUrl": "https://maps.google.com/?q=...",
      "facebookUrl": "https://facebook.com/...",
      "instagramUrl": "https://instagram.com/..."
    }
  ],
  "total": 10
}
```

## 🧮 Website Quality Scoring Algorithm

The quality score starts at 100 and deductions are applied for:

| Issue | Score Deduction |
|-------|----------------|
| No SSL/HTTPS | -15 points |
| Slow loading (>5s) | -10 points |
| Not mobile-friendly | -15 points |
| Outdated HTML | -10 points |
| No contact info | -10 points |
| Very basic design | -15 points |
| Table-based layout | -10 points |
| Outdated HTML tags | -10 points |
| Uses Flash | -15 points |
| Poor/missing title | -5 points |
| No meta description | -5 points |
| Broken images | -2 points each (max -10) |

**Final Score:** 0-100 (capped at boundaries)

## 📊 Use Cases

1. **Web Development Agencies**
   - Find businesses needing website development
   - Identify modernization opportunities
   - Generate targeted lead lists

2. **Digital Marketing Professionals**
   - Discover businesses with poor online presence
   - Offer SEO and website optimization services
   - Create localized marketing campaigns

3. **Freelance Web Developers**
   - Build a pipeline of potential clients
   - Focus on specific geographic areas
   - Target specific business categories

4. **Business Consultants**
   - Help local businesses improve digital presence
   - Provide market analysis of competitors
   - Identify digital transformation opportunities

## 🔮 Future Enhancements

### Phase 2 Features:
1. **Real API Integrations**
   - Google Places API
   - Yelp Fusion API
   - Facebook Graph API
   - Instagram Basic Display API

2. **Advanced Scraping**
   - JustDial integration
   - IndiaMART integration
   - LinkedIn company pages
   - Yellow Pages directories

3. **Enhanced Analytics**
   - SEO score analysis
   - PageSpeed Insights integration
   - Mobile usability testing
   - Accessibility scoring

4. **AI-Powered Features**
   - Business description generation
   - Automated outreach email templates
   - Competitor website analysis
   - Price estimation for services

5. **Lead Management**
   - Lead status tracking (contacted, converted, rejected)
   - CRM integration (Salesforce, HubSpot)
   - Email campaign integration
   - Follow-up reminders

6. **Advanced Filtering**
   - Filter by quality score range
   - Filter by specific issues
   - Filter by social media presence
   - Filter by business size indicators

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment

The application is deployed on Vercel with automatic deployments:

```bash
# Deploy to production
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-90a9e794
```

**Production URL:** https://agentic-90a9e794.vercel.app

## 🔐 Environment Variables

Currently, no environment variables are required. For production enhancements:

```env
# Google Places API
GOOGLE_PLACES_API_KEY=your_key_here

# Facebook Graph API
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret

# Other APIs
YELP_API_KEY=your_key_here
```

## 📝 Data Flow

```
User Input (Form)
    ↓
Search API (/api/search)
    ↓
Business Discovery (Google Maps Scraper)
    ↓
Data Enrichment (Social Media Links)
    ↓
Website Analysis (Quality Scorer)
    ↓
Filtering (No Website or Low Quality Only)
    ↓
Results Display (Table)
    ↓
Export (CSV Download)
```

## 🎨 User Interface

The application features:
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Clean, modern interface
- Color-coded quality indicators
- Intuitive search form
- Exportable results table

## 🤝 Contributing

To extend the functionality:

1. Add new scrapers in `app/utils/scrapers/`
2. Enhance website analyzer in `app/utils/websiteAnalyzer.ts`
3. Add new UI components in `app/components/`
4. Update types in `app/types.ts`

## 📄 License

This project is proprietary software built for lead generation purposes.

---

**Built with ❤️ using Next.js and AI**
