"use client";

import { getSnapshot, loadSnapshot, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { api } from "../_utils/api";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import ModifyButton from "./ModifyButton";
import RecognizeButton from "./RecognizeButton";
import Loading from "./Loading";
import Error from "./Error";

export default function EditorContent() {
  const editor = useEditor();

  const { resolvedTheme, systemTheme } = useTheme();
  const { data, isLoading, isError } = api.getData.useQuery();
  const mutation = api.setData.useMutation();

  useEffect(() => {
    if (!editor) return;

    const themeToApply =
      resolvedTheme === "system" ? systemTheme : resolvedTheme;
    const tldrawContainer = document.querySelector(".tl-container");

    if (tldrawContainer) {
      if (themeToApply === "dark") {
        tldrawContainer.classList.add("tl-theme__dark");
        tldrawContainer.classList.remove("tl-theme__light");
      } else {
        tldrawContainer.classList.add("tl-theme__light");
        tldrawContainer.classList.remove("tl-theme__dark");
      }
    }
  }, [editor, resolvedTheme, systemTheme]);

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
