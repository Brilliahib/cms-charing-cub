import LoginForm from "@/components/organism/auth/AuthLoginForm";
import { defineMetadata } from "@/lib/metadata";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = defineMetadata({
  title: "Login",
});

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white grid md:grid-cols-2 grid-cols-1 flex items-center justify-center">
      <div className="relative h-full">
        <Image
          src="/images/background.png"
          alt="Background Login"
          width={2069}
          height={1381}
          className="h-full object-cover"
        />
        <Link
          href="/"
          className="absolute md:top-8 md:left-8 top-6 left-6 bg-white rounded-full p-2 shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      <LoginForm />
    </main>
  );
}
