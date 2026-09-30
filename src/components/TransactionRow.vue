<script setup>
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-vue-next";
import StatusBadge from "./StatusBadge.vue";
import { formatDate, formatMoney } from "../utils/formatters";

defineProps({
  transaction: { type: Object, required: true },
});

defineEmits(["select"]);
</script>

<template>
  <button
    type="button"
    class="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 px-4 py-4 text-left transition hover:bg-slate-50 sm:grid-cols-[minmax(220px,1.5fr)_120px_130px_100px_24px] sm:items-center sm:gap-4 sm:px-5"
    @click="$emit('select', transaction)"
  >
    <div class="flex min-w-0 items-start gap-3 sm:items-center">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        :class="
          transaction.type === 'credit'
            ? 'bg-emerald-50 text-emerald-600'
            : 'bg-slate-100 text-slate-600'
        "
      >
        <ArrowUp v-if="transaction.type === 'credit'" :size="18" />
        <ArrowDown v-else :size="18" />
      </div>

      <div class="min-w-0">
        <p class="truncate font-medium text-slate-900">
          {{ transaction.merchant }}
        </p>

        <p class="mt-1 text-sm text-slate-500 sm:hidden">
          {{ formatDate(transaction.date) }}
        </p>
      </div>
    </div>

    <div class="hidden text-sm text-slate-600 sm:block">
      {{ formatDate(transaction.date) }}
    </div>

    <div class="text-left sm:text-left">
      <p
        class="font-semibold"
        :class="transaction.amount >= 0 ? 'text-emerald-700' : 'text-slate-900'"
      >
        {{ formatMoney(transaction.amount, transaction.currency) }}
      </p>

      <p class="text-xs text-slate-500 text-right sm:text-left">
        {{ transaction.currency }}
      </p>
    </div>

    <div>
      <StatusBadge :status="transaction.status" />
    </div>

    <ChevronRight class="hidden text-slate-400 sm:block" :size="18" />

    <ChevronRight
      class="self-center justify-self-end text-slate-400 sm:hidden"
      :size="18"
    />
  </button>
</template>
