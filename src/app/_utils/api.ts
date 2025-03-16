import type { editorRouter } from '@/server/api/routers/editor';
import { createTRPCReact } from '@trpc/react-query';

export const api = createTRPCReact<typeof editorRouter>();
