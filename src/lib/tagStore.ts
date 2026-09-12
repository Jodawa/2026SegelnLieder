import { writable } from 'svelte/store';
import type { TagConfig } from '$lib/songs';

export const activeTagsStore = writable<TagConfig[]>([
	{ name: "Worship", value: true },
	{ name: "Secular", value: false },
	{ name: "Sail", value: false }
]);
