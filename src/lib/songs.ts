export interface TagConfig {
	name: string;
	value: boolean;
}

export interface SongData {
	id: string;
	filename: string;
	title: string;
	artist?: string;
	tags: string[];
	content: string;
}

const rawSongs = import.meta.glob<string>('$lib/assets/Songs/*.chordpro', {
	query: '?raw',
	import: 'default',
	eager: true
});

export const songs: SongData[] = Object.entries(rawSongs).map(([path, content]) => {
	const filename = path.split('/').pop() || '';
	const id = filename.replace(/\.chordpro$/, '');
	const titleMatch = content.match(/\{title:\s*(.*?)\}/i);
	const artistMatch = content.match(/\{artist:\s*(.*?)\}/i);
	const tagsMatch = content.match(/\{tags?:\s*(.*?)\}/i);

	const title = titleMatch ? titleMatch[1].trim() : id.replace(/[-_]/g, ' ');
	const artist = artistMatch ? artistMatch[1].trim() : undefined;
	const tags = tagsMatch
		? tagsMatch[1].split(/[,;]/).map((t) => t.trim()).filter(Boolean)
		: [];

	return { id, filename, title, artist, tags, content };
});

export let activeTags: TagConfig[] = [
	{ name: "Worship", value: true },
	{ name: "Sail", value: false }
];

export function filterSongsByTags(allSongs: SongData[], tagConfigs: TagConfig[] = activeTags): SongData[] {
	const enabledTagNames = tagConfigs
		.filter((t) => t.value)
		.map((t) => t.name.toLowerCase());

	return allSongs.filter((song) => {
		// Lieder ohne Tags werden immer angezeigt
		if (song.tags.length === 0) return true;

		// Lieder mit Tags werden nur angezeigt, wenn mindestens ein Tag aktiv ist
		return song.tags.some((tag) => enabledTagNames.includes(tag.toLowerCase()));
	});
}
