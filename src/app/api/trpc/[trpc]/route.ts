import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { editorRouter } from "@/server/api/routers/editor";
import { createContext } from "@/server/api/context";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: editorRouter,
    createContext,
  });

export { handler as GET, handler as POST };
