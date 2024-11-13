"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function ActionFormWaitlist() {
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
    } catch (error) {
      if (error instanceof Error) {
        toast("Error sending email: " + error.message);
      } else {
        toast("Error sending email: An unknown error occurred.");
      }
    }
  }

  return (
    <Wrapper className="flex flex-col h-full w-full bg-brand-bg1">
      <InnerWrap className="text-white py-[5dvh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div></div>
          <div className="flex items-start justify-start flex-col">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-start items-start gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email..."
                {...form.register("email")}
                className="px-6 h-12 bg-gray-200 placeholder-gray-500 text-black border-none flex"
              />
              <Button
                type="submit"
                className="bg-white text-black h-12 px-8 rounded hover:bg-gray-200"
              >
                Join Course Waitlist
              </Button>
            </form>
            <p className="text-gray-200 mt-4 text-sm w-full">
              We&apos;ll keep you in the loop on course updates.
            </p>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
