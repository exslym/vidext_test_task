import { router, publicProcedure } from "../trpc";
import { z } from "zod";

let editorData = {};

export const editorRouter = router({
  getData: publicProcedure.query(() => editorData),

  setData: publicProcedure.input(z.any()).mutation(({ input }) => {
    editorData = input;
    return editorData;
  }),
});
