<script setup>
import { computed, onMounted, ref } from "vue";
import { WalletCards } from "lucide-vue-next";
import { account, transactions as mockTransactions } from "./data/transactions";
import { formatAccountMoney } from "./utils/formatters";
import TransactionFilters from "./components/TransactionFilters.vue";
import TransactionModal from "./components/TransactionModal.vue";
import TransactionTable from "./components/TransactionTable.vue";

const loading = ref(true);
const error = ref("");
const allTransactions = ref([]);
const selectedTransaction = ref(null);

const search = ref("");
const status = ref("all");
const type = ref("all");
const sortBy = ref("date");
const sortDirection = ref("desc");

onMounted(() => {
  window.setTimeout(() => {
    try {
      allTransactions.value = mockTransactions;
    } catch {
      error.value = "We could not load your transactions. Please try again.";
    } finally {
      loading.value = false;
    }
  }, 450);
});

const filteredTransactions = computed(() => {
  const query = search.value.trim().toLowerCase();

  return [...allTransactions.value]
    .filter((transaction) => {
      const matchesSearch =
        !query || transaction.merchant.toLowerCase().includes(query);
      const matchesStatus =
        status.value === "all" || transaction.status === status.value;
      const matchesType =
        type.value === "all" || transaction.type === type.value;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const left =
        sortBy.value === "amount" ? a.amount : new Date(a.date).getTime();
      const right =
        sortBy.value === "amount" ? b.amount : new Date(b.date).getTime();
      return sortDirection.value === "asc" ? left - right : right - left;
    });
});

const hasFilters = computed(() =>
  Boolean(search.value || status.value !== "all" || type.value !== "all"),
);

function resetFilters() {
  search.value = "";
  status.value = "all";
  type.value = "all";
}

function openTransaction(transaction) {
  selectedTransaction.value = transaction;
}

function closeTransaction() {
  selectedTransaction.value = null;
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white"
        >
          <WalletCards :size="19" />
        </div>
        <div>
          <p class="font-bold leading-none text-slate-950">Bank of Cyprus</p>
          <p class="mt-1 text-xs text-slate-500">Personal banking</p>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <section class="mb-6">
        <p class="text-sm font-medium text-indigo-600">Overview</p>
        <h1
          class="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
        >
          {{ account.name }}
        </h1>

        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <div
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
          >
            <p class="text-sm text-slate-500">Current balance</p>
            <p class="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {{ formatAccountMoney(account.balance, account.currency) }}
            </p>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
          >
            <p class="text-sm text-slate-500">Currency</p>
            <p class="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {{ account.currency }}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div
          class="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 class="text-lg font-bold text-slate-950">
              Recent transactions
            </h2>
            <p class="text-sm text-slate-500">
              {{ filteredTransactions.length }} transaction{{
                filteredTransactions.length === 1 ? "" : "s"
              }}
              shown
            </p>
          </div>
        </div>

        <TransactionFilters
          v-model:search="search"
          v-model:status="status"
          v-model:type="type"
          v-model:sort-by="sortBy"
          v-model:sort-direction="sortDirection"
          class="mb-4"
        />

        <div
          v-if="loading"
          class="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft"
        >
          <div class="space-y-4 animate-pulse">
            <div v-for="n in 5" :key="n" class="flex items-center gap-4">
              <div class="h-10 w-10 rounded-full bg-slate-200" />
              <div class="flex-1 space-y-2">
                <div class="h-4 w-1/3 rounded bg-slate-200" />
                <div class="h-3 w-1/5 rounded bg-slate-100" />
              </div>
              <div class="h-4 w-20 rounded bg-slate-200" />
            </div>
          </div>
        </div>

        <div
          v-else-if="error"
          class="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center"
        >
          <p class="font-semibold text-rose-800">{{ error }}</p>
          <button
            type="button"
            class="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm ring-1 ring-inset ring-rose-200"
            @click="window.location.reload()"
          >
            Retry
          </button>
        </div>

        <div
          v-else-if="!filteredTransactions.length"
          class="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-soft"
        >
          <h3 class="font-semibold text-slate-900">
            {{
              hasFilters ? "No matching transactions" : "No transactions yet"
            }}
          </h3>
          <p class="mt-1 text-sm text-slate-500">
            {{
              hasFilters
                ? "Try changing or clearing your filters."
                : "Your recent activity will appear here."
            }}
          </p>
          <button
            v-if="hasFilters"
            type="button"
            class="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            @click="resetFilters"
          >
            Clear filters
          </button>
        </div>

        <TransactionTable
          v-else
          :transactions="filteredTransactions"
          @select="openTransaction"
        />
      </section>
    </main>

    <TransactionModal
      :transaction="selectedTransaction"
      @close="closeTransaction"
    />
  </div>
</template>
