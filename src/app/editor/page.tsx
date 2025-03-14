"use client";

import { Tldraw } from "@tldraw/tldraw";
import EditorContent from "@/app/_components/EditorContent";
import BackButton from "@/app/_components/BackButton";
import Header from "@/app/_components/Header";
import "@tldraw/tldraw/tldraw.css";

export default function EditorPage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header>
        <BackButton />
      </Header>

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
