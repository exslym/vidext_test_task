"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link href="/" className="z-10 max-w-fit">
      <Button
        className=" px-5 py-2 bg-blue-primary text-white shadow-sm hover:bg-blue-400 transition"
        size="lg"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Button>
    </Link>
  );
}
