<script lang="ts">
	import ChordProViewer from "$lib/components/ChordProViewer.svelte";
	import song from "$lib/assets/Songs/Freudenoel.chordpro?raw";
</script>

<svelte:head>
	<title>Segelfreizeit 2026</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
	<!-- Background glow effects -->
	<div
		class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-[120px] rounded-full pointer-events-none -z-10"
	></div>
	<div
		class="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none -z-10"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<!-- Title -->
		<h1
			class="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
		>
			<span class="gradient-text">Segeln & Lieder</span>
		</h1>

		<ChordProViewer chordproText={song} />
	</div>
</section>
