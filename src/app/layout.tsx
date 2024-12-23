import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Figtree } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/organism/GlobalProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
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

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${jakartaSans.variable} antialiased`}
    >
      <body>
        <GlobalProvider>
          <main className="font-jakarta">{children}</main>
          <Toaster />
        </GlobalProvider>
      </body>
    </html>
  );
}
