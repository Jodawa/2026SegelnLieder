export interface SongData {
	id: string;
	filename: string;
	title: string;
	artist?: string;
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
	const title = titleMatch ? titleMatch[1].trim() : id.replace(/[-_]/g, ' ');
	const artist = artistMatch ? artistMatch[1].trim() : undefined;
	return { id, filename, title, artist, content };
});
