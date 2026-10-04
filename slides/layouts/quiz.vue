<script setup>
import { useSlideContext } from '@slidev/client'
import SlidoJoin from '../components/SlidoJoin.vue'

// answer: index of the right option. Leave it out for a poll with no answer.
// slido: show the Slido join panel (QR code and event code from utils/slido.js).
defineProps({ chapter: String, near: Boolean, question: String, options: Array, answer: Number, slido: Boolean })
const { $clicks } = useSlideContext()
</script>

<template>
  <div class="slidev-layout tb-quiz" :class="{ near }">
    <div class="tb-chap">{{ chapter }}</div>
    <div v-if="!near" class="qz-q">{{ question }}</div>
    <div class="tb-center">
      <div class="qz-body">
        <div v-if="near" class="qz-q">{{ question }}</div>
        <div class="qz-opts" :class="{ five: options.length > 4 }">
          <div
            v-for="(o, i) in options"
            :key="i"
            class="qz-opt"
            :class="{ right: answer !== undefined && $clicks >= 1 && i === answer, dim: answer !== undefined && $clicks >= 1 && i !== answer }"
          >
            <span class="qz-k">{{ 'ABCDE'[i] }}</span>
            <span v-html="o" />
          </div>
        </div>
        <div v-if="$slots.default" class="qz-why" :class="{ on: answer === undefined || $clicks >= 1 }"><slot /></div>
        <SlidoJoin v-if="slido" />
      </div>
    </div>
  </div>
</template>
