<script lang="ts">
	import { page } from "$app/stores";
	import { songs } from "$lib/songs";
	import ChordProViewer from "$lib/components/ChordProViewer.svelte";

	let selectedSongId = $derived($page.url.searchParams.get("song"));
	let activeSong = $derived(
		songs.find((s) => s.id === selectedSongId) || songs[0],
	);
</script>

<svelte:head>
	<title>{activeSong ? activeSong.title + " - " : ""}Segelfreizeit 2026</title
	>
</svelte:head>

<!-- Hero Section -->
<section class="relative mx-4 overflow-hidden">
	{#if activeSong}
		<ChordProViewer chordproText={activeSong.content} />
	{:else}
		<div class="text-slate-400 py-12">
			Keine Lieder im Ordner <code>src/lib/assets/Songs/</code> gefunden.
		</div>
	{/if}
</section>
