import { WebsiteQuality } from "../types";
import axios from "axios";
import * as cheerio from "cheerio";

export async function analyzeWebsiteQuality(
  url: string
): Promise<WebsiteQuality> {
  const issues: string[] = [];
  let score = 100;

  try {
    // Ensure URL has protocol
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    const startTime = Date.now();

    // Fetch website with timeout
    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: (status) => status < 500,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const loadTime = Date.now() - startTime;
    const $ = cheerio.load(response.data);

    // Check SSL
    const hasSSL = url.startsWith("https://");
    if (!hasSSL) {
      issues.push("No SSL/HTTPS");
      score -= 15;
    }

    // Check load time
    if (loadTime > 5000) {
      issues.push("Slow loading (>5s)");
      score -= 10;
    }

    // Check for mobile viewport meta tag
    const hasViewport = $('meta[name="viewport"]').length > 0;
    if (!hasViewport) {
      issues.push("Not mobile-friendly");
      score -= 15;
    }

    // Check for modern HTML5 doctype
    const html = response.data.toLowerCase();
    const hasModernDoctype = html.includes("<!doctype html>");
    if (!hasModernDoctype) {
      issues.push("Outdated HTML");
      score -= 10;
    }

    // Check for contact information
    const bodyText = $("body").text().toLowerCase();
    const hasPhone =
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(bodyText);
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(bodyText);
    const hasContactInfo = hasPhone || hasEmail;

    if (!hasContactInfo) {
      issues.push("No clear contact info");
      score -= 10;
    }

    // Check for modern design indicators
    const hasCSS = $('link[rel="stylesheet"]').length > 0 || $("style").length > 0;
    const hasJS = $("script").length > 0;
    const hasImages = $("img").length > 0;

    let modernityScore = 0;
    if (hasCSS) modernityScore++;
    if (hasJS) modernityScore++;
    if (hasImages) modernityScore++;

    const isModern = modernityScore >= 2;
    if (!isModern) {
      issues.push("Very basic design");
      score -= 15;
    }

    // Check for common outdated indicators
    if (html.includes("<table") && html.includes("layout")) {
      issues.push("Table-based layout");
      score -= 10;
    }

    if (html.includes("<marquee") || html.includes("<blink")) {
      issues.push("Outdated HTML tags");
      score -= 10;
    }

    // Check for Flash
    if (html.includes(".swf") || html.includes("flash")) {
      issues.push("Uses Flash");
      score -= 15;
    }

    // Check title tag
    const title = $("title").text();
    if (!title || title.length < 10) {
      issues.push("Poor or missing title");
      score -= 5;
    }

    // Check meta description
    const metaDescription = $('meta[name="description"]').attr("content");
    if (!metaDescription || metaDescription.length < 20) {
      issues.push("No meta description");
      score -= 5;
    }

    // Check for broken images
    const images = $("img");
    let brokenImages = 0;
    images.each((i, elem) => {
      const src = $(elem).attr("src");
      if (!src || src === "" || src === "#") {
        brokenImages++;
      }
    });

    if (brokenImages > 0) {
      issues.push(`${brokenImages} broken image(s)`);
      score -= Math.min(10, brokenImages * 2);
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));

    return {
      score,
      issues,
      hasSSL,
      isMobileFriendly: hasViewport,
      loadTime,
      hasContactInfo,
      isModern,
    };
  } catch (error: any) {
    // Website is unreachable or has major issues
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return {
        score: 0,
        issues: ["Website unreachable"],
        hasSSL: false,
        isMobileFriendly: false,
        hasContactInfo: false,
        isModern: false,
      };
    }

    // For other errors, give a low score
    return {
      score: 20,
      issues: ["Error analyzing website", error.message],
      hasSSL: url.startsWith("https://"),
      isMobileFriendly: false,
      hasContactInfo: false,
      isModern: false,
    };
  }
}
