"use client";

import { TLShapeId, TLGeoShape, useEditor } from "@tldraw/tldraw";
import { Button } from "@/components/ui/button";
import { shapeSequence } from "@/constants/shapes";

export default function ModifyButton() {
  const editor = useEditor();

  const modifyShape = () => {
    if (!editor) return;

    const selectedShapes = editor.getSelectedShapes();

    if (selectedShapes.length === 0) {
      alert("No selected shape to modify.");
      return;
    }

    const shape = selectedShapes[0];

    if (shape.type !== "geo") {
      alert("Selected shape is not a geometric shape.");
      return;
    }

    const currentShape = (shape as TLGeoShape).props.geo;
    const currentIndex = shapeSequence.indexOf(currentShape);

    const nextShape = shapeSequence[(currentIndex + 1) % shapeSequence.length];

    editor.updateShape({
      id: shape.id as TLShapeId,
      type: "geo",
      props: { geo: nextShape },
    });
  };

  return (
    <Button
      onClick={modifyShape}
      className="absolute bottom-16 right-[50%] translate-x-[50%] z-10 px-5 py-2 bg-[#3182ed] text-white shadow-sm hover:bg-blue-400 transition max-[840px]:bottom-[102px] max-[840px]:right-[50%] max-[840px]:translate-x-[-76px] max-[640px]:bottom-auto max-[640px]:top-2 max-[640px]:right-2 max-[640px]:translate-x-0 rounded-lg"
      variant="default"
      size={"lg"}
    >
      Modify Shape
    </Button>
  );
}
