<script lang="ts">
  let { duration = 5, size = 60 } = $props();
</script>

<div class={`relative flex flex-col items-center justify-center h-30 w-30`}>
  <div
    class={`absolute animate-colors`}
    style={`animation-duration: ${duration}s; animation-delay: -4s`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390.4 69"
      width={size * 5}
      height={size}
    >
      <path
        class="D"
        d="M17,32.8c0,4.5-3.7,8.2-8.2,8.2H0.2V1.5h30.2c18.3,0,33,14.9,33,33c0,18.3-14.7,33-33,33H8.2 c-4.5,0-8.2-3.7-8.2-8.2v-7.8h28.9c9.5,0,17-7.8,17-17.3S38.2,17,28.7,17H16.8v15.7H17z"
      />
    </svg>
  </div>
  <div
    class={`absolute animate-colors`}
    style={`animation-duration: ${duration}s; animation-delay: -3s`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390.4 69"
      width={size * 5}
      height={size}
    >
      <path
        class="E"
        d="M80.2,59.5c0,4.5,3.5,8.2,8,8.2h46.6V51.5H97.1V17.7h37.7V1.5H88.2c-4.3,0-8,3.7-8,8.2V59.5z"
      />
      <path
        class="E"
        d="M110,41.6h25V27.2h-25c-4.1,0-7.5,3.2-7.5,7.3S105.9,41.6,110,41.6"
      />
    </svg>
  </div>
  <div
    class={`absolute animate-colors`}
    style={`animation-duration: ${duration}s; animation-delay: -2s`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390.4 69"
      width={size * 5}
      height={size}
    >
      <path
        class="K"
        d="M170.2,37.5v22c0,4.3-3.5,8-8,8h-10.1V9.3c0-4.3,3.5-8,7.8-8h10.6v27.2h0.2l19.8-27h22l-24.4,30.6l26.1,35.2 h-23.1L170.2,37.5z"
      />
    </svg>
  </div>
  <div
    class={`absolute animate-colors`}
    style={`animation-duration: ${duration}s; animation-delay: -1s`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390.4 69"
      width={size * 5}
      height={size}
    >
      <path
        class="O"
        d="M253.2,52c-9.7,0-17.5-7.8-17.5-17.5S243.5,17,253.2,17c9.7,0,17.5,7.8,17.5,17.5S262.9,52,253.2,52
		 M287.7,34.5c0-19.2-15.5-34.5-34.5-34.5c-19.2,0-34.5,15.5-34.5,34.5c0,7.5,2.4,14.5,6.5,20.1l0,0c6.3,8.8,16.6,14.5,28,14.5
		c11.6,0,21.8-5.6,28-14.5l0,0C285.3,49,287.7,42.1,287.7,34.5"
      />
    </svg>
  </div>
  <div
    class={`absolute animate-colors`}
    style={`animation-duration: ${duration}s; animation-delay: 0s`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390.4 69"
      width={size * 5}
      height={size}
    >
      <path
        class="M"
        d="M381.1,67.5h9.3V9.3c0-4.3-3.7-8-8-8h-20.3l-14.7,42.1h-0.2l-14-41.8h-21.1c-4.3,0-7.8,3.5-7.8,8v58.2h9.3
		c4.3,0,8-3.7,8-8V17.5l15.7,47.9h19.2L373.1,17v42.7C373.1,64.1,376.8,67.5,381.1,67.5L381.1,67.5z"
      />
    </svg>
  </div>
</div>
