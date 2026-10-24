import { writable } from 'svelte/store';
import { activeTags, type TagConfig } from '$lib/songs';

export const activeTagsStore = writable<TagConfig[]>(
	activeTags.map((tag) => ({ ...tag }))
);
