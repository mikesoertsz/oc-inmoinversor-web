"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const subscriptionSchema = z.object({
  email: z.string().email("Dirección de correo electrónico no válida"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export default function CtaCommunity() {
  const {
    register,
    handleSubmit,
    formState: { },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit: SubmitHandler<SubscriptionFormData> = (data) => {
    console.log(data);
    // Manejar el envío del formulario, por ejemplo, enviar datos a la API
  };

  return (
    <section className="bg-gradient-to-t from-brand-bg1 to-brand-bg text-white py-[10dvh] sm:py-[5dvh]">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center sm:items-center items-stretch gap-2 flex-col sm:flex-row w-full"
        >
          <input
            type="email"
            placeholder="Introduce tu correo electrónico..."
            {...register("email")}
            className="px-4 py-2 rounded text-gray-100 bg-gray-700 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
          >
            Únete a más de 1K lectores
          </button>
        </form>
        <p className="text-gray-500 mt-4 sm:mt-2 text-sm">
          1 correo electrónico cada semana. Darse de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
}
