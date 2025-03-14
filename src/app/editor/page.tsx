"use client";

import { Tldraw } from "@tldraw/tldraw";
import EditorContent from "@/app/_components/EditorContent";
import BackButton from "@/app/_components/BackButton";
import "@tldraw/tldraw/tldraw.css";

export default function EditorPage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="p-2 flex w-full bg-gray-primary [box-shadow:inset_0_-1px_gray]">
        <BackButton />
      </header>

      <main className="flex w-full h-full">
        <section className="flex-1 relative">
          <Tldraw>
            <EditorContent />
          </Tldraw>
        </section>
      </main>
    </div>
  );
}
