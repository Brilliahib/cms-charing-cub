import { Metadata } from "next";

const defaultMetadataValues: Metadata = {
  title: "Charing Cub | One Step to Embrace Love",
  description:
    "Charing Cub is a web-based platform designed to ensure the provision of high-quality childcare for children of working parents.",
  icons: [
    { rel: "icon", url: "/images/icons/favicon.ico", sizes: "16x16" },
    { rel: "icon", url: "/images/icons/favicon-32x32.png", sizes: "32x32" },
    {
      rel: "apple-touch-icon",
      url: "/images/icons/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/images/icons/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/images/icons/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
};

export const defineMetadata = (metadata?: Metadata) => {
  const title = metadata?.title
    ? `${metadata.title} | Charing Cub`
    : defaultMetadataValues.title;
  return {
    ...defaultMetadataValues,
    ...metadata,
    title,
  };
};
