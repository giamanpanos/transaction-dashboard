<script setup>
import { X } from "lucide-vue-next";
import StatusBadge from "./StatusBadge.vue";
import { formatDateTime, formatMoney } from "../utils/formatters";

defineProps({
  transaction: { type: Object, default: null },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="transaction"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-0 sm:p-4"
      @click.self="emit('close')"
    >
      <section
        role="dialog"
        aria-modal="true"
        class="max-h-[90vh] w-full max-w-[350px] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl"
      >
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Transaction details
            </p>
            <h2 class="mt-1 text-xl font-bold text-slate-950">
              {{ transaction.merchant }}
            </h2>
          </div>
          <button
            type="button"
            class="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            @click="emit('close')"
          >
            <X :size="20" />
          </button>
        </div>

        <div class="-mx-2 rounded-2xl bg-slate-50 px-3 py-5">
          <p class="text-sm text-slate-500">Amount</p>
          <p
            class="mt-1 text-3xl font-bold"
            :class="
              transaction.amount >= 0 ? 'text-emerald-700' : 'text-slate-950'
            "
          >
            {{ formatMoney(transaction.amount, transaction.currency) }}
          </p>
          <div class="mt-3">
            <StatusBadge :status="transaction.status" />
          </div>
        </div>

        <dl class="mt-6 divide-y divide-slate-100 text-sm">
          <div class="flex justify-between gap-6 py-3">
            <dt class="text-slate-500">Date</dt>
            <dd class="text-right font-medium text-slate-800">
              {{ formatDateTime(transaction.date) }}
            </dd>
          </div>
          <div class="flex justify-between gap-6 py-3">
            <dt class="text-slate-500">Type</dt>
            <dd class="capitalize font-medium text-slate-800">
              {{ transaction.type }}
            </dd>
          </div>
          <div class="flex justify-between gap-6 py-3">
            <dt class="text-slate-500">Currency</dt>
            <dd class="font-medium text-slate-800">
              {{ transaction.currency }}
            </dd>
          </div>
          <div class="py-3">
            <dt class="mb-1 text-slate-500">Description</dt>
            <dd class="leading-6 text-slate-800">
              {{ transaction.description }}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </Teleport>
</template>
