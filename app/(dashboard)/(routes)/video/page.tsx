"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FileAudio, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(null);
      const response = await axios.post('/api/video', values);
      setVideo(response.data[0]);
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Heading
        title="AI Video Generator"
        description="Transform your ideas into captivating videos."
        icon={FileAudio}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="flex-grow px-4 lg:px-8">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              space-y-4
            "
          >
           
            {!video && !isLoading && (
          <Empty label="Your video masterpiece awaits! Start generating now." />
        )}
         <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-2 focus:border-orange-500 rounded-full py-6 px-4"
                      disabled={isLoading} 
                      placeholder="Clown fish swimming in a coral reef..." 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full rounded-full py-6" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  Generate <Wand2 className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </Form>
        
        {video && (
          <div className="mt-8">
            <Card className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <video controls className="w-full aspect-video">
                <source src={video} />
              </video>
              <CardFooter className="p-4">
                <Button onClick={() => window.open(video || undefined)} variant="secondary" className="w-full rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
   );
}
 
export default VideoPage;