"use client";

import { getSnapshot, loadSnapshot, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { api } from "../_utils/api";
import { useEffect } from "react";

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
        Loading...
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
}
