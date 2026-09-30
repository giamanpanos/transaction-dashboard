<script setup>
defineProps({
  status: { type: String, required: true },
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
    :class="{
      'bg-emerald-50 text-emerald-700': status === 'completed',
      'bg-amber-50 text-amber-700': status === 'pending',
      'bg-rose-50 text-rose-700': status === 'declined',
    }"
  >
    <span class="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
    {{ status }}
  </span>
</template>