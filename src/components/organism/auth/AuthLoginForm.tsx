"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoginType, loginSchema } from "@/validators/auth/login-validator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (body: LoginType) => {
    setIsLoading(true);
    const res = await signIn("credentials", { ...body, redirect: false });
    setIsLoading(false);

    if (!res || res.error) {
      toast.error("Login Failed", {
        description:
          res?.error === "CredentialsSignin"
            ? "Email or password is wrong."
            : "An error occurred, please try again.",
      });
      return;
    }

    toast.success("Login Berhasil", {
      description:
        "Selamat datang kembali! Anda telah berhasil masuk ke akun Anda",
    });

    router.push("/dashboard");
  };

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <Card className="border-0 shadow-transparent">
          <div className="w-full md:p-10">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Masuk</CardTitle>
              <CardDescription>
                Selamat Datang! Silahkan isi email dan password terlebih dahulu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            id="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            id="password"
                            placeholder="Masukkan password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || !form.formState.isValid}
                    >
                      {isLoading ? "Loading..." : "Masuk"}{" "}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mt-6 text-center space-y-4">
                <div className="text-center text-sm">
                  Tidak punya akun?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4 text-primary"
                  >
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}
