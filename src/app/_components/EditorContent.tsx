"use client";

import { getSnapshot, loadSnapshot, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { api } from "../_utils/api";
import { useEffect } from "react";
import Error from "./Error";
import ModifyButton from "./ModifyButton";
import RecognizeButton from "./RecognizeButton";
import Loading from "./Loading";

export default function EditorContent() {
  const editor = useEditor();
  const { data, isLoading, isError } = api.getData.useQuery();
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

  if (isLoading || !editor) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <ModifyButton />
      <RecognizeButton />
    </>
  );
}
