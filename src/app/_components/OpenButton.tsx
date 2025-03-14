"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function OpenButton() {
  return (
    <Link href="/editor" className="z-10 max-w-fit">
      <Button
        className="px-5 py-2 bg-gray-secondary hover:bg-gray-600 rounded-lg shadow-sm"
        size="lg"
      >
        <ArrowRight size={18} />
        Open Editor
      </Button>
    </Link>
  );
}
