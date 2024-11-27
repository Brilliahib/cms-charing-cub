"use client";

import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NanniesLayout = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session.user.role !== "nannies") {
    router.push("/dashboard");
    return null;
  }

  return <div className="min-h-full w-full">{children}</div>;
};

export default NanniesLayout;
