"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  registerSchema,
  RegisterType,
} from "@/validators/auth/register-validator";
import { useRegister } from "@/http/auth/register";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function RegisterForm() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "user",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const {
    mutate: registerRequestHandler,
    isPending,
    data,
  } = useRegister({
    onError: (error) => {
      const errors = error.response?.data;

      if (errors.statusCode === 400) {
        toast.error("Email Sudah Terdaftar", {
          description: "Silahkan gunakan email yang lain untuk mendaftar",
        });
        return;
      }

      Object.keys(errors).forEach((k) => {
        form.setError(k as keyof RegisterType, {
          type: "manual",
          message: errors[k][0],
        });
      });

      toast.error("Gagal Mendaftar", {
        description: "Cek kembali data yang Anda masukkan",
      });
    },
    onSuccess: async () => {
      const res = await signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        redirect: false,
      });

      if (!res || res.error == "") {
        toast.error("Gagal Masuk", {
          description: "Kesalahan, coba lagi nanti",
        });
        return;
      }

      toast.success("Berhasil Mendaftar", {
        description:
          "Akun anda berhasil didaftarkan dan akan diarahkan ke dashboard",
      });
      return router.push("/dashboard");
    },
  });

  const onSubmit = (body: RegisterType) => {
    registerRequestHandler({ ...body });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="border-0 shadow-transparent">
        <div className="w-full md:p-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Daftar</CardTitle>
            <CardDescription>
              Selamat Datang! Masukkan data untuk mendaftarkan akun.
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          placeholder="johndoe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="daycare">Daycare</SelectItem>
                            <SelectItem value="nannies">Nannies</SelectItem>
                          </SelectContent>
                        </Select>
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
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Masukkan konfirmasi password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Daftar"}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <div className="text-center text-sm">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="underline underline-offset-4 text-primary"
                >
                  Masuk Sekarang
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
