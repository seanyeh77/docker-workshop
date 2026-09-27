<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// One picture shown twice: steps 0-2 in Ch3 (Q1), steps 2-5 in Ch4 (Q2 and Volume).
// step = from + clicks, capped at to.
const props = defineProps({
  from: { type: Number, default: 0 },
  to: { type: Number, default: 5 },
  image: { type: String, default: 'node-base' },
  captions: { type: Array, default: () => [] },
})
const { $clicks } = useSlideContext()
const s = computed(() => Math.min(props.from + $clicks.value, props.to))
const gen = computed(() => (s.value >= 5 ? 3 : s.value >= 3 ? 2 : 1))
const aStatus = computed(() => (gen.value === 1 ? 'created' : 'recreated'))
const caption = computed(() => props.captions[s.value] ?? '')

const A = { x: 440, w: 400 }
const B = { x: 920, w: 400 }
const V = { x: 40, w: 320 }
const top = 190
const h = 190
</script>

<template>
  <div class="story">
    <svg class="motion" viewBox="0 0 1360 440" role="img" aria-label="Containers from one image" style="width:1360px">
      <!-- image -->
      <rect x="640" y="20" width="400" height="64" fill="#6eea9e" stroke="#1a1a1a" stroke-width="2" />
      <text x="840" y="52" text-anchor="middle" dominant-baseline="central" style="font-size:26px">Image {{ image }}</text>

      <!-- run lines -->
      <g class="fade" :class="{ off: s < 1 }">
        <polyline points="840,84 840,130 640,130 640,178" fill="none" stroke="#333333" stroke-width="2" />
        <polygon points="640,190 634,178 646,178" fill="#333333" />
        <polyline points="840,84 840,130 1120,130 1120,178" fill="none" stroke="#333333" stroke-width="2" />
        <polygon points="1120,190 1114,178 1126,178" fill="#333333" />
        <rect x="846" y="96" width="70" height="30" fill="#ffffff" />
        <text x="852" y="112" dominant-baseline="central" style="font-size:22px">run</text>
      </g>

      <!-- container A: re-keyed on every recreate so it fades back in -->
      <g :key="'a' + gen" class="fade pop" :class="{ off: s < 1 }">
        <rect :x="A.x" :y="top" :width="A.w" :height="h" fill="#e7e7e7" stroke="#1a1a1a" stroke-width="2" />
        <text :x="A.x + 16" :y="top + 30" dominant-baseline="central" style="font-size:24px">Container A</text>
        <text :x="A.x + A.w - 16" :y="top + 30" text-anchor="end" dominant-baseline="central" style="font-size:20px;fill:#5c5c58">{{ aStatus }}</text>
      </g>

      <!-- container B -->
      <g class="fade" :class="{ off: s < 1 }">
        <rect :x="B.x" :y="top" :width="B.w" :height="h" fill="#e7e7e7" stroke="#1a1a1a" stroke-width="2" />
        <text :x="B.x + 16" :y="top + 30" dominant-baseline="central" style="font-size:24px">Container B</text>
      </g>

      <!-- file only inside A (step 2) -->
      <g class="fade" :class="{ off: s !== 2 }">
        <rect :x="A.x + 110" :y="top + 90" width="180" height="54" fill="#adf0c7" stroke="#1a1a1a" stroke-width="2" />
        <text :x="A.x + 200" :y="top + 117" text-anchor="middle" dominant-baseline="central" style="font-size:24px">hello.txt</text>
      </g>
      <text class="fade" :class="{ off: s < 2 }" :x="B.x + 200" :y="top + 117" text-anchor="middle" dominant-baseline="central" style="font-size:24px;fill:#5c5c58">empty</text>
      <text class="fade" :class="{ off: s !== 3 }" :x="A.x + 200" :y="top + 117" text-anchor="middle" dominant-baseline="central" style="font-size:24px;fill:#5c5c58">empty</text>

      <!-- volume (steps 4-5) -->
      <g class="fade" :class="{ off: s < 4 }">
        <rect :x="V.x" :y="top" :width="V.w" :height="h" fill="#6eea9e" stroke="#1a1a1a" stroke-width="2" />
        <text :x="V.x + 16" :y="top + 30" dominant-baseline="central" style="font-size:24px">Volume</text>
        <rect :x="V.x + 70" :y="top + 90" width="180" height="54" fill="#adf0c7" stroke="#1a1a1a" stroke-width="2" />
        <text :x="V.x + 160" :y="top + 117" text-anchor="middle" dominant-baseline="central" style="font-size:24px">hello.txt</text>
        <line :x1="V.x + V.w" :y1="top + 117" :x2="A.x" :y2="top + 117" stroke="#333333" stroke-width="2" />
        <rect :x="V.x + V.w + 6" :y="top + 72" width="68" height="30" fill="#ffffff" />
        <text :x="V.x + V.w + 40" :y="top + 88" text-anchor="middle" dominant-baseline="central" style="font-size:20px">mount</text>
        <rect :x="A.x + 110" :y="top + 90" width="180" height="54" fill="#ffffff" stroke="#1a1a1a" stroke-width="2" stroke-dasharray="8 6" />
        <text :x="A.x + 200" :y="top + 117" text-anchor="middle" dominant-baseline="central" style="font-size:24px">hello.txt</text>
      </g>

      <text x="1340" y="424" text-anchor="end" style="font-size:20px;fill:#5c5c58">Step {{ s }} of 5</text>
    </svg>
    <p class="caption">{{ caption }}</p>
  </div>
</template>

<style scoped>
.story { width: 1360px; max-width: 100%; }
.fade { transition: opacity 0.45s; }
.fade.off { opacity: 0; }
.pop { animation: story-pop 0.6s ease; }
@keyframes story-pop { from { opacity: 0; } }
.caption { margin: 18px 0 0; font-size: 28px; color: var(--tb-mut); min-height: 1.6em; }
</style>
