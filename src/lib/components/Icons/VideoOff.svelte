<script lang="ts">
  let { size = "40" } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="#000000"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-volume-off-icon lucide-volume-off"
>
  <style type="text/css">
    .VID {
      stroke: var(--color-surface-50);
    }
    .OFF {
      stroke: var(--color-tertiary-500);
    }
  </style>

  <path
    class="VID"
    d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"
  />
  <path
    class="VID"
    d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"
  />
  <path class="OFF" d="m2 2 20 20" />
</svg>
