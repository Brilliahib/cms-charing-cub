import { Metadata } from "next";

const defaultMetadataValues: Metadata = {
  title: "Charing Cub",
  description:
    "Charing Cub adalah aplikasi berbasis web yang dirancang khusus untuk membantu anak-anak dengan Down syndrome dalam memantau asupan gizi mereka dan belajar melalui permainan edukatif.",
  icons: {
    icon: "/images/favicon.ico",
  },
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
