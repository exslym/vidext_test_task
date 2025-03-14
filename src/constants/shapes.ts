export const shapeSequence = [
  "cloud",
  "rectangle",
  "ellipse",
  "triangle",
  "diamond",
  "pentagon",
  "hexagon",
  "octagon",
  "star",
  "rhombus",
  "rhombus-2",
  "oval",
  "trapezoid",
  "arrow-right",
  "arrow-left",
  "arrow-up",
  "arrow-down",
  "x-box",
  "check-box",
  "heart",
] as const;

export type ShapeType = (typeof shapeSequence)[number];
