<script setup>
import { Search, SlidersHorizontal } from "lucide-vue-next";

const props = defineProps({
  search: String,
  status: String,
  type: String,
  sortBy: String,
  sortDirection: String,
});

function update(name, value) {
  emit(`update:${name}`, value);
}

const emit = defineEmits([
  "update:search",
  "update:status",
  "update:type",
  "update:sortBy",
  "update:sortDirection",
]);
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
    <div
      class="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800"
    >
      <SlidersHorizontal :size="17" />
      Filters
    </div>

    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      <label class="relative lg:col-span-1">
        <span class="sr-only">Search merchant</span>
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          :size="17"
        />
        <input
          :value="props.search"
          type="search"
          placeholder="Search merchant..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white"
          @input="update('search', $event.target.value)"
        />
      </label>

      <select
        :value="props.status"
        class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:bg-white"
        @change="update('status', $event.target.value)"
      >
        <option value="all">All statuses</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="declined">Declined</option>
      </select>

      <select
        :value="props.type"
        class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:bg-white"
        @change="update('type', $event.target.value)"
      >
        <option value="all">All types</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>

      <div class="flex gap-2">
        <select
          :value="props.sortBy"
          class="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:bg-white"
          @change="update('sortBy', $event.target.value)"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <button
          type="button"
          class="rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          :aria-label="`Sort ${props.sortDirection === 'asc' ? 'descending' : 'ascending'}`"
          @click="
            update(
              'sortDirection',
              props.sortDirection === 'asc' ? 'desc' : 'asc',
            )
          "
        >
          {{ props.sortDirection === "asc" ? "↑" : "↓" }}
        </button>
      </div>
    </div>
  </section>
</template>
