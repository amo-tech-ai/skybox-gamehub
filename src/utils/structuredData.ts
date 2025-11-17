import { Event } from "@/hooks/useEvents";

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
