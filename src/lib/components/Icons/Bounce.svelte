<script lang="ts">
  let { size = 10, color = "primary-200", duration = 2 } = $props();
  let n = 3;
</script>

<div class={`flex flex-row items-center justify-center h-30 w-auto gap-3`}>
  {#each Array(n) as _, i}
    <div
      class={`animate-bounce`}
      style={`
        animation-duration: ${duration}s; 
        animation-delay: 0.${i}s;
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
      >
        <circle cx="10" cy="10" r="10" fill={`var(--color-${color})`} />
      </svg>
    </div>
  {/each}
</div>
