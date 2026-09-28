<script setup>
import { useSlideContext } from '@slidev/client'

// lines: [{ who: 'left' | 'right', name, text }]; line i appears at click i
// (the first line is visible from the start).
defineProps({ lines: { type: Array, required: true } })
const { $clicks } = useSlideContext()
</script>

<template>
  <div class="chat">
    <div v-for="(l, i) in lines" :key="i" class="chat-row" :class="[l.who, { off: $clicks < i }]">
      <div class="chat-name">{{ l.name }}</div>
      <div class="chat-bubble" v-html="l.text" />
    </div>
  </div>
</template>

<style scoped>
.chat { display: flex; flex-direction: column; gap: 26px; width: 1240px; max-width: 100%; }
.chat-row { display: flex; flex-direction: column; gap: 8px; max-width: 72%; transition: opacity 0.35s, transform 0.35s; }
.chat-row.off { opacity: 0; transform: translateY(10px); }
.chat-row.left { align-self: flex-start; }
.chat-row.right { align-self: flex-end; align-items: flex-end; }
.chat-name { font-size: 20px; font-weight: 600; letter-spacing: 0.08em; color: var(--tb-mut); text-transform: uppercase; }
.chat-bubble { border: 1.5px solid var(--tb-rule); background: #f6f8f7; padding: 22px 30px; font-size: 36px; line-height: 1.45; }
.right .chat-bubble { background: var(--tb-svc); border-color: #1a1a1a; }
.chat-bubble :deep(code) { font-family: var(--tb-mono); font-size: 0.8em; color: #9b2c20; background: none; padding: 0; }
</style>
