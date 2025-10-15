"use client";

import { InnerWrap, Wrapper } from "@/lib/atoms";
import { HandshakeIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TitleBlock } from "@/components/ui/titleblock";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePackageStore from "@/lib/usePackageStore";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(
      /^\+\d{1,3}\s\d{6,14}$/,
      "Teléfono inválido, debe ser un número internacional completo"
    ),
  plan: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar la Política de Privacidad para continuar",
  }),
  budgetClause: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar las cláusulas de presupuesto para continuar",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SponsorCTA() {
  const searchParams = useSearchParams();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: "",
      message: "",
      privacyPolicy: false,
      budgetClause: false,
    },
  });

  const selectedPackage = usePackageStore(
    (state: { selectedPackage: string }) => state.selectedPackage
  );

  // Update form when plan is selected via URL
  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      form.setValue("plan", plan);
    }
  }, [searchParams, form]);

  useEffect(() => {
    if (selectedPackage) {
      form.setValue("plan", selectedPackage);
    }
  }, [selectedPackage, form]);

  const onSubmit = async (data: FormValues): Promise<void> => {
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/7l1tt47tk9cekkvhqhtjudzygqdo928c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Trigger Google Ads conversion
      if (typeof window !== "undefined" && "gtag" in window) {
        window.gtag("event", "conversion", {
          send_to: "AW-16748317337/_x6_CIet54oaEJmVnLI-",
        });
      }

      toast.success("¡Mensaje enviado! Nos pondremos en contacto pronto.");
    } catch {
      toast.error("Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Wrapper
      className="bg-gradient-to-b from-black to-brand-bg1 py-24 pb-48"
      id="contact"
    >
      <InnerWrap className="flex flex-col items-center justify-center max-w-4xl py-0">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center w-16 h-16 bg-brand-primary/10 rounded-full mb-6">
            <HandshakeIcon className="h-8 w-8 text-brand-primary" />
          </div>
          <TitleBlock
            preheading="¿Listo para Empezar?"
            heading="Formulario para Patrocinadores"
            subheading="Cuéntanos sobre tu marca y te contactaremos pronto."
            theme="dark"
            orientation="center"
          />
        </div>

        <div className="w-full p-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              suppressHydrationWarning
            >
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-900"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  {...form.register("name")}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-900"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  {...form.register("email")}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-slate-900"
                    >
                      Teléfono
                    </label>
                    <FormControl>
                      <PhoneInput
                        placeholder="Introduce el número de teléfono"
                        defaultCountry="ES"
                        international
                        countryCallingCodeEditable={false}
                        {...field}
                        className="w-full px-3 py-2 border border-slate-200 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <label
                  htmlFor="plan"
                  className="text-sm font-medium text-slate-900"
                >
                  Plan de Interés
                </label>
                <Select
                  value={form.watch("plan")}
                  onValueChange={(value) => form.setValue("plan", value)}
                >
                  <SelectTrigger className="w-full px-3 py-2 border border-slate-200 rounded-md">
                    <SelectValue placeholder="Selecciona un plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Anuncio Único">Anuncio Único</SelectItem>
                    <SelectItem value="Campaña de 4 Episodios">
                      Campaña de 4 Episodios
                    </SelectItem>
                    <SelectItem value="Campaña de 12 Episodios">
                      Campaña de 12 Episodios
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-900"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos sobre tu marca y objetivos..."
                  {...form.register("message")}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md min-h-[100px]"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="privacyPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormMessage />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Acepto la{" "}
                        <Link
                          href="/legal/privacy-policy"
                          className="text-blue-600 underline hover:text-blue-800"
                          target="_blank"
                        >
                          Política de Privacidad
                        </Link>
                      </label>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetClause"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormMessage />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Acepto las{" "}
                        <Link
                          href="/legal/budget-clause"
                          className="text-blue-600 underline hover:text-blue-800"
                          target="_blank"
                        >
                          Cláusulas de Presupuesto
                        </Link>
                      </label>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="px-12 py-8 flex w-full items-center justify-center font-medium text-lg text-black transition duration-300 ease-in-out rounded-md bg-brand-highlight hover:bg-brand-highlight/90"
              >
                Enviar Mensaje
              </Button>
            </form>
          </Form>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
