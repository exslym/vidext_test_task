'use client';

import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface SelectorProps {
	onSortChange: (
		value: 'lastEdited' | 'alphabeticalAsc' | 'alphabeticalDesc' | 'createdAt'
	) => void;
}

export default function Selector({ onSortChange }: SelectorProps) {
	const [sortType, setSortType] = useState<
		'lastEdited' | 'alphabeticalAsc' | 'alphabeticalDesc' | 'createdAt'
	>('lastEdited');

	const handleValueChange = (value: string) => {
		const sortValue = value as typeof sortType;
		setSortType(sortValue);
		onSortChange(sortValue);
	};

	return (
		<div className='flex w-full max-w-44 items-center justify-center gap-2'>
			<Select value={sortType} onValueChange={handleValueChange}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Sort by Last Edited' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='lastEdited'>Last Edited</SelectItem>
					<SelectItem value='alphabeticalAsc'>Alphabetical (A-Z)</SelectItem>
					<SelectItem value='alphabeticalDesc'>Alphabetical (Z-A)</SelectItem>
					<SelectItem value='createdAt'>Creation Date</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
