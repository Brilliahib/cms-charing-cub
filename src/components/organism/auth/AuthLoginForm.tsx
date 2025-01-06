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
import { useToast } from "@/hooks/use-toast";
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

    toast.success("Login Successful", {
      description:
        "Welcome back! You have successfully logged into your account.",
    });

    router.push("/dashboard");
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="border-0 shadow-transparent">
        <div className="w-full md:p-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>
              Selamat datang! Silahkan masuk menggunakan akun anda.
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
                          type="text"
                          id="email"
                          placeholder="Masukkan email"
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Masuk"}{" "}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Belum punya akun?{" "}
                <Link href={"/register"}>
                  <span className="text-primary underline font-semibold">
                    Daftar Sekarang
                  </span>
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
