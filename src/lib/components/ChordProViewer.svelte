<script lang="ts">
	interface Props {
		chordproText: string;
	}

	let { chordproText }: Props = $props();

	let transposeOffset = $state(0);

	const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	const NOTES_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

	function transposeNote(note: string, steps: number): string {
		let idx = NOTES_SHARP.indexOf(note);
		if (idx === -1) idx = NOTES_FLAT.indexOf(note);
		if (idx === -1) return note;

		let newIdx = (idx + steps) % 12;
		if (newIdx < 0) newIdx += 12;

		return NOTES_SHARP[newIdx];
	}

	function transposeChord(chordStr: string, steps: number): string {
		if (!chordStr || steps === 0) return chordStr;

		if (chordStr.includes('/')) {
			return chordStr.split('/').map((p) => transposeChord(p, steps)).join('/');
		}

		const match = chordStr.match(/^([A-G][#b]?)(.*)$/);
		if (!match) return chordStr;

		const [, root, suffix] = match;
		return transposeNote(root, steps) + suffix;
	}

	function transposeUp() {
		transposeOffset = (transposeOffset + 1) % 12;
	}

	function transposeDown() {
		transposeOffset = (transposeOffset - 1 + 12) % 12;
		if (transposeOffset > 6) transposeOffset -= 12;
	}

	function resetTranspose() {
		transposeOffset = 0;
	}

	interface ChordSegment {
		chord: string;
		text: string;
	}

	interface Line {
		type: "comment" | "lyrics" | "empty";
		content?: string;
		segments?: ChordSegment[];
	}

	interface ParsedSong {
		title: string;
		artist: string;
		key: string;
		tempo: string;
		time: string;
		lines: Line[];
	}

	let parsedSong = $derived.by<ParsedSong>(() => {
		const rawLines = chordproText.split(/\r?\n/);
		let title = "";
		let artist = "";
		let key = "";
		let tempo = "";
		let time = "";

		const lines: Line[] = [];

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
				else if (lowerName === "key") key = val;
				else if (lowerName === "tempo") tempo = val;
				else if (lowerName === "time") time = val;
				else if (lowerName === "comment" || lowerName === "c") {
					lines.push({ type: "comment", content: val });
				}
				continue;
			}

			// Empty line
			if (!trimmed) {
				lines.push({ type: "empty" });
				continue;
			}

			// Parse inline chords like "Ich [Fm]rufe [Cm7]Freiheit"
			const segments: ChordSegment[] = [];
			const chordRegex = /\[(.*?)\]/g;
			let lastIndex = 0;
			let match: RegExpExecArray | null;

			// Check if line starts without chord
			const firstChordIndex = rawLine.indexOf("[");
			if (firstChordIndex > 0) {
				const leadingText = rawLine.substring(0, firstChordIndex);
				segments.push({ chord: "", text: leadingText });
				lastIndex = firstChordIndex;
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

			lines.push({ type: "lyrics", segments });
		}

		return { title, artist, key, tempo, time, lines };
	});

	let currentKey = $derived(
		parsedSong.key ? transposeChord(parsedSong.key, transposeOffset) : ''
	);
</script>

<div
	class="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl max-w-4xl mx-auto my-8"
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

		<!-- Song Meta & Transpose Controls -->
		<div class="flex flex-wrap items-center gap-3">
			<!-- Transpose Control Bar -->
			<div class="inline-flex items-center gap-1 bg-slate-900/90 border border-slate-700/60 rounded-xl p-1 shadow-inner">
				<span class="text-xs text-slate-400 font-semibold uppercase px-2">Transponieren</span>
				<button
					type="button"
					onclick={transposeDown}
					aria-label="Einen Halbton tiefer"
					class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 font-bold text-sm flex items-center justify-center transition-all border border-slate-700/50"
				>
					−
				</button>
				<span class="px-2 font-mono text-xs font-bold text-cyan-400 min-w-[32px] text-center">
					{transposeOffset > 0 ? `+${transposeOffset}` : transposeOffset}
				</span>
				<button
					type="button"
					onclick={transposeUp}
					aria-label="Einen Halbton höher"
					class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 font-bold text-sm flex items-center justify-center transition-all border border-slate-700/50"
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

			<!-- Meta Badges -->
			{#if currentKey}
				<span
					class="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold"
				>
					Tonart: {currentKey}
					{#if transposeOffset !== 0}
						<span class="text-[10px] text-slate-400 ml-1">(Orig: {parsedSong.key})</span>
					{/if}
				</span>
			{/if}
			{#if parsedSong.tempo}
				<span
					class="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold"
				>
					♩ = {parsedSong.tempo} BPM
				</span>
			{/if}
			{#if parsedSong.time}
				<span
					class="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold"
				>
					Takt: {parsedSong.time}
				</span>
			{/if}
		</div>
	</div>

	<!-- Song Content -->
	<div class="space-y-4 font-sans text-slate-100">
		{#each parsedSong.lines as line}
			{#if line.type === "comment"}
				<!-- Section Comment Badge (e.g. Vers 1, Chorus, Bridge) -->
				<div class="pt-4 pb-1">
					<span
						class="inline-block px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-cyan-400 font-heading text-xs uppercase font-bold tracking-wider"
					>
						{line.content}
					</span>
				</div>
			{:else if line.type === "empty"}
				<div class="h-3"></div>
			{:else if line.type === "lyrics" && line.segments}
				<!-- Render Line with Chords Aligned Above Text -->
				<div class="flex flex-wrap items-baseline leading-relaxed my-1">
					{#each line.segments as seg}
						<div class="inline-flex flex-col mr-1">
							<!-- Chord Row (Transposed) -->
							<span
								class="h-5 text-cyan-400 font-mono font-bold text-sm tracking-tight select-none"
							>
								{seg.chord ? transposeChord(seg.chord, transposeOffset) : "\u00A0"}
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
