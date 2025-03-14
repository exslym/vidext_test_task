"use client";

import { getSnapshot, loadSnapshot, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { api } from "../_utils/api";
import { useEffect } from "react";
import ModifyButton from "./ModifyButton";
import RecognizeButton from "./RecognizeButton";
import { Loader2 } from "lucide-react";

export default function EditorContent() {
  const editor = useEditor();
  const { data, isLoading, isError, error } = api.getData.useQuery();
  const mutation = api.setData.useMutation();

  useEffect(() => {
    if (editor && data) {
      loadSnapshot(editor.store, data);
    }
  }, [editor, data]);

  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.store.listen(() => {
      const snapshot = getSnapshot(editor.store);
      mutation.mutate(snapshot);
    });

    return () => unsubscribe();
  }, [editor, mutation]);

  if (isLoading || !editor) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="absolute inset-0 flex justify-center items-center text-red-500">
        Error loading editor data!
        <br />
        {`${error}`}
      </div>
    );
  }

  return (
    <>
      <ModifyButton />
      <RecognizeButton />
    </>
  );
}
