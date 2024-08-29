"use client";

import { useState, useEffect } from "react";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between py-24 px-4 md:px-20 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Supercharge Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Content Creation
          </span>
        </h1>
        <div className="text-2xl md:text-3xl font-bold text-white">
          with AI-Powered
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            <TypewriterComponent
              options={{
                strings: [
                  "Chatbots",
                  "Photo Generation",
                  "Blog Writing",
                  "Email Composition"
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <p className="text-lg text-zinc-400 max-w-md mx-auto md:mx-0">
          Create content 10x faster with our advanced AI tools. Elevate your productivity today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="premium" className="w-full sm:w-auto text-lg p-6 rounded-full font-semibold">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" className="w-full sm:w-auto text-lg p-6 rounded-full font-semibold">
              Learn More
            </Button>
          </Link>
        </div>
        <p className="text-zinc-400 text-sm">
          No credit card required. Start for free.
        </p>
      </div>
      <div className="w-full md:w-1/2 mb-12 md:mb-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-30"></div>
          <img
            src="/api/placeholder/600/400"
            alt="AI-generated content"
            className="rounded-lg shadow-2xl relative z-10"
          />
        </div>
        <div className="mt-8 flex items-center justify-center md:justify-end space-x-4">
          <Zap className="text-yellow-400 h-6 w-6" />
          <p className="text-white font-semibold">Powered by cutting-edge AI technology</p>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;