"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { TitleBlock } from "@/components/ui/titleblock";
import Confetti from "react-dom-confetti";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function ActionFormWaitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const cta = {
    heading: "Join the Course Waitlist",
    body: "Sign up with your email to receive updates and exclusive offers.",
    button: "Join Course Waitlist",
    paragraph: "We'll keep you in the loop on course updates.",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: { email: string }) {
    try {
      await fetch(
        "https://hook.eu2.make.com/6zodovw77ro9bcpwd2nskohmawpj2ln1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );
      toast("Email has been sent successfully.");
      setSubmitted(true);
      setConfettiActive(true);
    } catch (error) {
      if (error instanceof Error) {
        toast("Error sending email: " + error.message);
      } else {
        toast("Error sending email: An unknown error occurred.");
      }
    }
  }

  return (
    <Wrapper
      className="flex flex-col h-full w-full from-brand-bg to-brand-bg1 bg-gradient-to-b"
      id="register"
    >
      <InnerWrap className="text-white py-[5dvh]">
        <TitleBlock
          heading={cta.heading}
          body={cta.body}
          theme="dark"
          orientation="center"
        />
        <div className="flex flex-col items-center justify-center w-full gap-4 text-center">
          {submitted ? (
            <div className="flex flex-col items-center">
              <div className="text-6xl">🎉</div>
              <Confetti active={confettiActive} />
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center items-center w-full gap-2 max-w-3xl"
            >
              <Input
                type="email"
                placeholder="Enter your email..."
                {...form.register("email")}
                className="px-6 h-12 bg-gray-200 placeholder-gray-500 text-black border-none flex"
              />
              <Button
                type="submit"
                className="bg-brand-highlight text-black text-lg h-12 px-8 rounded hover:bg-gray-200"
              >
                {cta.button}
              </Button>
            </form>
          )}
          <p className="text-gray-200 mt-1 text-sm w-full">{cta.paragraph}</p>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
