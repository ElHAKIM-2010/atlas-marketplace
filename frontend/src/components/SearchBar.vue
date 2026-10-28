<script setup>
import { ref, useId, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const inputId = useId()
const term = ref(typeof route.query.q === "string" ? route.query.q : "")

watch(
  () => route.query.q,
  (value) => {
    term.value = typeof value === "string" ? value : ""
  },
)

function submit() {
  const query = term.value.trim()
  router.push({
    path: "/",
    query: query ? { q: query } : {},
    hash: "#pratinjau",
  })
}
</script>

<template>
  <form class="flex min-h-11 border border-line bg-canvas" role="search" @submit.prevent="submit">
    <label :for="inputId" class="sr-only">Cari produk contoh</label>
    <input
      :id="inputId"
      v-model="term"
      type="search"
      name="q"
      autocomplete="off"
      placeholder="Cari di pratinjau katalog"
      class="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-mute"
    />
    <button
      type="submit"
      class="min-h-11 shrink-0 border-l border-line px-4 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-canvas"
    >
      Cari
    </button>
  </form>
</template>
