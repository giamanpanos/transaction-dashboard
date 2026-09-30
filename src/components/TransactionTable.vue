<script setup>
import TransactionRow from './TransactionRow.vue'

defineProps({
  transactions: { type: Array, required: true },
})
defineEmits(['select'])
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
    <div class="hidden grid-cols-[minmax(220px,1.5fr)_120px_130px_100px_24px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">
      <span>Merchant</span>
      <span>Date</span>
      <span>Amount</span>
      <span>Status</span>
      <span />
    </div>

    <div class="divide-y divide-slate-100">
      <TransactionRow
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>