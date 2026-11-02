<script setup>
import { computed } from 'vue'

// Inventory map of the Images and Containers students have built so far.
// stage 1: alpine -> base-container -> node-base
// stage 2: + app-container -> sample-app
// stage 3: + node:22-alpine -> (build) -> my-username/my-image
// Items added at the current stage get a teal outline.
const props = defineProps({ stage: { type: Number, default: 1 } })

const W = 400
const H = 92
const TOP = 54
const BOT = 278
const ROW3 = 486
const accent = '#0f766e'

const nodes = [
  { id: 'alpine', t: 'alpine', k: 'Image', x: 0, y: TOP, s: 1, img: true },
  { id: 'base', t: 'base-container', k: 'Container', x: 290, y: BOT, s: 1 },
  { id: 'nb', t: 'node-base', k: 'Image', x: 580, y: TOP, s: 1, img: true },
  { id: 'app', t: 'app-container', k: 'Container', x: 870, y: BOT, s: 2 },
  { id: 'sa', t: 'sample-app', k: 'Image', x: 1160, y: TOP, s: 2, img: true },
  { id: 'n22', t: 'node:22-alpine', k: 'Image', x: 0, y: ROW3, s: 3, img: true },
  { id: 'mine', t: 'my-username/my-image', k: 'Image', x: 580, y: ROW3, s: 3, img: true, wide: true },
]
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
const w = (n) => (n.wide ? 560 : W)

// run: image bottom -> down -> across -> container top
// commit: container top -> up -> across -> image bottom
function down(a, b) {
  const x1 = a.x + w(a) / 2 + 70
  const x2 = b.x + w(b) / 2 - 80
  const ym = (a.y + H + b.y) / 2
  return { pts: `${x1},${a.y + H} ${x1},${ym} ${x2},${ym} ${x2},${b.y - 12}`, head: `${x2},${b.y} ${x2 - 7},${b.y - 12} ${x2 + 7},${b.y - 12}`, lx: (x1 + x2) / 2, ly: ym }
}
function up(a, b) {
  const x1 = a.x + w(a) / 2 + 80
  const x2 = b.x + w(b) / 2 - 70
  const ym = (a.y + b.y + H) / 2
  return { pts: `${x1},${a.y} ${x1},${ym} ${x2},${ym} ${x2},${b.y + H + 12}`, head: `${x2},${b.y + H} ${x2 - 7},${b.y + H + 12} ${x2 + 7},${b.y + H + 12}`, lx: (x1 + x2) / 2, ly: ym }
}
const edges = computed(() => [
  { ...down(byId.alpine, byId.base), label: 'run', s: 1 },
  { ...up(byId.base, byId.nb), label: 'commit', s: 1 },
  { ...down(byId.nb, byId.app), label: 'run', s: 2 },
  { ...up(byId.app, byId.sa), label: 'commit', s: 2 },
  {
    pts: `${byId.n22.x + W},${ROW3 + H / 2} ${byId.mine.x - 12},${ROW3 + H / 2}`,
    head: `${byId.mine.x},${ROW3 + H / 2} ${byId.mine.x - 12},${ROW3 + H / 2 - 7} ${byId.mine.x - 12},${ROW3 + H / 2 + 7}`,
    lx: (byId.n22.x + W + byId.mine.x) / 2, ly: ROW3 + H / 2 - 30, label: 'build', s: 3,
  },
])
const shown = (s) => s <= props.stage
const isNew = (s) => s === props.stage
const height = computed(() => (props.stage >= 3 ? ROW3 + H + 8 : BOT + H + 8))
const width = computed(() => (props.stage >= 2 ? 1560 : byId.nb.x + W + 4))
</script>

<template>
  <svg class="motion" :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Images and containers built so far" :style="{ width: width + 'px' }">
    <g v-for="(e, i) in edges" :key="'e' + i" v-show="shown(e.s)">
      <polyline :points="e.pts" fill="none" stroke="#333333" stroke-width="2" />
      <polygon :points="e.head" fill="#333333" />
      <rect :x="e.lx - 52" :y="e.ly - 18" width="104" height="36" fill="#ffffff" />
      <text :x="e.lx" :y="e.ly" text-anchor="middle" dominant-baseline="central" style="font-size:22px;font-family:var(--tb-mono)">{{ e.label }}</text>
    </g>
    <g v-for="n in nodes" :key="n.id" v-show="shown(n.s)">
      <rect :x="n.x" :y="n.y" :width="w(n)" :height="H" :fill="n.img ? '#6eea9e' : '#e7e7e7'"
        :stroke="isNew(n.s) ? accent : '#1a1a1a'" :stroke-width="isNew(n.s) ? 5 : 2" />
      <text :x="n.x + w(n) / 2" :y="n.y + 36" text-anchor="middle" dominant-baseline="central" style="font-size:26px;font-family:var(--tb-mono)">{{ n.t }}</text>
      <text :x="n.x + w(n) / 2" :y="n.y + 68" text-anchor="middle" dominant-baseline="central" style="font-size:20px;fill:#5c5c58">{{ n.k }}</text>
    </g>
  </svg>
</template>
