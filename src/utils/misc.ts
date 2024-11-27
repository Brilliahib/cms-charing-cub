export const generateFallbackFromName = (name: string) => {
  const parts = name.split(" ").map((word) => word[0]);
  return parts.slice(0, 2).join("");
};

export const buildFromAppURL = (path?: string | null) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!path) return appUrl;
  const url = new URL(path, appUrl);
  return url.toString();
};
