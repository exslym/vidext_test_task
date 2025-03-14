"use client";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import EditorContent from "../_components/EditorContent";
import BackButton from "@/components/BackButton";

export default function EditorPage() {
  return (
    <>
      <header className="absolute flex w-full h-[56px] border-foreground border-b bg-gray">
        <BackButton />
      </header>
      <main className="w-screen h-screen flex flex-col">
        <section className="flex-1 relative pt-14">
          <Tldraw>
            <EditorContent />
          </Tldraw>
        </section>
      </main>
    </>
  );
}
