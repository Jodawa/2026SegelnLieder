<script lang="ts">
	interface Props {
		chordproText: string;
	}

	let { chordproText }: Props = $props();

	interface ChordSegment {
		chord: string;
		text: string;
	}

	interface Line {
		type: 'comment' | 'lyrics' | 'empty';
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

				if (lowerName === 'title') title = val;
				else if (lowerName === 'artist') artist = val;
				else if (lowerName === 'key') key = val;
				else if (lowerName === 'tempo') tempo = val;
				else if (lowerName === 'time') time = val;
				else if (lowerName === 'comment' || lowerName === 'c') {
					lines.push({ type: 'comment', content: val });
				}
				continue;
			}

			// Empty line
			if (!trimmed) {
				lines.push({ type: 'empty' });
				continue;
			}

			// Parse inline chords like "Ich [Fm]rufe [Cm7]Freiheit"
			const segments: ChordSegment[] = [];
			const chordRegex = /\[(.*?)\]/g;
			let lastIndex = 0;
			let match: RegExpExecArray | null;

			// Check if line starts without chord
			const firstChordIndex = rawLine.indexOf('[');
			if (firstChordIndex > 0) {
				const leadingText = rawLine.substring(0, firstChordIndex);
				segments.push({ chord: '', text: leadingText });
				lastIndex = firstChordIndex;
			}

			while ((match = chordRegex.exec(rawLine)) !== null) {
				// Match index
				const chordStr = match[1];
				const matchEnd = chordRegex.lastIndex;

				// Find text following this chord until next chord or line end
				const nextChordIndex = rawLine.indexOf('[', matchEnd);
				const textEnd = nextChordIndex === -1 ? rawLine.length : nextChordIndex;
				const textStr = rawLine.substring(matchEnd, textEnd);

				segments.push({ chord: chordStr, text: textStr });
			}

			if (segments.length === 0) {
				// Line with no chords at all
				segments.push({ chord: '', text: rawLine });
			}

			lines.push({ type: 'lyrics', segments });
		}

		return { title, artist, key, tempo, time, lines };
	});
</script>

<div class="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl max-w-4xl mx-auto my-8">
	<!-- Song Header -->
	<div class="border-b border-slate-800/80 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
		<div>
			{#if parsedSong.title}
				<h2 class="text-3xl font-heading font-extrabold text-white tracking-tight">{parsedSong.title}</h2>
			{/if}
			{#if parsedSong.artist}
				<p class="text-slate-400 text-sm font-medium mt-1">{parsedSong.artist}</p>
			{/if}
		</div>

		<!-- Song Meta Badges -->
		<div class="flex flex-wrap items-center gap-2">
			{#if parsedSong.key}
				<span class="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
					Tonart: {parsedSong.key}
				</span>
			{/if}
			{#if parsedSong.tempo}
				<span class="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold">
					♩ = {parsedSong.tempo} BPM
				</span>
			{/if}
			{#if parsedSong.time}
				<span class="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold">
					Takt: {parsedSong.time}
				</span>
			{/if}
		</div>
	</div>

	<!-- Song Content -->
	<div class="space-y-4 font-sans text-slate-100">
		{#each parsedSong.lines as line}
			{#if line.type === 'comment'}
				<!-- Section Comment Badge (e.g. Vers 1, Chorus, Bridge) -->
				<div class="pt-4 pb-1">
					<span class="inline-block px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-cyan-400 font-heading text-xs uppercase font-bold tracking-wider">
						{line.content}
					</span>
				</div>
			{:else if line.type === 'empty'}
				<div class="h-3"></div>
			{:else if line.type === 'lyrics' && line.segments}
				<!-- Render Line with Chords Aligned Above Text -->
				<div class="flex flex-wrap items-baseline leading-relaxed my-1">
					{#each line.segments as seg}
						<div class="inline-flex flex-col mr-1">
							<!-- Chord Row -->
							<span class="h-5 text-cyan-400 font-mono font-bold text-sm tracking-tight select-none">
								{seg.chord || '\u00A0'}
							</span>
							<!-- Lyrics Row -->
							<span class="text-slate-200 text-base font-normal whitespace-pre">
								{seg.text || '\u00A0'}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>
