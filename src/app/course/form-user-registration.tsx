"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

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
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es obligatorio." }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio." }),
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico no válida." }),
  contactNumber: z
    .string()
    .min(1, { message: "El número de contacto es obligatorio." }),
  countryCode: z
    .string()
    .min(1, { message: "El código de país es obligatorio." }),
});

export default function FormUserRegistration() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      countryCode: "ES", // Por defecto, España
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/2f8wfyklrsm88mxrf348rsqb6lgjhdk2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Load failed");
      }

      toast.success(
        "Hemos recibido tu registro. Revisa tu correo para más instrucciones."
      );
      setTimeout(() => {
        router.push("/thank-you");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Error inesperado: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2">
        <div className="mb-4">
          <h2 className="text-2xl font-medium mt-2">
            Formulario de Registro para el Curso
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Después de enviar el formulario, recibirás un correo electrónico.
            Por favor, revisa también tu carpeta de spam.
          </p>
        </div>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel className="w-1/4">Nombre</FormLabel>
              <FormControl className="w-3/4">
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel className="w-1/4">Apellido</FormLabel>
              <FormControl className="w-3/4">
                <Input placeholder="Apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel className="w-1/4">Email</FormLabel>
              <FormControl className="w-3/4">
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel className="w-1/4">Contacto</FormLabel>
              <FormControl className="w-3/4">
                <PhoneInput
                  placeholder="Introduce el número de teléfono"
                  defaultCountry="ES"
                  international
                  countryCallingCodeEditable={false}
                  {...field}
                  className="w-full shadow-sm border border-gray-50 rounded-md p-1 px-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex w-full mt-8" disabled={loading}>
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            "Registrarse para el curso"
          )}
        </Button>
        <p className="text-xs text-gray-500 mt-4">
          Al registrarte, aceptas nuestra{" "}
          <a href="/privacy-policy" className="text-blue-500 underline">
            Política de Privacidad
          </a>{" "}
          y nuestros{" "}
          <a href="/terms-and-conditions" className="text-blue-500 underline">
            Términos y Condiciones
          </a>
          .
        </p>
      </form>
    </Form>
  );
}
