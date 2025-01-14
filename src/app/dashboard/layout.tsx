import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Sidenav from "@/components/organism/side/SideNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Charing Cub",
    default: "Dashboard",
  },
  description:
    "Charing Cub is a web-based platform designed to ensure the provision of high-quality childcare for children of working parents.",
  keywords:
    "daycare, tempat penitipan anak, daycare terdekat, childcare, layanan anak, tempat penitipan anak terpercaya",
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

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return (
    <SidebarProvider>
      <Sidenav session={session!}>{children}</Sidenav>;
    </SidebarProvider>
  );
}
