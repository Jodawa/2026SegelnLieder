<script lang="ts">
  let {
    size = 60,
    color1 = "#ff0000",
    color2 = "#00ff00",
    color3 = "#0000ff",
  } = $props();

  function randomize(e: Event) {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty(
      "--firework-x",
      `${(Math.random() * size) / 4 - size / 8}px`,
    );
    el.style.setProperty("--firework-y", `${(Math.random() * size) / 4}px`);
  }
</script>

<div class={`relative flex flex-col items-center justify-center h-30 w-30`}>
  <div
    class="absolute animate-firework"
    style={`animation-duration: 2s; --firework-x: ${(Math.random() * size) / 4 - size / 8}px; --firework-y: ${(Math.random() * size) / 4}px;`}
    onanimationiteration={randomize}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
    >
      <circle cx="100.0" cy="13.0" r="12" fill={color1} />
      <circle cx="126.9" cy="17.3" r="12" fill={color1} />
      <circle cx="151.1" cy="29.6" r="12" fill={color1} />
      <circle cx="170.4" cy="48.9" r="12" fill={color1} />
      <circle cx="182.7" cy="73.1" r="12" fill={color1} />
      <circle cx="187.0" cy="100.0" r="12" fill={color1} />
      <circle cx="182.7" cy="126.9" r="12" fill={color1} />
      <circle cx="170.4" cy="151.1" r="12" fill={color1} />
      <circle cx="151.1" cy="170.4" r="12" fill={color1} />
      <circle cx="126.9" cy="182.7" r="12" fill={color1} />
      <circle cx="100.0" cy="187.0" r="12" fill={color1} />
      <circle cx="73.1" cy="182.7" r="12" fill={color1} />
      <circle cx="48.9" cy="170.4" r="12" fill={color1} />
      <circle cx="29.6" cy="151.1" r="12" fill={color1} />
      <circle cx="17.3" cy="126.9" r="12" fill={color1} />
      <circle cx="13.0" cy="100.0" r="12" fill={color1} />
      <circle cx="17.3" cy="73.1" r="12" fill={color1} />
      <circle cx="29.6" cy="48.9" r="12" fill={color1} />
      <circle cx="48.9" cy="29.6" r="12" fill={color1} />
      <circle cx="73.1" cy="17.3" r="12" fill={color1} />
    </svg>
  </div>

  <div
    class="absolute animate-firework"
    style={`animation-duration: 2s; --firework-x: ${(Math.random() * size) / 4 - size / 8}px; --firework-y: ${(Math.random() * size) / 4}px;`}
    onanimationiteration={randomize}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
    >
      <circle cx="100.0" cy="13.0" r="12" fill={color2} />
      <circle cx="126.9" cy="17.3" r="12" fill={color2} />
      <circle cx="151.1" cy="29.6" r="12" fill={color2} />
      <circle cx="170.4" cy="48.9" r="12" fill={color2} />
      <circle cx="182.7" cy="73.1" r="12" fill={color2} />
      <circle cx="187.0" cy="100.0" r="12" fill={color2} />
      <circle cx="182.7" cy="126.9" r="12" fill={color2} />
      <circle cx="170.4" cy="151.1" r="12" fill={color2} />
      <circle cx="151.1" cy="170.4" r="12" fill={color2} />
      <circle cx="126.9" cy="182.7" r="12" fill={color2} />
      <circle cx="100.0" cy="187.0" r="12" fill={color2} />
      <circle cx="73.1" cy="182.7" r="12" fill={color2} />
      <circle cx="48.9" cy="170.4" r="12" fill={color2} />
      <circle cx="29.6" cy="151.1" r="12" fill={color2} />
      <circle cx="17.3" cy="126.9" r="12" fill={color2} />
      <circle cx="13.0" cy="100.0" r="12" fill={color2} />
      <circle cx="17.3" cy="73.1" r="12" fill={color2} />
      <circle cx="29.6" cy="48.9" r="12" fill={color2} />
      <circle cx="48.9" cy="29.6" r="12" fill={color2} />
      <circle cx="73.1" cy="17.3" r="12" fill={color2} />
    </svg>
  </div>
  <div
    class="absolute animate-firework"
    style={`animation-duration: 2s; --firework-x: ${(Math.random() * size) / 4 - size / 8}px; --firework-y: ${(Math.random() * size) / 4}px;`}
    onanimationiteration={randomize}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
    >
      <circle cx="100.0" cy="13.0" r="12" fill={color3} />
      <circle cx="126.9" cy="17.3" r="12" fill={color3} />
      <circle cx="151.1" cy="29.6" r="12" fill={color3} />
      <circle cx="170.4" cy="48.9" r="12" fill={color3} />
      <circle cx="182.7" cy="73.1" r="12" fill={color3} />
      <circle cx="187.0" cy="100.0" r="12" fill={color3} />
      <circle cx="182.7" cy="126.9" r="12" fill={color3} />
      <circle cx="170.4" cy="151.1" r="12" fill={color3} />
      <circle cx="151.1" cy="170.4" r="12" fill={color3} />
      <circle cx="126.9" cy="182.7" r="12" fill={color3} />
      <circle cx="100.0" cy="187.0" r="12" fill={color3} />
      <circle cx="73.1" cy="182.7" r="12" fill={color3} />
      <circle cx="48.9" cy="170.4" r="12" fill={color3} />
      <circle cx="29.6" cy="151.1" r="12" fill={color3} />
      <circle cx="17.3" cy="126.9" r="12" fill={color3} />
      <circle cx="13.0" cy="100.0" r="12" fill={color3} />
      <circle cx="17.3" cy="73.1" r="12" fill={color3} />
      <circle cx="29.6" cy="48.9" r="12" fill={color3} />
      <circle cx="48.9" cy="29.6" r="12" fill={color3} />
      <circle cx="73.1" cy="17.3" r="12" fill={color3} />
    </svg>
  </div>
</div>
