"use client";
import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session.user.role !== "admin") {
    router.push("/dashboard");
    return null;
  }

  return <div className="min-h-full w-full">{children}</div>;
};

export default AdminLayout;
