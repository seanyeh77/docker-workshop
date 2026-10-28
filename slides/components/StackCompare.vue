<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// VM vs Container as two layer stacks built bottom-up, one click per step.
// Step 1 shared base, step 2 VM stack, step 3 container stack, step 4 highlight
// the Guest OS layer the container does not have.
const props = defineProps({ captions: { type: Array, default: () => [] } })
const { $clicks } = useSlideContext()
const s = computed(() => Math.min($clicks.value, 3) + 1)
const caption = computed(() => props.captions[s.value - 1] ?? '')

const PW = 640 // panel width
const L = 0 // VM panel x
const R = 800 // container panel x
const H = 64 // layer height
const G = 10 // gap between layers
const y = (row) => 384 - row * (H + G) // row 0 = Hardware at the bottom
const COL = (PW - 2 * 20) / 3
const cx = (x0, i) => x0 + i * (COL + 20)
const apps = ['App A', 'App B', 'App C']
const accent = '#0f766e'
</script>

<template>
  <div class="stack">
    <svg class="motion" viewBox="0 0 1440 484" role="img" aria-label="Virtual machine and container layer stacks" style="width:1440px">
      <text :x="L + PW / 2" y="40" text-anchor="middle" dominant-baseline="central" style="font-size:30px;font-weight:600">Virtual Machine</text>
      <text :x="R + PW / 2" y="40" text-anchor="middle" dominant-baseline="central" style="font-size:30px;font-weight:600">Container</text>

      <!-- step 1: shared base on both sides -->
      <g v-for="x0 in [L, R]" :key="'base' + x0">
        <rect :x="x0" :y="y(0)" :width="PW" :height="H" fill="#aeacac" stroke="#1a1a1a" stroke-width="2" />
        <text :x="x0 + PW / 2" :y="y(0) + H / 2" text-anchor="middle" dominant-baseline="central" style="font-size:26px">Hardware</text>
        <rect :x="x0" :y="y(1)" :width="PW" :height="H" fill="#e7e7e7" stroke="#1a1a1a"
          :stroke-width="x0 === R && s >= 4 ? 5 : 2" :style="x0 === R && s >= 4 ? `stroke:${accent}` : null" class="hl" />
        <text :x="x0 + PW / 2" :y="y(1) + H / 2" text-anchor="middle" dominant-baseline="central" style="font-size:26px">Host OS</text>
      </g>

      <!-- step 2: VM stack -->
      <g class="fade" :class="{ off: s < 2 }">
        <rect :x="L" :y="y(2)" :width="PW" :height="H" fill="#6eea9e" stroke="#1a1a1a" stroke-width="2" />
        <text :x="L + PW / 2" :y="y(2) + H / 2" text-anchor="middle" dominant-baseline="central" style="font-size:26px">Hypervisor</text>
        <g v-for="(a, i) in apps" :key="'vm' + i">
          <rect :x="cx(L, i)" :y="y(3)" :width="COL" :height="H" fill="#e7e7e7" stroke="#1a1a1a"
            :stroke-width="s >= 4 ? 5 : 2" :style="s >= 4 ? `stroke:${accent}` : null" class="hl" />
          <text :x="cx(L, i) + COL / 2" :y="y(3) + H / 2" text-anchor="middle" dominant-baseline="central" style="font-size:24px">Guest OS</text>
          <rect :x="cx(L, i)" :y="y(4)" :width="COL" :height="H" fill="#adf0c7" stroke="#1a1a1a" stroke-width="2" />
          <text :x="cx(L, i) + COL / 2" :y="y(4) + H / 2" text-anchor="middle" dominant-baseline="central" style="font-size:24px">{{ a }}</text>
        </g>
      </g>

      <!-- step 3: container stack -->
      <g class="fade" :class="{ off: s < 3 }">
        <rect :x="R" :y="y(2)" :width="PW" :height="H" fill="#6eea9e" stroke="#1a1a1a" stroke-width="2" />
        <text :x="R + PW / 2" :y="y(2) + H / 2" text-anchor="middle" dominant-baseline="central" style="font-size:26px">Docker Engine</text>
        <g v-for="(a, i) in apps" :key="'ct' + i">
          <rect :x="cx(R, i)" :y="y(3)" :width="COL" :height="H" fill="#adf0c7" stroke="#1a1a1a" stroke-width="2" />
          <text :x="cx(R, i) + COL / 2" :y="y(3) + H / 2" text-anchor="middle" dominant-baseline="central" style="font-size:24px">{{ a }}</text>
        </g>
      </g>

      <text x="1440" y="476" text-anchor="end" style="font-size:20px;fill:#5c5c58">Step {{ s }} of 4</text>
    </svg>
    <p class="caption">{{ caption }}</p>
  </div>
</template>

<style scoped>
.stack { width: 1440px; max-width: 100%; }
.fade { transition: opacity 0.45s; }
.fade.off { opacity: 0; }
.hl { transition: stroke-width 0.3s; }
.caption { margin: 18px 0 0; font-size: 34px; color: var(--tb-mut); min-height: 1.6em; }
</style>
