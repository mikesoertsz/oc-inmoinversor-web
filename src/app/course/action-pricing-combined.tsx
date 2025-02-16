"use client";

import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { GoCheck } from "react-icons/go";
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
import { GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const content = {
  cta: {
    preheading: "Únete a Nosotros Ahora",
    heading: "¡Desbloquea Tu Potencial Hoy!",
    subheading: "Plazas limitadas disponibles. ¡Actúa rápido!",
  },
  pricing: {
    title: "Acceso Completo",
    price: 2999,
    features: [
      "Todo el contenido online",
      "Mentoría personalizada",
      "Seminarios web exclusivos",
      "Oportunidades de coinversión",
      "Estrategias avanzadas inmobiliarias",
      "Plan de inversión personalizado",
    ],
    guarantee: "Garantía de satisfacción del 100% o te devolvemos el dinero",
  },
  form: {
    title: "Regístrate Ahora",
    subtitle: "Comienza tu viaje en inversión inmobiliaria",
    fields: {
      name: {
        label: "Nombre Completo",
        placeholder: "Juan García",
        description: "Nombre y apellidos, por favor",
        validation: {
          required: "El nombre es obligatorio",
          minLength: "El nombre debe tener al menos 2 caracteres",
          maxLength: "El nombre debe tener menos de 50 caracteres",
        },
      },
      email: {
        label: "Correo Electrónico",
        placeholder: "juan@ejemplo.com",
        description: "Recibirás los materiales del curso en este correo",
        validation: {
          required: "El correo electrónico es obligatorio",
          format: "Por favor, introduce un correo electrónico válido",
        },
      },
      phone: {
        label: "Teléfono",
        placeholder: "Introduce tu número de teléfono",
        description: "Lo usaremos para enviarte actualizaciones importantes",
        validation: {
          required: "El teléfono es obligatorio",
          format: "Por favor, introduce un número válido con código de país",
        },
      },
    },
    submit: {
      default: "Inscribirme al Curso",
      loading: "Procesando...",
    },
    footer:
      "Al registrarte, aceptas nuestros Términos y Condiciones y Política de Privacidad",
  },
  notifications: {
    success:
      "¡Registro completado con éxito! Nos pondremos en contacto contigo pronto.",
    error: "Error en el registro. Por favor, inténtalo de nuevo.",
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

export default function CombinedCTA() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+34",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success(content.notifications.success);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(content.notifications.error);
    }
  }

  return (
    <Wrapper className="bg-gradient-to-b from-black to-slate-900 py-[5dvh]">
      <InnerWrap>
        <TitleBlock
          preheading={content.cta.preheading}
          heading={content.cta.heading}
          subheading={content.cta.subheading}
          theme="dark"
          orientation="center"
        />

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto bg-slate-50 p-8 rounded-2xl">
          {/* Pricing Column */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-light tracking-tight">
                  {content.pricing.title}
                </h3>
                <p className="text-5xl font-light mt-2 tracking-tighter">
                  <span className="text-gray-800 text-2xl mr-3">€</span>
                  {content.pricing.price.toLocaleString("de-ES")}
                </p>
              </div>

              <ul className="gap-2">
                {content.pricing.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <GoCheck className="text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 pt-4 border-t">
              {content.pricing.guarantee}
            </p>
          </div>

          {/* Form Column */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-center mb-6">
              <div className="inline-flex justify-center items-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">
                {content.form.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {content.form.subtitle}
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <h3 className="text-xl font-medium">
                  ¡Gracias por registrarte!
                </h3>
                <p className="text-sm text-gray-600">
                  Te hemos enviado un correo con los siguientes pasos.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
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
                    className="w-full py-6 text-base font-medium mt-4"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? content.form.submit.loading
                      : content.form.submit.default}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    {content.form.footer}
                  </p>
                </form>
              </Form>
            )}
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
