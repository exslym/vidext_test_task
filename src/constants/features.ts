import { LucideIcon } from 'lucide-react';
import {
	BrainCircuit,
	Download,
	GalleryThumbnails,
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
		color: '#3b82f6',
	},
	{
		icon: Save,
		title: 'Save Projects',
		description:
			'Save your projects to the gallery for easy access and future editing.',
		color: '#facc15',
	},
	{
		icon: Shapes,
		title: 'Shape Modification',
		description:
			'Select a shape and easily switch between different geometric shapes using a dedicated button.',
		color: '#a855f7',
	},
	{
		icon: GalleryThumbnails,
		title: 'Project Gallery',
		description:
			'Organize your saved projects in the gallery, preview them, and manage them effortlessly.',
		color: '#ef4444',
	},
	{
		icon: Download,
		title: 'Export Options',
		description:
			'Download your work in multiple formats, including SVG and PNG.',
		color: '#6366f1',
	},
	{
		icon: BrainCircuit,
		title: 'AI Shape Recognition',
		description:
			'Select a hand-drawn shape and press the AI button to convert it into a precise geometric form.',
		color: '#22c55e',
	},
];
