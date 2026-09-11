<script lang="ts">
  let { size = 60, color = "surface-50" } = $props();
  let min = 0.2;
  let max = 1;

  function randomize(e: Event) {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--min", `${Math.random() * (max - min) + min}`);
    el.style.setProperty("--max", `${Math.random() * (max - min) + min}`);
  }
</script>

<div class={`flex flex-row items-center justify-center h-30 w-auto gap-0`}>
  {#each Array(9) as _}
    <div
      class={`animate-stretch`}
      style={`
        animation-duration: ${Math.random() * 5 + 2}s; 
        animation-delay: -${Math.random() * 2}s; 
        --min: ${Math.random() * (max - min) + min}; 
        --max: ${Math.random() * (max - min) + min};
      `}
      onanimationiteration={randomize}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size / 5}
        height={size}
        viewBox="0 0 12 160"
        fill="none"
      >
        <line
          x1="6"
          y1="6"
          x2="6"
          y2="154"
          stroke={`var(--color-${color})`}
          stroke-width="12"
          stroke-linecap="round"
        />
      </svg>
    </div>
  {/each}
</div>
