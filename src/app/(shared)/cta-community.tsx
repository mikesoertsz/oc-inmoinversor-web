"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const ctaContent = {
  title: "Join Our Real Estate Community",
  description:
    "Subscribe to get updates about courses, new episodes, and more.",
};

const subscriptionSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export default function CtaCommunity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit: SubmitHandler<SubscriptionFormData> = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to API
  };

  return (
    <section className="bg-gray-500 text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h2 className="text-3xl font-bold mb-4">{ctaContent.title}</h2>
        <p className="mb-8">{ctaContent.description}</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center space-x-4"
        >
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="px-4 py-2 rounded text-gray-800"
            />
            {errors.email && (
              <p className="text-red-500 mt-2">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-white text-gray-800 px-6 py-2 rounded hover:bg-gray-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
