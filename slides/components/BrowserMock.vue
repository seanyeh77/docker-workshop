<script setup>
// A plain browser frame with a to-do list, for "open localhost:3000" checkpoints.
defineProps({ url: { type: String, default: 'localhost:3000' }, items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="bw">
    <div class="bw-bar"><i /><i /><i /><span class="bw-url">{{ url }}</span></div>
    <div class="bw-body">
      <div class="bw-add"><span>New Item</span><b>Add Item</b></div>
      <div v-for="(t, i) in items" :key="i" class="bw-item"><i />{{ t }}</div>
      <div v-if="!items.length" class="bw-empty">No items yet! Add one above!</div>
    </div>
  </div>
</template>

<style scoped>
.bw { width: 900px; border: 1.5px solid var(--tb-rule); background: #fff; }
.bw-bar { display: flex; align-items: center; gap: 10px; padding: 12px 18px; background: #f1f4f4; border-bottom: 1.5px solid var(--tb-rule); }
.bw-bar i { width: 14px; height: 14px; border-radius: 50%; background: #d3d9dc; }
.bw-url { margin-left: 16px; flex: 1; background: #fff; border: 1.5px solid var(--tb-rule); padding: 4px 14px; font-family: var(--tb-mono); font-size: 20px; color: var(--tb-mut); }
.bw-body { padding: 28px 36px 34px; display: flex; flex-direction: column; gap: 12px; min-height: 300px; }
.bw-add { display: flex; gap: 12px; font-size: 22px; }
.bw-add span { flex: 1; border: 1.5px solid var(--tb-rule); padding: 8px 14px; color: #9aa3ab; }
.bw-add b { background: var(--tb-teal); color: #fff; padding: 8px 18px; font-weight: 500; }
.bw-item { display: flex; align-items: center; gap: 14px; background: #f6f8f7; padding: 12px 16px; font-size: 24px; }
.bw-item i { width: 18px; height: 18px; border: 2px solid var(--tb-ink); }
.bw-empty { text-align: center; color: var(--tb-mut); font-size: 22px; padding: 30px 0; }
</style>
