<script lang="ts">
	import "./layout.css";
	import Header from "$lib/components/Header.svelte";

	let { children } = $props();
</script>

<div
	class="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white"
>
	<Header />
	<main class="flex-grow">
		{@render children()}
	</main>
</div>
