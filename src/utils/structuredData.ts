import { Event } from "@/hooks/useEvents";
import { BlogArticle } from "@/data/blogArticles";

/**
 * Generate JSON-LD structured data for an event
 * Following schema.org Event specification
 * @see https://schema.org/Event
 */
export const generateEventStructuredData = (event: Event) => {
  const eventDate = new Date(event.event_date);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description || `Join us at Skybox Medellín for ${event.title}`,
    "startDate": eventDate.toISOString(),
    "endDate": eventDate.toISOString(), // If you have end_date, use that
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.venue || "Skybox Medellín",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Medellín",
        "addressCountry": "CO"
      }
    },
    "image": event.image_url || "https://lovable.dev/opengraph-image-p98pqg.png",
    "organizer": {
      "@type": "Organization",
      "name": "Skybox Medellín",
      "url": "https://skyboxmedellin.com"
    },
    "offers": event.price ? {
      "@type": "Offer",
      "url": `https://skyboxmedellin.com/events/${event.slug}`,
      "price": event.price.toString(),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    } : undefined,
  };

  // Remove undefined fields
  return JSON.parse(JSON.stringify(structuredData));
};

/**
 * Generate JSON-LD structured data for organization
 * Used on the main pages for better SEO
 */
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Skybox Medellín",
    "description": "Premier sports bar and watch party venue in Medellín",
    "url": "https://skyboxmedellin.com",
    "logo": "https://lovable.dev/opengraph-image-p98pqg.png",
    "image": "https://lovable.dev/opengraph-image-p98pqg.png",
    "telephone": "+57-XXX-XXXXXXX", // Add real phone number
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Medellín",
      "addressCountry": "CO"
    },
    "sameAs": [
      // Add social media URLs when available
      // "https://www.facebook.com/skyboxmedellin",
      // "https://www.instagram.com/skyboxmedellin",
      // "https://twitter.com/skyboxmedellin"
    ]
  };
};

/**
 * Generate JSON-LD structured data for a blog article
 * Following schema.org Article specification
 * @see https://schema.org/Article
 */
export const generateArticleStructuredData = (article: BlogArticle) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.publishedDate,
    "dateModified": article.publishedDate,
    "author": {
      "@type": "Person",
      "name": article.author.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Skybox Medellín",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lovable.dev/opengraph-image-p98pqg.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://skyboxmedellin.com/blog/${article.slug}`
    },
    "articleSection": article.category,
    "keywords": article.tags.join(", "),
    "wordCount": article.content.split(/\s+/).length,
    "timeRequired": article.readTime,
  };

  return JSON.parse(JSON.stringify(structuredData));
};
