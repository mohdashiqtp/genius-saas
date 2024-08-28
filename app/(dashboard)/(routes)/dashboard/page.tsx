/* eslint-disable react/no-unescaped-entities */

"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tools } from "@/constants";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-4">
            Discover AI's Potential
          </h1>
          <p className="text-xl text-blue-700">
            Engage with cutting-edge AI tools and unlock new possibilities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={cn("p-6 flex flex-col items-center", tool.bgColor)}>
                <tool.icon className={cn("w-16 h-16 mb-4 transition-transform group-hover:scale-110", tool.color)} />
                <h3 className="text-xl font-semibold text-center mb-2">{tool.label}</h3>
                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}