"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      
      const response = await axios.post('/api/conversation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        console.log(error)
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }

  return ( 
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      <Heading
        title="AI Conversation"
        description="Engage in intelligent dialogue with our advanced AI model."
        icon={MessageSquare}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />
      <div className="flex-grow overflow-auto px-4 lg:px-8 py-4">
        {messages.length === 0 && !isLoading ? (
          <Empty label="Start a new conversation" />
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={cn(
                  "p-4 rounded-lg max-w-[80%] break-words",
                  message.role === "user" 
                    ? "bg-blue-500 text-white ml-auto" 
                    : "bg-gray-200 text-gray-800"
                )}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p className="font-semibold">{message.role === "user" ? "You" : "AI"}</p>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-4 bg-white border-t">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex space-x-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      className="border rounded-full py-2 px-4 focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading} 
                      placeholder="Type your message here..." 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default ConversationPage;