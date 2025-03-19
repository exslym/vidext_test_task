'use client';

import { toast } from 'react-hot-toast';
import { useEditor } from '@tldraw/tldraw';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { handleRecognition } from '@/lib/handleRecognition';

export default function RecognizeButton() {
	const editor = useEditor();
	const mutation = api.recognizeShape.useMutation();

	const recognizeShape = async () => {
		try {
			await handleRecognition(editor, mutation);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('An unknown error occurred.');
			}
		}
	};

	return (
		<Button
			onClick={recognizeShape}
			disabled={mutation.isLoading}
			className='relative w-44 rounded-lg bg-green-600 px-4 py-2 text-center text-white shadow-sm transition hover:bg-green-500'
			size={'lg'}
			aria-label='Recognize drawn shape with AI'
		>
			{mutation.isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
			{mutation.isLoading ? 'Recognizing...' : 'Recognize Shape (AI)'}
		</Button>
	);
}
