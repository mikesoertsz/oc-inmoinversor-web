"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const subscriptionSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export default function CtaCommunity() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit: SubmitHandler<SubscriptionFormData> = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to API
  };

  return (
    <section className="bg-black text-white py-[5dvh]">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center space-x-2"
        >
          <input
            type="email"
            placeholder="Enter your email..."
            {...register("email")}
            className="px-4 py-2 rounded text-gray-800 bg-gray-700 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
          >
            Join 1K+ Readers
          </button>
        </form>
        <p className="text-gray-500 mt-2 text-sm">
          1 email every week. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
