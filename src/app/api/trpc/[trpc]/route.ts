import { createContext } from '@/server/api/context';
import { editorRouter } from '@/server/api/routers/editor';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: editorRouter,
		createContext,
	});

export { handler as GET, handler as POST };
