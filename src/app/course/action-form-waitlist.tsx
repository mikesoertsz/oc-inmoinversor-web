"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GraduationCap, PartyPopper } from "lucide-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import tw from "tailwind-styled-components";

const Wrapper = tw.section`
  mx-auto w-full snap-always snap-center mx-auto px-6 lg:px-3 relative z-20 py-[5dvh] bg-zinc-900
`;

const InnerWrap = tw.div`
  mx-auto max-w-5xl w-full flex items-center justify-center flex-col py-[10dvh]
`;

const content = {
  form: {
    title: "Registro del Curso",
    subtitle: "Comienza tu viaje en la inversión inmobiliaria.",
    fields: {
      name: {
        label: "Nombre Completo",
        placeholder: "Juan Pérez",
        description: "Por favor, nombre y apellido.",
        validation: {
          required: "El nombre es obligatorio",
          minLength: "El nombre debe tener al menos 2 caracteres",
          maxLength: "El nombre debe tener menos de 50 caracteres",
        },
      },
      email: {
        label: "Correo Electrónico",
        placeholder: "juan@ejemplo.com",
        description:
          "El material del curso y las actualizaciones se enviarán a este correo",
        validation: {
          required: "El correo electrónico es obligatorio",
          format: "Por favor, introduce una dirección de correo válida",
        },
      },
      phone: {
        label: "Número de Teléfono",
        placeholder: "Introduce el número de teléfono",
        description:
          "Usaremos esto para enviarte actualizaciones importantes del curso",
        validation: {
          required: "El número de teléfono es obligatorio",
          format:
            "Por favor, introduce un número de teléfono válido con el código de país",
        },
      },
    },
    submit: {
      default: "Registrar en el Curso",
      loading: "Registrando...",
    },
    footer:
      "Al registrarte, aceptas nuestros Términos y Condiciones y Políticas de Privacidad",
  },
  success: {
    title: "¡Bienvenido a Bordo! 🎉",
    message:
      "Gracias por registrar tu interés en nuestro curso. Te hemos enviado un correo con más instrucciones. ¡Prepárate para comenzar tu viaje!",
    resetButton: "Restablecer Formulario",
  },
  notifications: {
    success:
      "¡Registrado con éxito en el curso! Nos pondremos en contacto pronto.",
    error: "El registro falló. Por favor, inténtalo de nuevo.",
  },
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: content.form.fields.name.validation.minLength })
    .max(50, { message: content.form.fields.name.validation.maxLength }),
  email: z
    .string()
    .email({ message: content.form.fields.email.validation.format }),
  phone: z
    .string()
    .min(1, { message: content.form.fields.phone.validation.required })
    .refine((val) => /^\+[1-9]\d{1,14}$/.test(val), {
      message: content.form.fields.phone.validation.format,
    }),
});

export function CourseSignupForm() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+34", // Predeterminado a España
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-50" />
        </div>
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Enviando formulario con datos:", values);
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/7l1tt47tk9cekkvhqhtjudzygqdo928c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`¡Error HTTP! estado: ${response.status}`);
      }

      // Trigger Google Ads conversion
      if (typeof window !== "undefined" && "gtag" in window) {
        window.gtag("event", "conversion", {
          send_to: "AW-16748317337/_x6_CIet54oaEJmVnLI-",
        });
      }

      toast.success(content.notifications.success);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error(content.notifications.error);
    }
  }

  function resetForm() {
    console.log("Restableciendo formulario");
    form.reset();
    setIsSubmitted(false);
  }

  return (
    <Wrapper>
      <InnerWrap>
        <div className="bg-slate-50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-50">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-6">
              <div className="flex justify-center items-center w-16 h-16 bg-primary/10 rounded-full">
                <PartyPopper className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                  {content.success.title}
                </h2>
                <p className="text-muted-foreground text-sm max-w-md">
                  {content.success.message}
                </p>
              </div>
              <Button onClick={resetForm} className="mt-6" variant="outline">
                {content.success.resetButton}
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-lg font-semibold tracking-tight text-gray-900 mb-2">
                  {content.form.title}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {content.form.subtitle}
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.form.fields.name.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={content.form.fields.name.placeholder}
                            {...field}
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription>
                          {content.form.fields.name.description}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.form.fields.email.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={content.form.fields.email.placeholder}
                            type="email"
                            {...field}
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription>
                          {content.form.fields.email.description}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>{content.form.fields.phone.label}</FormLabel>
                        <FormControl>
                          <PhoneInput
                            international
                            defaultCountry="ES"
                            value={value}
                            onChange={onChange}
                            placeholder={content.form.fields.phone.placeholder}
                          />
                        </FormControl>
                        <FormDescription>
                          {content.form.fields.phone.description}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full py-7 text-lg font-light tracking-normal"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? content.form.submit.loading
                      : content.form.submit.default}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>{content.form.footer}</p>
              </div>
            </>
          )}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
