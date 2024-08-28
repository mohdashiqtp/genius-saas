"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-700",
    href: '/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: "text-emerald-500",
    href: '/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    href: '/code',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="px-6 py-8 ">
        <Link href="/dashboard" className="flex flex-col items-center space-y-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {/* <Image fill alt="Logo" src="/logo.png" className="object-cover" /> */}
          </div>
          <h1 className={cn("text-2xl font-bold text-white text-center", montserrat.className)}>
            Gen AI
          </h1>
        </Link>
      </div>
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 ease-in-out",
                pathname === route.href 
                  ? "bg-gray-700 text-white shadow-lg" 
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md mr-3",
                pathname === route.href ? route.color : "bg-gray-800"
              )}>
                <route.icon className={cn("h-5 w-5", pathname === route.href ? "text-white" : route.color)} />
              </div>
              <span className="flex-1">{route.label}</span>
              {pathname === route.href && (
                <div className="w-1.5 h-8 bg-white rounded-full ml-3" />
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto px-4 py-6">
        <FreeCounter 
          apiLimitCount={apiLimitCount} 
          isPro={isPro}
        />
      </div>
    </div>
  );
};