"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link href="/">
      <Button
        className="absolute top-2 left-2 z-10 px-5 py-2 bg-[#3182ed] text-white shadow-sm hover:bg-blue-400 transition"
        size="lg"
      >
        <ArrowLeft />
        Back to Home
      </Button>
    </Link>
  );
}
