<script lang="ts">
	import { page } from "$app/stores";
	import {
		songs,
		filterSongsByTags,
		activeTags,
		type TagConfig,
	} from "$lib/songs";
	import ChordProViewer from "$lib/components/ChordProViewer.svelte";

	let tags: TagConfig[] = $state([
		{ name: "Worship", value: true },
		{ name: "Secular", value: false },
		{ name: "Sail", value: false },
	]);

	let availableSongs = $derived(filterSongsByTags(songs, tags));

	let selectedSongId = $derived($page.url.searchParams.get("song"));
	let activeSong = $derived(
		availableSongs.find((s) => s.id === selectedSongId) ||
			availableSongs[0],
	);
</script>

<svelte:head>
	<title>{activeSong ? activeSong.title + " - " : ""}Liederheft</title>
</svelte:head>

<!-- Song Display Section -->
<section class="relative mx-4 overflow-hidden">
	{#if activeSong}
		<ChordProViewer chordproText={activeSong.content} />
	{:else}
		<div class="text-slate-400 py-12 text-center">
			Keine Lieder mit den eingestellten Tags gefunden.
		</div>
	{/if}
</section>
