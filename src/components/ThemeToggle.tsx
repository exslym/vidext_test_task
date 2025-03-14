"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      size="lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="z-20 p-2 bg-gray-secondary hover:bg-gray-600 rounded-lg shadow-sm dark:text-white dark:bg-gray-700 dark:hover:bg-gray-500"
    >
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  );
}
