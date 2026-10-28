<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const heading = computed(() => route.meta.heading ?? "Halaman")
const description = computed(() => route.meta.description ?? "Halaman ini belum aktif.")
const note = computed(() => route.meta.note ?? "")
</script>

<template>
  <section class="mx-auto max-w-3xl px-5 py-16 md:py-24">
    <p class="font-serif text-sm text-mute">Segera hadir</p>
    <h1 class="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">{{ heading }}</h1>
    <p class="mt-6 max-w-2xl text-lg leading-relaxed text-mute">{{ description }}</p>
    <p v-if="note" class="mt-4 max-w-2xl text-mute">{{ note }}</p>

    <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-6">
      <RouterLink
        to="/"
        class="inline-flex min-h-11 items-center border border-ink bg-ink px-5 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent"
      >
        Kembali ke beranda
      </RouterLink>
      <RouterLink
        :to="{ path: '/', hash: '#pratinjau' }"
        class="text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      >
        Lihat pratinjau katalog
      </RouterLink>
    </div>
  </section>
</template>
