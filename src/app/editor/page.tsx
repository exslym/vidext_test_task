"use client";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import EditorContent from "../_components/EditorContent";

export default function EditorPage() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <section className="flex-1 relative">
        <Tldraw>
          <EditorContent />
        </Tldraw>
      </section>
    </main>
  );
}
