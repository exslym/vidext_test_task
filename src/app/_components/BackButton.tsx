"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link href="/" className="z-10 max-w-fit">
      <Button
        className="px-5 py-2 bg-gray-secondary hover:bg-gray-600 rounded-lg shadow-sm dark:text-white dark:bg-gray-700 dark:hover:bg-gray-500"
        size="lg"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Button>
    </Link>
  );
}
