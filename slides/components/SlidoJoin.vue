<script setup>
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { slido } from '../utils/slido.js'

// Join panel for poll slides: QR code, site and event code.
const svg = ref('')
onMounted(async () => {
  svg.value = await QRCode.toString(slido.url, { type: 'svg', margin: 0, color: { dark: '#20262e', light: '#ffffff' } })
})
</script>

<template>
  <div class="sj">
    <div class="sj-qr" v-html="svg" />
    <div class="sj-text">
      <div class="sj-label">SLIDO</div>
      <div class="sj-site">slido.com</div>
      <div class="sj-code">#{{ slido.code }}</div>
    </div>
  </div>
</template>

<style scoped>
.sj { display: flex; align-items: center; gap: 28px; border: 1.5px solid var(--tb-rule); background: #f6f8f7; padding: 20px 28px; width: max-content; }
.sj-qr { width: 150px; height: 150px; background: #fff; padding: 10px; border: 1.5px solid var(--tb-rule); }
.sj-qr :deep(svg) { width: 100%; height: 100%; display: block; }
.sj-text { display: flex; flex-direction: column; gap: 4px; }
.sj-label { font-size: 18px; font-weight: 600; letter-spacing: 0.12em; color: var(--tb-teal); }
.sj-site { font-size: 30px; color: var(--tb-mut); }
.sj-code { font-family: var(--tb-mono); font-size: 52px; font-weight: 500; color: var(--tb-ink); line-height: 1.1; }
</style>
