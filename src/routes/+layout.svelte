<script lang="ts">
	import "./layout.css";
	import Header from "$lib/components/Header.svelte";
	import bgImage from "$lib/assets/BG.jpeg";

	let { children } = $props();
</script>

<div
	class="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white bg-cover bg-center bg-fixed bg-no-repeat relative"
	style="background-image: linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url('{bgImage}');"
>
	<Header />
	<main class="flex-grow relative z-10">
		{@render children()}
	</main>
</div>
