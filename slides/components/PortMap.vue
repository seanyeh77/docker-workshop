<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Browser -> host port -> container port -> app. The -p link appears on click 1.
const props = defineProps({ host: { type: Number, default: 3000 }, inner: { type: Number, default: 3000 } })
const { $clicks } = useSlideContext()
const mapped = computed(() => $clicks.value >= 1)
</script>

<template>
  <svg class="motion" viewBox="0 0 900 560" role="img" aria-label="Port mapping" style="width:900px">
    <rect x="300" y="10" width="300" height="60" fill="#adf0c7" stroke="#1a1a1a" stroke-width="2" />
    <text x="450" y="40" text-anchor="middle" dominant-baseline="central" style="font-size:24px">Browser</text>
    <line x1="450" y1="70" x2="450" y2="138" stroke="#333333" stroke-width="2" />
    <polygon points="450,150 444,138 456,138" fill="#333333" />
    <text x="470" y="110" dominant-baseline="central" style="font-size:22px;font-family:var(--tb-mono)">localhost:{{ props.host }}</text>

    <rect x="60" y="150" width="780" height="400" fill="#aeacac" stroke="#1a1a1a" stroke-width="2" />
    <text x="76" y="176" dominant-baseline="central" style="font-size:24px">Your computer</text>
    <rect x="360" y="196" width="180" height="50" fill="#6eea9e" stroke="#1a1a1a" stroke-width="2" />
    <text x="450" y="221" text-anchor="middle" dominant-baseline="central" style="font-size:22px">port {{ props.host }}</text>

    <rect x="140" y="310" width="620" height="220" fill="#e7e7e7" stroke="#1a1a1a" stroke-width="2" />
    <text x="156" y="336" dominant-baseline="central" style="font-size:24px">Container my-image</text>
    <rect x="360" y="356" width="180" height="50" fill="#6eea9e" stroke="#1a1a1a" stroke-width="2" />
    <text x="450" y="381" text-anchor="middle" dominant-baseline="central" style="font-size:22px">port {{ props.inner }}</text>
    <line x1="450" y1="406" x2="450" y2="444" stroke="#333333" stroke-width="2" />
    <polygon points="450,456 444,444 456,444" fill="#333333" />
    <rect x="330" y="456" width="240" height="54" fill="#adf0c7" stroke="#1a1a1a" stroke-width="2" />
    <text x="450" y="483" text-anchor="middle" dominant-baseline="central" style="font-size:22px">Node app</text>

    <g class="fade" :class="{ off: !mapped }">
      <line x1="450" y1="246" x2="450" y2="344" stroke="#333333" stroke-width="2" />
      <polygon points="450,356 444,344 456,344" fill="#333333" />
      <text x="470" y="284" dominant-baseline="central" style="font-size:22px;font-family:var(--tb-mono)">-p {{ props.host }}:{{ props.inner }}</text>
    </g>
  </svg>
</template>

<style scoped>
.fade { transition: opacity 0.45s; }
.fade.off { opacity: 0; }
</style>
