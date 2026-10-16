"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  Package,
  GraduationCap,
  MessageSquare,
  Settings,
  Menu,
  X,
  Globe,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const NAVIGATION = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "CONTENT MANAGEMENT",
    items: [
      {
        name: "Services",
        href: "/admin/services",
        icon: BriefcaseBusiness,
      },
      {
        name: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        name: "Portfolio",
        href: "/admin/portfolio",
        icon: Globe,
      },
      {
        name: "Courses",
        href: "/admin/courses",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      {
        name: "Messages",
        href: "/admin/messages",
        icon: MessageSquare,
      },
      {
        name: "Users",
        href: "/admin/users",
        icon: Users,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Navbar() {

 

  return (
    <>
      {/* Mobile top bar */}
      
    </>
  );
}
