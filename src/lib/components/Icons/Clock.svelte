<script lang="ts">
  let { size = 60, color = "error-200", duration = 60 } = $props();
</script>

<div class={`relative flex flex-col items-center justify-center h-30 w-30`}>
  <div class="absolute">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
    >
      <!-- Track -->
      <circle
        cx="100"
        cy="100"
        r="87"
        stroke={`var(--color-${color})`}
        stroke-width="12"
      />
    </svg>
  </div>
  <div class="absolute animate-spin" style="animation-duration: {duration}s;">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        d="M100 100 L100 50"
        stroke={`var(--color-${color})`}
        stroke-width="12"
        stroke-linecap="round"
      />
    </svg>
  </div>
  <div
    class="absolute animate-spin"
    style="animation-duration: {duration / 12}s;"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        d="M100 100 L100 25"
        stroke={`var(--color-${color})`}
        stroke-width="12"
        stroke-linecap="round"
      />
    </svg>
  </div>
</div>
