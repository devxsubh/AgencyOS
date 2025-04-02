// import { Metadata } from "next";

// interface MetadataProps {
//   title?: string;
//   description?: string;
//   icons?: Metadata["icons"];
//   noIndex?: boolean;
//   keywords?: string[];
//   author?: string;
//   twitterHandle?: string;
//   type?: "website" | "article" | "profile";
//   locale?: string;
//   alternates?: Record<string, string>;
//   publishedTime?: string;
//   modifiedTime?: string;
// }

// export const generateMetadata = ({
//   title = `Wonder Creative Studio - Web, App & Digital Marketing Solutions`,
//   description = `Boost your business with expert website development, app solutions, and digital marketing services. Grow your brand with Wonder Creative Studio!`,
//   icons = [
//     {
//       rel: "icon",
//       url: "/icons/icon-dark.avif",
//       media: "(prefers-color-scheme: light)",
//     },
//     {
//       rel: "icon",
//       url: "/icons/icon.avif",
//       media: "(prefers-color-scheme: dark)",
//     },
//   ],
//   noIndex = false,
//   keywords = [
//     "Website development services",
//     "Best digital marketing agency",
//     "App development company",
//     "Branding and design agency",
//     "Social media marketing services",
//     "SEO services for businesses",
//     "Performance marketing agency",
//     "Creative advertising solutions",
//     "UI/UX design services",
//     "Custom software development",
//     "Digital transformation solutions",
//     "Full-service marketing agency",
//     "Growth marketing strategies",
//     "Web development company",
//     "Top branding agency",
//     "Google Ads management",
//     "Facebook Ads expert",
//     "Lead generation services",
//     "Mobile app design agency",
//     "Ecommerce website development",
//     "B2B marketing solutions",
//     "Creative content agency",
//     "Influencer marketing agency",
//     "AI automation for marketing",
//     "Conversion rate optimization",
//     "SaaS marketing specialists",
//     "PPC advertising company",
//     "Local SEO services",
//     "Performance-driven marketing",
//     "Marketing automation experts",
//     "Custom WordPress website",
//     "Shopify store development",
//     "LinkedIn marketing strategies",
//     "High-converting landing pages",
//     "Professional logo design",
//     "Email marketing campaigns",
//     "Video marketing services",
//     "Content strategy consulting",
//     "Paid media marketing agency",
//     "International marketing solutions",
//     "Business development consulting",
//     "Custom CRM solutions",
//     "Tech-enabled marketing agency",
//     "Website speed optimization",
//     "Full-funnel marketing strategies",
//     "Real estate digital marketing",
//     "IT & software development agency",
//     "AI-driven marketing solutions",
//     "Data-driven marketing strategies",
//     "Cloud-based software solutions",
//     "Sales funnel optimization",
//     "Creative agency for startups",
//   ],
//   author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
//   type = "website",
// }: MetadataProps = {}): Metadata => {
//   const metadataBase = new URL(
//     process.env.NEXT_PUBLIC_APP_URL ||
//       "https://nextjs-wondercreativestudios.vercel.app/"
//   );

//   return {
//     metadataBase,
//     title: {
//       template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
//       default: title,
//     },
//     description,
//     keywords,
//     authors: [{ name: author }],
//     creator: author,
//     publisher: process.env.NEXT_PUBLIC_APP_NAME,
//     formatDetection: {
//       email: false,
//       address: false,
//       telephone: false,
//     },
//     icons,
//   };
// };

import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  twitterHandle?: string;
  type?: "website" | "article" | "profile";
  locale?: string;
  alternates?: Record<string, string>;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateMetadata = ({
  title = `Wonder Creative Studio - Web, App & Digital Marketing Solutions`,
  description = `Boost your business with expert website development, app solutions, and digital marketing services. Grow your brand with Wonder Creative Studio!`,
  icons = [
    {
      rel: "icon",
      url: "/icons/icon-dark.avif",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/icons/icon.avif",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  noIndex = false,
  keywords = [
    "Website development services",
    "Best digital marketing agency",
    "App development company",
    "Branding and design agency",
    "Social media marketing services",
    "SEO services for businesses",
    "Performance marketing agency",
    "Creative advertising solutions",
    "UI/UX design services",
    "Custom software development",
    "Digital transformation solutions",
    "Full-service marketing agency",
    "Growth marketing strategies",
    "Web development company",
    "Top branding agency",
    "Google Ads management",
    "Facebook Ads expert",
    "Lead generation services",
    "Mobile app design agency",
    "Ecommerce website development",
    "B2B marketing solutions",
    "Creative content agency",
    "Influencer marketing agency",
    "AI automation for marketing",
    "Conversion rate optimization",
    "SaaS marketing specialists",
    "PPC advertising company",
    "Local SEO services",
    "Performance-driven marketing",
    "Marketing automation experts",
    "Custom WordPress website",
    "Shopify store development",
    "LinkedIn marketing strategies",
    "High-converting landing pages",
    "Professional logo design",
    "Email marketing campaigns",
    "Video marketing services",
    "Content strategy consulting",
    "Paid media marketing agency",
    "International marketing solutions",
    "Business development consulting",
    "Custom CRM solutions",
    "Tech-enabled marketing agency",
    "Website speed optimization",
    "Full-funnel marketing strategies",
    "Real estate digital marketing",
    "IT & software development agency",
    "AI-driven marketing solutions",
    "Data-driven marketing strategies",
    "Cloud-based software solutions",
    "Sales funnel optimization",
    "Creative agency for startups",
  ],
  author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
  type = "website",
  publishedTime,
}: MetadataProps = {}): Metadata => {
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      "https://nextjs-wondercreativestudios.vercel.app/"
  );

  const metadata: Metadata = {
    metadataBase,
    title: {
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: process.env.NEXT_PUBLIC_APP_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons,
  };

  if (type === "article" && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type,
      publishedTime,
    };
  }

  return metadata;
};
