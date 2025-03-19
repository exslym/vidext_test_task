'use client';

import { useEditor } from '@tldraw/tldraw';
import { Button } from '@/components/ui/button';
import { modifyShape } from '@/lib/modifyShape';

export default function ModifyButton() {
	const editor = useEditor();

	return (
		<Button
			onClick={() => modifyShape(editor)}
			className='w-max-fit relative rounded-lg bg-blue-primary px-4 py-2 text-center text-white shadow-sm transition hover:bg-blue-400'
			size={'lg'}
		>
			Modify Shape
		</Button>
	);
}
