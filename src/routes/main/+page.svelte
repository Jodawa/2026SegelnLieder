<script lang="ts">
	import ChordProViewer from "$lib/components/ChordProViewer.svelte";
	import song from "$lib/assets/Songs/Freudenoel.chordpro?raw";
</script>

<svelte:head>
	<title>Segelfreizeit 2026</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative mx-4 overflow-hidden">
	<ChordProViewer chordproText={song} />
</section>
