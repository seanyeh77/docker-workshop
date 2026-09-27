<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'

// Counts down from `minutes` while the slide is on screen.
const props = defineProps({ minutes: { type: Number, default: 10 } })
const active = useIsSlideActive()
const left = ref(props.minutes * 60)
let timer = null
const stop = () => { clearInterval(timer); timer = null }
watch(active, (on) => {
  stop()
  if (on) {
    left.value = props.minutes * 60
    timer = setInterval(() => { left.value = Math.max(0, left.value - 1); if (!left.value) stop() }, 1000)
  }
}, { immediate: true })
onUnmounted(stop)
const mm = computed(() => String(Math.floor(left.value / 60)).padStart(2, '0'))
const ss = computed(() => String(left.value % 60).padStart(2, '0'))
</script>

<template>
  <div class="count"><span>{{ mm }}</span><i>:</i><span>{{ ss }}</span></div>
</template>

<style scoped>
.count { font-family: var(--tb-serif); font-weight: 600; font-size: 200px; line-height: 1; color: var(--tb-teal); font-variant-numeric: tabular-nums; }
.count i { font-style: normal; margin: 0 8px; }
</style>
