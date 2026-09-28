<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { esc, hlShell } from '../utils/hl.js'

// cmds: [{ c: 'command', o: 'output html' }]. Each click types the next command.
// keep: how many finished commands stay above the one being typed.
// all: show every command at once, no typing (for checkpoint slides).
const props = defineProps({
  cmds: { type: Array, required: true },
  keep: { type: Number, default: 2 },
  prompt: { type: String, default: '$ ' },
  start: { type: Number, default: 0 },
  all: Boolean,
  big: Boolean,
})
const { $clicks } = useSlideContext()
const active = useIsSlideActive()
const html = ref('')
let run = 0
const reduced = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms))
const caret = '<span class="caret"></span>'
// Each command may carry its own prompt (p), e.g. inside a container.
const pOf = (i) => props.cmds[i]?.p ?? props.prompt
const pAfter = (i) => props.cmds[i]?.after ?? (props.cmds[i + 1] ? pOf(i + 1) : pOf(i))
const pr = (p) => `<span class="pr">${esc(p)}</span>`
const line = (x, i) => `${pr(pOf(i))}${hlShell(x.c)[0]}\n${x.o ? `<span class="out">${x.o}</span>\n` : ''}`

async function show(step, animate) {
  const id = ++run
  if (props.all) {
    html.value = props.cmds.map(line).join('') + pr(pAfter(props.cmds.length - 1)) + caret
    return
  }
  const n = step + props.start
  const from = Math.max(0, n - props.keep)
  const before = props.cmds.slice(from, Math.max(0, n - 1)).map((x, k) => line(x, from + k)).join('')
  if (n === 0) { html.value = pr(pOf(0)) + caret; return }
  const i = Math.min(n, props.cmds.length) - 1
  const cur = props.cmds[i]
  if (!animate) { html.value = before + line(cur, i) + pr(pAfter(i)) + caret; return }
  for (let k = 0; k <= cur.c.length; k++) {
    if (id !== run) return
    html.value = before + pr(pOf(i)) + (hlShell(cur.c.slice(0, k))[0] || '') + caret
    await wait(40)
  }
  await wait(300)
  if (id === run) html.value = before + line(cur, i) + pr(pAfter(i)) + caret
}

// Fit the longest line of any step into the box: shrink the font instead of
// letting text run past the frame. IBM Plex Mono advances 0.6em per character.
const root = ref(null)
const size = ref(props.big ? 44 : 29)
const plain = (s) => s.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/g, 'x')
const longest = () => Math.max(
  ...props.cmds.map((x, i) => pOf(i).length + x.c.length + 2),
  ...props.cmds.flatMap((x) => (x.o ? plain(x.o).split('\n').map((l) => l.length) : [0])),
)
function fit() {
  const el = root.value
  if (!el) return
  const pad = props.big ? 84 : 68
  const base = props.big ? 44 : 29
  size.value = Math.min(base, Math.floor(((el.clientWidth - pad) / (longest() * 0.62)) * 10) / 10)
}
let ro = null
onMounted(() => {
  show($clicks.value, false)
  fit()
  ro = new ResizeObserver(fit)
  ro.observe(root.value)
})
onUnmounted(() => ro?.disconnect())
watch($clicks, (n, o) => show(n, active.value && n === o + 1))
</script>

<template>
  <div ref="root" class="term" :class="{ big }">
    <div class="term-bar"><i /><i /><i /></div>
    <pre class="term-body" :style="{ fontSize: size + 'px' }" v-html="html" />
  </div>
</template>
