<script lang="ts">
	import { page } from "$app/stores";
	import { songs, filterSongsByTags } from "$lib/songs";
	import { activeTagsStore } from "$lib/tagStore";
	import ChordProViewer from "$lib/components/ChordProViewer.svelte";

	let availableSongs = $derived(filterSongsByTags(songs, $activeTagsStore));

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
