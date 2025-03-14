"use client";

import { Tldraw } from "@tldraw/tldraw";
import { useTheme } from "next-themes";
import EditorContent from "@/app/_components/EditorContent";
import BackButton from "@/app/_components/BackButton";
import Header from "@/app/_components/Header";
import "@tldraw/tldraw/tldraw.css";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect } from "react";

export default function EditorPage() {
  const { resolvedTheme, systemTheme } = useTheme();

  useEffect(() => {
    const themeToApply =
      resolvedTheme === "system" ? systemTheme : resolvedTheme;

    setTimeout(() => {
      if (document.querySelector(".tl-container")) {
        const tldrawContainer = document.querySelector(".tl-container");

        if (themeToApply === "dark") {
          tldrawContainer?.classList.add("tl-theme__dark");
          tldrawContainer?.classList.remove("tl-theme__light");
        } else {
          tldrawContainer?.classList.add("tl-theme__light");
          tldrawContainer?.classList.remove("tl-theme__dark");
        }
      }
    }, 50);
  }, [resolvedTheme, systemTheme]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Header>
        <div className="mx-auto w-full flex items-center justify-between">
          <BackButton />
          <ThemeToggle />
        </div>
      </Header>

      <main className="flex w-full h-full bg-light dark:bg-dark-secondary">
        <section className="flex-1 relative">
          <Tldraw>
            <EditorContent />
          </Tldraw>
        </section>
      </main>
    </div>
  );
}
