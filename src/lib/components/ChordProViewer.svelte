<script lang="ts">
	import { Columns2 } from "@lucide/svelte";

	interface Props {
		chordproText: string;
	}

	let { chordproText }: Props = $props();

	let transposeOffset = $state(0);
	let columnMode = $state<"auto" | "1" | "2">("auto");

	const NOTES_SHARP = [
		"C",
		"C#",
		"D",
		"D#",
		"E",
		"F",
		"F#",
		"G",
		"G#",
		"A",
		"A#",
		"B",
	];
	const NOTES_FLAT = [
		"C",
		"Db",
		"D",
		"Eb",
		"E",
		"F",
		"Gb",
		"G",
		"Ab",
		"A",
		"Bb",
		"B",
	];

	function getNoteIndex(note: string): number {
		let idx = NOTES_SHARP.indexOf(note);
		if (idx === -1) idx = NOTES_FLAT.indexOf(note);
		return idx;
	}

	function transposeNote(note: string, steps: number): string {
		let idx = getNoteIndex(note);
		if (idx === -1) return note;

		let newIdx = (idx + steps) % 12;
		if (newIdx < 0) newIdx += 12;

		return NOTES_SHARP[newIdx];
	}

	function transposeChord(chordStr: string, steps: number): string {
		if (!chordStr || steps === 0) return chordStr;

		if (chordStr.includes("/")) {
			return chordStr
				.split("/")
				.map((p) => transposeChord(p, steps))
				.join("/");
		}

		const match = chordStr.match(/^([A-G][#b]?)(.*)$/);
		if (!match) return chordStr;

		const [, root, suffix] = match;
		return transposeNote(root, steps) + suffix;
	}

	function transposeUp() {
		transposeOffset = (transposeOffset + 1) % 12;
		if (transposeOffset > 6) transposeOffset -= 12;
	}

	function transposeDown() {
		transposeOffset = (transposeOffset - 1 + 12) % 12;
		if (transposeOffset > 6) transposeOffset -= 12;
	}

	function resetTranspose() {
		transposeOffset = 0;
	}

	function toggleColumnMode() {
		if (columnMode === "auto") columnMode = "2";
		else if (columnMode === "2") columnMode = "1";
		else columnMode = "auto";
	}

	interface ChordSegment {
		chord: string;
		text: string;
	}

	interface Line {
		type: "lyrics";
		segments: ChordSegment[];
	}

	interface Section {
		comment?: string;
		lines: Line[];
	}

	interface ParsedSong {
		title: string;
		artist: string;
		key: string;
		tempo: string;
		time: string;
		sections: Section[];
	}

	let parsedSong = $derived.by<ParsedSong>(() => {
		const rawLines = chordproText.split(/\r?\n/);
		let title = "";
		let artist = "";
		let key = "";
		let tempo = "";
		let time = "";

		const sections: Section[] = [];
		let currentSection: Section = { lines: [] };

		for (const rawLine of rawLines) {
			const trimmed = rawLine.trim();

			// Check for directives {directive: value}
			const directiveMatch = trimmed.match(/^\{([^:]+):\s*(.*)\}$/);
			if (directiveMatch) {
				const [, name, value] = directiveMatch;
				const lowerName = name.toLowerCase().trim();
				const val = value.trim();

				if (lowerName === "title") title = val;
				else if (lowerName === "artist") artist = val;
				else if (lowerName === "key" || lowerName === "k") key = val;
				else if (lowerName === "tempo") tempo = val;
				else if (lowerName === "time") time = val;
				else if (lowerName === "comment" || lowerName === "c") {
					if (currentSection.lines.length > 0 || currentSection.comment) {
						sections.push(currentSection);
						currentSection = { lines: [] };
					}
					currentSection.comment = val;
				}
				continue;
			}

			// Empty line: starts new section if current has lines
			if (!trimmed) {
				if (currentSection.lines.length > 0) {
					sections.push(currentSection);
					currentSection = { lines: [] };
				}
				continue;
			}

			// Parse inline chords like "Ich [Fm]rufe [Cm7]Freiheit"
			const segments: ChordSegment[] = [];
			const chordRegex = /\[(.*?)\]/g;
			let match: RegExpExecArray | null;

			// Check if line starts without chord
			const firstChordIndex = rawLine.indexOf("[");
			if (firstChordIndex > 0) {
				const leadingText = rawLine.substring(0, firstChordIndex);
				segments.push({ chord: "", text: leadingText });
			}

			while ((match = chordRegex.exec(rawLine)) !== null) {
				const chordStr = match[1];
				const matchEnd = chordRegex.lastIndex;

				const nextChordIndex = rawLine.indexOf("[", matchEnd);
				const textEnd =
					nextChordIndex === -1 ? rawLine.length : nextChordIndex;
				const textStr = rawLine.substring(matchEnd, textEnd);

				segments.push({ chord: chordStr, text: textStr });
			}

			if (segments.length === 0) {
				segments.push({ chord: "", text: rawLine });
			}

			currentSection.lines.push({ type: "lyrics", segments });
		}

		if (currentSection.lines.length > 0 || currentSection.comment) {
			sections.push(currentSection);
		}

		// Fallback: If key is missing in file directives, detect from first chord in song
		if (!key) {
			for (const sec of sections) {
				for (const l of sec.lines) {
					for (const seg of l.segments) {
						if (seg.chord) {
							key = seg.chord;
							break;
						}
					}
					if (key) break;
				}
				if (key) break;
			}
		}

		return { title, artist, key, tempo, time, sections };
	});

	let currentKey = $derived(
		parsedSong.key ? transposeChord(parsedSong.key, transposeOffset) : "",
	);

	let availableKeyOptions = $derived.by(() => {
		if (!parsedSong.key) return [];
		const options: { label: string; offset: number }[] = [];
		for (let offset = -5; offset <= 6; offset++) {
			const keyName = transposeChord(parsedSong.key, offset);
			options.push({ label: keyName, offset });
		}
		options.sort((a, b) => {
			const matchA = a.label.match(/^([A-G][#b]?)/);
			const matchB = b.label.match(/^([A-G][#b]?)/);
			const idxA = matchA ? getNoteIndex(matchA[1]) : 0;
			const idxB = matchB ? getNoteIndex(matchB[1]) : 0;
			return idxA - idxB;
		});
		return options;
	});
</script>

<div
	class="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl mx-auto my-8 transition-all duration-300 {columnMode ===
	'1'
		? 'max-w-4xl'
		: 'max-w-4xl lg:max-w-6xl xl:max-w-7xl'}"
>
	<!-- Song Header -->
	<div
		class="border-b border-slate-800/80 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
	>
		<div>
			{#if parsedSong.title}
				<h2
					class="text-3xl font-heading font-extrabold text-white tracking-tight"
				>
					{parsedSong.title}
				</h2>
			{/if}
			{#if parsedSong.artist}
				<p class="text-slate-400 text-sm font-medium mt-1">
					{parsedSong.artist}
				</p>
			{/if}
		</div>

		<!-- Song Meta & Transpose & View Controls -->
		<div class="flex flex-wrap items-center gap-3">
			<!-- Column View Mode Switcher -->
			<button
				type="button"
				onclick={toggleColumnMode}
				title="Spaltenansicht umschalten"
				class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-amber-300 font-semibold text-xs transition-all shadow-inner"
			>
				<Columns2 class="w-4 h-4 text-amber-400" />
				<span>
					{columnMode === "auto"
						? "Auto (Mehrspaltig)"
						: columnMode === "2"
							? "2 Spalten"
							: "1 Spalte"}
				</span>
			</button>

			<!-- Transpose Control Bar -->
			<div
				class="inline-flex items-center gap-1 bg-slate-900/90 border border-slate-700/60 rounded-xl p-1 shadow-inner"
			>
				<span
					class="text-xs text-slate-400 font-semibold uppercase px-2 hidden xs:inline"
					>Transponieren</span
				>
				<button
					type="button"
					onclick={transposeDown}
					aria-label="Einen Halbton tiefer"
					class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 font-bold text-sm flex items-center justify-center transition-all border border-slate-700/50"
				>
					−
				</button>
				<span
					class="px-2 font-mono text-xs font-bold text-amber-400 min-w-[32px] text-center"
				>
					{transposeOffset > 0
						? `+${transposeOffset}`
						: transposeOffset}
				</span>
				<button
					type="button"
					onclick={transposeUp}
					aria-label="Einen Halbton höher"
					class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 font-bold text-sm flex items-center justify-center transition-all border border-slate-700/50"
				>
					+
				</button>
				{#if transposeOffset !== 0}
					<button
						type="button"
						onclick={resetTranspose}
						class="text-[10px] uppercase font-semibold text-slate-400 hover:text-white px-2 transition-colors"
					>
						Reset
					</button>
				{/if}
			</div>

			<!-- Meta Badges & Direct Key Selector -->
			{#if currentKey}
				<div
					class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold"
				>
					<span>Tonart:</span>
					<select
						value={transposeOffset}
						onchange={(e) =>
							(transposeOffset = Number(e.currentTarget.value))}
						title="Ziel-Tonart direkt auswählen"
						class="bg-slate-900 text-amber-300 font-mono font-bold text-xs rounded-lg px-2 py-0.5 border border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-inner"
					>
						{#each availableKeyOptions as opt}
							<option
								value={opt.offset}
								class="bg-slate-900 text-slate-100 font-mono"
							>
								{opt.label}
								{opt.offset === 0 ? " (Orig)" : ""}
							</option>
						{/each}
					</select>
					{#if transposeOffset !== 0}
						<span class="text-[10px] text-slate-400 ml-0.5 hidden sm:inline"
							>(Orig: {parsedSong.key})</span
						>
					{/if}
				</div>
			{/if}
			{#if parsedSong.tempo}
				<span
					class="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 font-mono text-xs font-semibold"
				>
					♩ = {parsedSong.tempo} BPM
				</span>
			{/if}
			{#if parsedSong.time}
				<span
					class="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs font-semibold"
				>
					Takt: {parsedSong.time}
				</span>
			{/if}
		</div>
	</div>

	<!-- Song Content (Multi-Column Layout) -->
	<div
		class={columnMode === "1"
			? "space-y-6"
			: columnMode === "2"
				? "columns-1 sm:columns-2 gap-8 [column-fill:_balance]"
				: "columns-1 lg:columns-2 gap-8 [column-fill:_balance]"}
	>
		{#each parsedSong.sections as section}
			<div
				class="break-inside-avoid mb-6 bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-slate-800/60 shadow-lg hover:border-slate-700/80 transition-colors"
			>
				{#if section.comment}
					<div class="pb-3">
						<span
							class="inline-block px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700/70 text-amber-400 font-heading text-xs uppercase font-bold tracking-wider shadow-sm"
						>
							{section.comment}
						</span>
					</div>
				{/if}

				<div class="space-y-1">
					{#each section.lines as line}
						{#if line.segments}
							<div
								class="flex flex-wrap items-baseline leading-relaxed my-0.5"
							>
								{#each line.segments as seg}
									<div class="inline-flex flex-col mr-1">
										<!-- Chord Row (Transposed) -->
										<span
											class="h-5 text-amber-400 font-mono font-bold text-sm tracking-tight select-none"
										>
											{seg.chord
												? transposeChord(
														seg.chord,
														transposeOffset,
													)
												: "\u00A0"}
										</span>
										<!-- Lyrics Row -->
										<span
											class="text-slate-200 text-base font-normal whitespace-pre"
										>
											{seg.text || "\u00A0"}
										</span>
									</div>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
