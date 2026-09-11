<script lang="ts">
  let {
    size = 60,
    color1 = "error-200",
    color2 = "warning-200",
    color3 = "success-200",
  } = $props();
</script>

<div class={`relative flex flex-col items-center justify-center h-30 w-30`}>
  <div class="absolute animate-spin" style="animation-duration: 2s;">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
    >
      <!-- Track -->
      <path
        d="M190 100 A90 90 0 1 1 100 10"
        stroke="transparent"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- Fill -->
      <path
        d="M100 10 A90 90 0 0 1 190 100"
        stroke={`var(--color-${color1})`}
        stroke-width="12"
        stroke-linecap="round"
      />
    </svg>
  </div>
  <div class="absolute animate-spin" style="animation-duration: 1.5s;">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size - size / 4}
      height={size - size / 4}
      viewBox="0 0 200 200"
      fill="none"
    >
      <!-- Track -->
      <path
        d="M190 100 A90 90 0 1 1 100 10"
        stroke="transparent"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- Fill -->
      <path
        d="M100 10 A90 90 0 0 1 190 100"
        stroke={`var(--color-${color2})`}
        stroke-width="12"
        stroke-linecap="round"
      />
    </svg>
  </div>
  <div class="absolute animate-spin" style="animation-duration: 3s;">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size - size / 2}
      height={size - size / 2}
      viewBox="0 0 200 200"
      fill="none"
    >
      <!-- Track -->
      <path
        d="M190 100 A90 90 0 1 1 100 10"
        stroke="transparent"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- Fill -->
      <path
        d="M100 10 A90 90 0 0 1 190 100"
        stroke={`var(--color-${color3})`}
        stroke-width="12"
        stroke-linecap="round"
      />
    </svg>
  </div>
</div>
