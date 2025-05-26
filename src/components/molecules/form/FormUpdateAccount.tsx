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
import { useAddUpdateAccount } from "@/http/auth/update-account";
import {
  updateAccountSchema,
  UpdateAccountType,
} from "@/validators/auth/update-account-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormUpdateAccountProps {
  session: Session;
}

export default function FormUpdateAccount({ session }: FormUpdateAccountProps) {
  const form = useForm({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name: session.user.name,
      email: session.user.email,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addUpdateAccountHandler, isPending } = useAddUpdateAccount({
    onError: (error: AxiosError<any>) => {
      toast.error("Gagal mengupdate account!", {
        description: error.response?.data.message || "Terjadi kesalahan",
      });
    },
    onSuccess: () => {
      toast.success("Berhasil mengupdate account!");
      queryClient.invalidateQueries({
        queryKey: ["update-account"],
      });
      router.refresh();
    },
  });

  const onSubmit = (body: UpdateAccountType) => {
    addUpdateAccountHandler(body);
  };
  return (
    <>
      <div className="w-full">
        <Card className="border">
          <CardContent className="p-6">
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
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
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
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end py-4">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Updating..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
