import { Previews, ProjectMetadata, Projects } from '@/types/types';
import { format, isValid } from 'date-fns';
import { deleteProject, getPreviews, getProjects } from '@/lib/storage';

export function handleDelete(
	name: string,
	setProjects: (value: Projects) => void,
	setPreviews: (value: Previews) => void
) {
	deleteProject(name);

	// Retrieve the updated list of projects and previews
	const updatedProjects = getProjects();
	const updatedPreviews = getPreviews();
	// Update state with the new data
	setProjects(updatedProjects);
	setPreviews(updatedPreviews);
}

export function sortProjects(
	projects: Projects,
	sortType: 'lastEdited' | 'alphabeticalAsc' | 'alphabeticalDesc' | 'createdAt'
): [string, ProjectMetadata][] {
	return Object.entries(projects).sort((a, b) => {
		const [nameA, dataA] = a;
		const [nameB, dataB] = b;

		switch (sortType) {
			case 'alphabeticalAsc':
				return nameA.localeCompare(nameB);
			case 'alphabeticalDesc':
				return nameB.localeCompare(nameA);
			case 'createdAt':
				return (dataA.createdAt || 0) - (dataB.createdAt || 0);
			case 'lastEdited':
			default:
				return (dataB.updatedAt || 0) - (dataA.updatedAt || 0);
		}
	});
}

// Formats a timestamp into a readable date string.
export function formatDate(timestamp: number): string {
	const date = new Date(timestamp || 0);
	return isValid(date) ? format(date, 'MMM dd, yyyy HH:mm') : 'Unknown date';
}
