"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Music, Send } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post('/api/music', values);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Heading
        title="AI Music Composer"
        description="Transform your ideas into melodious tunes."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="flex-grow px-4 lg:px-8 space-y-6">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="
              rounded-lg 
              border-2
              border-emerald-200
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-lg
              transition-shadow
              duration-300
              space-y-4
            "
          >
            
            {!music && !isLoading && (
          <Empty label="Your symphony awaits! Start composing with AI." />
        )}
        <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-2 focus:border-emerald-500 rounded-full py-6 px-4"
                      disabled={isLoading} 
                      placeholder="Describe your musical idea (e.g., 'Upbeat jazz piano solo')" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              className="w-full rounded-full py-6 bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300" 
              type="submit" 
              disabled={isLoading}
            >
              
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  Compose <Music className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </Form>
        
        {music && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Your AI-Generated Masterpiece</h2>
            <audio controls className="w-full">
              <source src={music} />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default MusicPage;