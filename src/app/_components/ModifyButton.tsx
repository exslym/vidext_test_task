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
      className="absolute z-10 px-5 py-2 bg-blue-primary hover:bg-blue-400 text-white shadow-sm transition rounded-lg
      md-840:right-1/2
      md-840:translate-x-1/2
      md-840:bottom-16
      sm:bottom-102px 
      sm:top-auto
      sm:right-1/2 
      sm:-translate-x-76px
      bottom-auto 
      top-14 
      right-2 
      translate-x-0"
      size={"lg"}
    >
      Modify Shape
    </Button>
  );
}
