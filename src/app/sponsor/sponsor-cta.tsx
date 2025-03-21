"use client";

import { InnerWrap, Wrapper } from "@/lib/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HandshakeIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es demasiado corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono inválido"),
  plan: z.string().optional(),
  message: z.string().min(10, "Por favor, escribe un mensaje más detallado"),
});

export default function SponsorCTA() {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: "",
      message: "",
    },
  });

  // Update form when plan is selected via URL
  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      form.setValue("plan", plan);
    }
  }, [searchParams, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/7l1tt47tk9cekkvhqhtjudzygqdo928c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      toast.success("¡Mensaje enviado! Nos pondremos en contacto pronto.");
      form.reset();
    } catch {
      toast.error("Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
    }
  }

  return (
    <Wrapper className="bg-gradient-to-b to-black from-brand-bg1" id="contact">
      <InnerWrap className="items-center justify-center max-w-3xl text-black">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-brand-primary/10 rounded-full mb-6">
            <HandshakeIcon className="h-8 w-8 text-brand-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">
            ¿Listo para Empezar?
          </h2>
          <p className="text-xl text-slate-400">
            Cuéntanos sobre tu marca y te contactaremos en 24-48 horas
          </p>
        </div>

        <div className="p-8 rounded-xl border border-slate-800 bg-slate-50">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              suppressHydrationWarning
            >
              <div
                className="grid md:grid-cols-2 gap-6"
                suppressHydrationWarning
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu nombre"
                          {...field}
                          suppressHydrationWarning
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
                          placeholder="tu@email.com"
                          type="email"
                          {...field}
                          suppressHydrationWarning
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className="grid md:grid-cols-2 gap-6"
                suppressHydrationWarning
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+34 600 000 000"
                          {...field}
                          suppressHydrationWarning
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Seleccionado</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sin plan seleccionado"
                          {...field}
                          disabled
                          className="bg-slate-100"
                          suppressHydrationWarning
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntanos sobre tu marca y qué tipo de colaboración te interesa..."
                        className="min-h-[100px]"
                        {...field}
                        suppressHydrationWarning
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-6 text-base font-medium bg-brand-highlight text-black hover:bg-brand-highlight/80"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </Form>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
