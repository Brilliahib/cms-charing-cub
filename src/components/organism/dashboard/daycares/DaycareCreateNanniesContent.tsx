"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useAddCreateNanniesFromDaycare } from "@/http/daycares/nannies/create-nannies-from-daycare";
import {
  createNanniesFromDaycareSchema,
  CreateNanniesFromDaycareType,
} from "@/validators/daycares/create-nannies-from-daycare-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function DaycareCreateNanniesContent() {
  const form = useForm<CreateNanniesFromDaycareType>({
    resolver: zodResolver(createNanniesFromDaycareSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "nannies",
    },
    mode: "onChange",
  });

  const { toast } = useToast();
  const router = useRouter();

  const {
    mutate: registerRequestHandler,
    isPending,
    data,
  } = useAddCreateNanniesFromDaycare({
    onError: (error) => {
      toast({
        title: "Gagal membuat akun nanny!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: "Berhasil membuat akun nanny!",
        description: "Anda berhasil membuat akun nanny",
        variant: "success",
      });
      return router.push("/dashboard");
    },
  });

  const onSubmit = (body: CreateNanniesFromDaycareType) => {
    registerRequestHandler({ ...body, role: "nannies" });
  };

  return (
    <div className="py-8">
      <Card className="shadow-xl">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form
              className="space-y-5 md:space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="email"
                        placeholder="Masukkan nama"
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
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Create Nanny"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
