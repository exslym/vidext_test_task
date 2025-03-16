'use client';

import { api } from '@/app/_utils/api';
import { handleRecognition } from '@/app/_utils/handleRecognition';
import { useEditor } from '@tldraw/tldraw';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

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
			className='relative z-10 w-44 rounded-lg bg-green-600 px-4 py-2 text-center text-white shadow-sm transition hover:bg-green-500'
			size={'lg'}
		>
			{mutation.isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
			{mutation.isLoading ? 'Recognizing...' : 'Recognize Shape (AI)'}
		</Button>
	);
}
