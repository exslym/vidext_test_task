import { getProjects, getPreviews, deleteProject } from './storage';
import { format, isValid } from 'date-fns';
import { Projects, Previews, ProjectMetadata } from './types';

export function handleDelete(
	name: string,
	setProjects: (value: Projects) => void,
	setPreviews: (value: Previews) => void
) {
	deleteProject(name);

	const updatedProjects = getProjects();
	const updatedPreviews = getPreviews();
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

export function formatDate(timestamp: number): string {
	const date = new Date(timestamp || 0);
	return isValid(date) ? format(date, 'MMM dd, yyyy HH:mm') : 'Unknown date';
}
