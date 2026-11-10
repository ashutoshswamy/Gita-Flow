import { FAQ } from "@/lib/faq";

const URL = "https://gitaflow.ashutoshswamy.in";

export default function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${URL}/#website`,
        name: "Gita Flow",
        url: URL,
        inLanguage: "en",
      },
      {
        "@type": "WebApplication",
        name: "Gita Flow",
        url: URL,
        image: `${URL}/og-image.jpg`,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Any",
        description:
          "Seek divine wisdom from Lord Krishna through AI. Get personalized spiritual guidance inspired by the Bhagavad Gita.",
        author: { "@type": "Person", name: "Ashutosh Swamy", url: "https://ashutoshswamy.in" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
