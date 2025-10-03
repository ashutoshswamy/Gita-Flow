export default function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gita Flow",
    applicationCategory: "LifestyleApplication",
    description:
      "Seek divine wisdom from Lord Krishna through AI. Get personalized spiritual guidance inspired by the Bhagavad Gita.",
    url: "https://gita-flow.vercel.app",
    image: "https://gita-flow.vercel.app/og-image.png",
    author: {
      "@type": "Organization",
      name: "Gita Flow",
    },
    publisher: {
      "@type": "Organization",
      name: "Gita Flow",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Spiritual seekers, people seeking life guidance",
    },
    keywords:
      "Bhagavad Gita, Krishna wisdom, spiritual guidance, AI spirituality, Hindu philosophy, life advice",
  };
}
