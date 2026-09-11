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
    .MIC {
      stroke: var(--color-surface-50);
    }
    .OFF {
      stroke: var(--color-tertiary-500);
    }
  </style>

  <path class="MIC" d="M12 19v3" />
  <path class="MIC" d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
  <path class="MIC" d="M16.95 16.95A7 7 0 0 1 5 12v-2" />
  <path class="MIC" d="M18.89 13.23A7 7 0 0 0 19 12v-2" />
  <path class="MIC" d="M9 9v3a3 3 0 0 0 5.12 2.12" />
  <path class="OFF" d="m2 2 20 20" />
</svg>
