<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { hlDockerfile } from '../utils/hl.js'

// Click n lights up Dockerfile line n and stacks the layer it creates.
// all: show every line and layer at once, with no clicks.
const props = defineProps({
  code: { type: String, required: true },
  layers: { type: Array, required: true }, // [{ name, size }] one per code line
  image: { type: String, default: 'my-username/my-image' },
  all: Boolean,
})
const { $clicks } = useSlideContext()
const step = computed(() => (props.all ? props.layers.length + 1 : Math.min($clicks.value, props.layers.length)))
const lines = computed(() => hlDockerfile(props.code))
</script>

<template>
  <div class="cd lyr">
    <pre class="cd-code" :class="{ on: step > 0 && !all }"><span v-for="(l, i) in lines" :key="i" class="ln" :class="{ act: step === i + 1 }" v-html="l || ' '" /></pre>
    <div class="lyr-image">
      <div class="lyr-name">Image {{ image }}</div>
      <div class="lyr-stack">
        <div
          v-for="(l, i) in layers"
          :key="i"
          class="lyr-layer"
          :class="{ off: step <= i, base: i === 0, cur: step === i + 1 }"
        >
          <span>{{ l.name }}</span>
          <span class="lyr-size">{{ l.size }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
