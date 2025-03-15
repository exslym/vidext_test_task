'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEditor } from '@tldraw/tldraw';
import { api } from '@/app/_utils/api';
import { handleRecognition } from '@/app/_utils/handleRecognition';

export default function RecognizeButton() {
	const editor = useEditor();
	const mutation = api.recognizeShape.useMutation();

	const recognizeShape = async () => {
		try {
			await handleRecognition(editor, mutation);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unknown error occurred.');
			}
		}
	};

	return (
		<Button
			onClick={recognizeShape}
			disabled={mutation.isLoading}
			className='absolute right-2 top-2 z-10 translate-x-0 rounded-lg bg-green-600 px-5 py-2 text-white shadow-md transition hover:bg-green-500 sm:right-1/2 sm:translate-x-1/2'
			size={'lg'}
		>
			{mutation.isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
			{mutation.isLoading ? 'Recognizing...' : 'Recognize Shape (AI)'}
		</Button>
	);
}
