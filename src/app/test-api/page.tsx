'use client';

import { useState } from 'react';

export default function TestAPI() {
	const [response, setResponse] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleRequest = async (method: string, params?: unknown) => {
		try {
			const res = await fetch('http://localhost:3000/api/trpc', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					method,
					params,
					id: 1,
				}),
			});

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}

			const data = await res.json();
			setResponse(JSON.stringify(data, null, 2));
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred'
			);
			setResponse(null);
		}
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1>Test API</h1>

			<button
				onClick={() => handleRequest('projects.getAll')}
				style={{ margin: '10px' }}
			>
				Get All Projects
			</button>

			<button
				onClick={() =>
					handleRequest('projects.save', {
						name: 'New Project',
						data: {},
					})
				}
				style={{ margin: '10px' }}
			>
				Save New Project
			</button>

			<button
				onClick={() => handleRequest('projects.delete', { id: 'project1' })}
				style={{ margin: '10px' }}
			>
				Delete Project
			</button>

			{response && (
				<div>
					<h2>Response:</h2>
					<pre>{response}</pre>
				</div>
			)}

			{error && (
				<div>
					<h2>Error:</h2>
					<p>{error}</p>
				</div>
			)}
		</div>
	);
}
