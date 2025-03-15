'use client';

export default function Error({ message }: { message?: string }) {
	return (
		<div className='absolute inset-0 mx-auto flex max-w-2xl flex-col items-center justify-center gap-2 p-4 text-lg text-red-500'>
			<p>Error loading editor data!</p>
			{message && <p>Details: {message}</p>}
		</div>
	);
}
