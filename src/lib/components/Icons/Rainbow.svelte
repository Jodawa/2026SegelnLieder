<script lang="ts">
  let {
    size = 60,
    color1 = "error-200",
    color2 = "warning-200",
    color3 = "success-200",
    duration = 2,
  } = $props();
</script>

<div class={`relative flex flex-col items-center justify-center h-30 w-30`}>
  <div
    class="absolute flex items-center justify-center"
    style="clip-path: inset(0 0 50% 0);"
  >
    <div
      class="animate-rainbow flex items-center justify-center"
      style="animation-duration: {duration}s;"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M10 100 A90 90 0 0 1 190 100"
          stroke={`var(--color-${color1})`}
          stroke-width="12"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
  <div
    class="absolute flex items-center justify-center"
    style="clip-path: inset(0 0 50% 0);"
  >
    <div
      class="animate-rainbow flex items-center justify-center"
      style="animation-duration: {duration}s;"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size - size / 5}
        height={size - size / 5}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M10 100 A90 90 0 0 1 190 100"
          stroke={`var(--color-${color2})`}
          stroke-width="12"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
  <div
    class="absolute flex items-center justify-center"
    style="clip-path: inset(0 0 50% 0);"
  >
    <div
      class="animate-rainbow flex items-center justify-center"
      style="animation-duration: {duration}s;"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size - 2 * (size / 5)}
        height={size - 2 * (size / 5)}
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M10 100 A90 90 0 0 1 190 100"
          stroke={`var(--color-${color3})`}
          stroke-width="12"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</div>
