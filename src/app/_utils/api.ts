import { createTRPCReact } from '@trpc/react-query';
import type { editorRouter } from '@/server/api/routers/editor';

export const api = createTRPCReact<typeof editorRouter>();
