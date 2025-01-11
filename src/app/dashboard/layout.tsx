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
    default: "Dashboard | Charing Cub",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
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
