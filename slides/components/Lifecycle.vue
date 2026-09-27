<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Registry -> Image -> running -> stopped -> removed; each click adds the next stage.
const { $clicks } = useSlideContext()
const s = computed(() => Math.min($clicks.value, 4))
const nodes = [
  { t: 'Registry', sub: 'Docker Hub', fill: '#6eea9e' },
  { t: 'Image', sub: 'on your disk', fill: '#6eea9e' },
  { t: 'Container', sub: 'running', fill: '#adf0c7' },
  { t: 'Container', sub: 'stopped', fill: '#e7e7e7' },
  { t: 'Removed', sub: 'gone', fill: '#ffffff', dash: true },
]
const cmds = ['docker pull', 'docker run', 'docker stop', 'docker rm']
const W = 250
const G = 110
const x = (i) => i * (W + G)
</script>

<template>
  <svg class="motion" viewBox="0 0 1690 200" role="img" aria-label="Container lifecycle" style="width:1600px">
    <g v-for="(n, i) in nodes" :key="i" class="fade" :class="{ off: s < i }">
      <rect :x="x(i)" y="60" :width="W" height="120" :fill="n.fill" stroke="#1a1a1a" stroke-width="2" :stroke-dasharray="n.dash ? '8 6' : null" />
      <text :x="x(i) + W / 2" y="108" text-anchor="middle" dominant-baseline="central" style="font-size:28px">{{ n.t }}</text>
      <text :x="x(i) + W / 2" y="146" text-anchor="middle" dominant-baseline="central" style="font-size:22px;fill:#5c5c58">{{ n.sub }}</text>
    </g>
    <g v-for="(c, i) in cmds" :key="'c' + i" class="fade" :class="{ off: s < i + 1 }">
      <line :x1="x(i) + W" y1="120" :x2="x(i + 1) - 12" y2="120" stroke="#333333" stroke-width="2" />
      <polygon :points="`${x(i + 1)},120 ${x(i + 1) - 12},114 ${x(i + 1) - 12},126`" fill="#333333" />
      <text :x="x(i) + W + G / 2" y="30" text-anchor="middle" dominant-baseline="central" style="font-size:22px;font-family:var(--tb-mono)">{{ c.split(' ')[1] }}</text>
    </g>
  </svg>
</template>

<style scoped>
.fade { transition: opacity 0.45s; }
.fade.off { opacity: 0; }
</style>
