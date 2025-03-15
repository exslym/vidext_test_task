import { LucideIcon } from 'lucide-react';
import {
	BrainCircuit,
	Download,
	Palette,
	Pencil,
	Save,
	Shapes,
} from 'lucide-react';

interface Feature {
	icon: LucideIcon;
	title: string;
	description: string;
	color: string;
}

export const features: Feature[] = [
	{
		icon: Pencil,
		title: 'Draw & Edit',
		description: 'Create and modify sketches with an easy-to-use canvas.',
		color: 'text-blue-500',
	},
	{
		icon: Save,
		title: 'Auto Save',
		description:
			'Your sketches are saved automatically, so you never lose your progress.',
		color: 'text-yellow-500',
	},
	{
		icon: Shapes,
		title: 'Shape Modification',
		description:
			'Select a shape and easily switch between different geometric shapes using a dedicated button.',
		color: 'text-purple-500',
	},
	{
		icon: Palette,
		title: 'Clean & User-friendly Design',
		description:
			'Minimalist UI for distraction-free sketching and better user experience.',
		color: 'text-red-500',
	},
	{
		icon: Download,
		title: 'Export Options',
		description:
			'Download your work in multiple formats, including SVG and PNG.',
		color: 'text-indigo-500',
	},
	{
		icon: BrainCircuit,
		title: 'AI Shape Recognition',
		description:
			'Select a hand-drawn shape and press the AI button to convert it into a precise geometric form.',
		color: 'text-green-500',
	},
];
