<script lang="ts">
  let {
    size = 10,
    inactiveColor = "surface-900",
    activeColor = "success-200",
    duration = 5,
  } = $props();

  let active = $derived(`var(--color-${activeColor})`);
  let inactive = $derived(`var(--color-${inactiveColor})`);
</script>

<div class={`flex flex-row items-center justify-center h-30 w-auto gap-3`}>
  <div
    class={`animate-typing1`}
    style={`
        animation-duration: ${duration}s;
        --size: -${size / 4}px;
        --color-active: ${active};
        --color-inactive: ${inactive};
      `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="10" r="10" />
    </svg>
  </div>
  <div
    class={`animate-typing2`}
    style={`
        animation-duration: ${duration}s;
        --size: -${size / 4}px;
        --color-active: ${active};
        --color-inactive: ${inactive};
      `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="10" r="10" />
    </svg>
  </div>
  <div
    class={`animate-typing3`}
    style={`
        animation-duration: ${duration}s;
        --size: -${size / 4}px;
        --color-active: ${active};
        --color-inactive: ${inactive};
      `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="10" r="10" />
    </svg>
  </div>
</div>
