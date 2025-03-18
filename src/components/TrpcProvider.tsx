'use client';

import { useState } from 'react';
import { api } from '@/app/_utils/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

export default function TrpcProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());
	const trpcClient = api.createClient({
		links: [httpBatchLink({ url: '/api/trpc' })],
	});

	return (
		<api.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</api.Provider>
	);
}
