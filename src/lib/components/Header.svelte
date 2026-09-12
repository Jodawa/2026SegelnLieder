<script lang="ts">
	import { Music, Search, X, Menu } from "@lucide/svelte";
	import { songs, filterSongsByTags } from "$lib/songs";
	import { activeTagsStore } from "$lib/tagStore";

	let searchQuery = $state("");
	let menuOpen = $state(false);
	let tagDropdownOpen = $state(false);
	let dropdownContainer: HTMLDivElement | null = $state(null);

	let tagFilteredSongs = $derived(filterSongsByTags(songs, $activeTagsStore));

	let filteredSongs = $derived(
		tagFilteredSongs.filter(
			(song) =>
				song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(song.artist &&
					song.artist
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) ||
				song.filename.toLowerCase().includes(searchQuery.toLowerCase()),
		),
	);

	function clearSearch() {
		searchQuery = "";
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
		if (menuOpen) tagDropdownOpen = false;
	}

	function closeMenu() {
		menuOpen = false;
	}

	function toggleTagDropdown() {
		tagDropdownOpen = !tagDropdownOpen;
		if (tagDropdownOpen) menuOpen = false;
	}

	function handleWindowClick(event: MouseEvent) {
		if (
			tagDropdownOpen &&
			dropdownContainer &&
			!dropdownContainer.contains(event.target as Node)
		) {
			tagDropdownOpen = false;
		}
	}
</script>

<svelte:window onclick={handleWindowClick} />

<header
	class="sticky top-0 z-50 glass-panel border-b border-slate-800/60 backdrop-blur-xl"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16 gap-4">
			<!-- Logo / Tag Dropdown Toggle Button -->
			<div class="relative shrink-0" bind:this={dropdownContainer}>
				<button
					type="button"
					onclick={toggleTagDropdown}
					class="flex items-center gap-2.5 group shrink-0 focus:outline-none"
					aria-label="Tags filtern"
				>
					<div
						class="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300"
					>
						<div
							class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center"
						>
							<Music class="text-white w-5 h-5" />
						</div>
					</div>
					<span
						class="font-heading font-bold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors hidden sm:inline"
					>
						Liederheft
					</span>
				</button>

				<!-- Tag Dropdown Menu -->
				{#if tagDropdownOpen}
					<div
						class="absolute left-0 mt-2 w-56 rounded-2xl bg-slate-950/95 border border-slate-800/80 backdrop-blur-2xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in zoom-in-95 duration-150"
					>
						<div
							class="px-2 py-1 border-b border-slate-800/60 flex items-center justify-between"
						>
							<span
								class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
							>
								Tags filtern
							</span>
							<span class="text-[10px] text-amber-400 font-mono">
								{$activeTagsStore.filter((t) => t.value).length}
								aktiv
							</span>
						</div>
						<div class="space-y-1 pt-1">
							{#each $activeTagsStore as tag}
								<label
									class="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-slate-800/60 cursor-pointer text-sm text-slate-200 transition-colors"
								>
									<span class="font-medium">{tag.name}</span>
									<input
										type="checkbox"
										bind:checked={tag.value}
										class="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500/40 focus:ring-offset-0 accent-amber-500"
									/>
								</label>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Search Field -->
			<div class="flex-1 max-w-md mx-2 sm:mx-4">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						onfocus={() => (menuOpen = true)}
						placeholder="Lieder oder Interpreten suchen..."
						class="w-full pl-9 pr-8 py-1.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
					/>
					<!-- Search Icon -->
					<Search
						class="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none"
					/>

					<!-- Clear Button -->
					{#if searchQuery}
						<button
							type="button"
							onclick={clearSearch}
							aria-label="Suche zurücksetzen"
							class="absolute right-2.5 top-2 text-slate-400 hover:text-white transition-colors"
						>
							<X class="w-4 h-4" />
						</button>
					{/if}
				</div>
			</div>

			<!-- Burger Menu Button -->
			<button
				type="button"
				onclick={toggleMenu}
				aria-label="Lieder-Menü öffnen"
				class="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all border border-slate-700/50 flex items-center justify-center shrink-0 gap-2"
			>
				{#if menuOpen}
					<X class="w-5 h-5" />
				{:else}
					<Menu class="w-5 h-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Collapsible Songs Menu -->
	{#if menuOpen}
		<div
			class="border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-2 shadow-2xl max-h-[75vh] overflow-y-auto"
		>
			<div
				class="flex items-center justify-between px-2 pb-2 border-b border-slate-800/60"
			>
				<span
					class="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
				>
					<Music class="w-3.5 h-3.5 text-amber-400" />
					Liederübersicht ({filteredSongs.length})
				</span>
			</div>

			{#if filteredSongs.length === 0}
				<div class="text-sm text-slate-500 py-4 text-center">
					Kein Lied gefunden für "{searchQuery}"
				</div>
			{:else}
				<div
					class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1"
				>
					{#each filteredSongs as song}
						<a
							href="/?song={song.id}"
							onclick={closeMenu}
							class="flex flex-col p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800/80 hover:border-amber-500/40 text-left transition-all group"
						>
							<span
								class="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors"
							>
								{song.title}
							</span>
							{#if song.artist}
								<span class="text-xs text-slate-400 mt-0.5"
									>{song.artist}</span
								>
							{/if}
							<span
								class="text-[10px] text-slate-500 font-mono mt-1"
							>
								{song.filename}
							</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</header>
