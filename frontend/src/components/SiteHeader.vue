<script setup>
import { nextTick, ref, watch } from "vue"
import { useRoute } from "vue-router"

import SearchBar from "./SearchBar.vue"

const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref(null)
const firstMenuLink = ref(null)

async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value) return
  await nextTick()
  const link = firstMenuLink.value?.$el ?? firstMenuLink.value
  link?.focus?.()
}

function closeMenu() {
  menuOpen.value = false
}

function closeMenuAndRestoreFocus() {
  menuOpen.value = false
  menuButton.value?.focus()
}

function handleEscape() {
  if (menuOpen.value) closeMenuAndRestoreFocus()
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    class="border-b border-line bg-canvas lg:sticky lg:top-0 lg:z-40"
    @keydown.esc="handleEscape"
  >
    <div class="mx-auto max-w-6xl px-5">
      <div class="flex min-h-16 items-center justify-between gap-4 py-3">
        <RouterLink
          to="/"
          class="font-serif text-2xl leading-none tracking-tight text-ink"
          aria-label="ATLAS, beranda"
        >
          ATLAS
        </RouterLink>

        <nav
          class="hidden items-center gap-6 text-sm font-medium text-ink lg:flex"
          aria-label="Navigasi utama"
        >
          <RouterLink :to="{ path: '/', hash: '#kategori' }" class="transition-colors hover:text-accent">
            Kategori
          </RouterLink>
          <RouterLink :to="{ path: '/', hash: '#pratinjau' }" class="transition-colors hover:text-accent">
            Pratinjau
          </RouterLink>
        </nav>

        <div class="hidden min-w-0 flex-1 justify-end lg:flex">
          <SearchBar class="w-full max-w-xs" />
        </div>

        <div class="hidden items-center gap-5 text-sm text-ink lg:flex">
          <RouterLink to="/masuk" class="transition-colors hover:text-accent">
            Masuk <span class="text-xs text-mute">(segera)</span>
          </RouterLink>
          <RouterLink to="/keranjang" class="transition-colors hover:text-accent">
            Keranjang <span class="text-xs text-mute">(segera)</span>
          </RouterLink>
        </div>

        <button
          ref="menuButton"
          type="button"
          class="flex min-h-11 items-center gap-2 border border-line px-3 text-sm font-medium text-ink transition-colors hover:border-ink lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="menu-mobile"
          @click="toggleMenu"
        >
          <span class="sr-only">{{ menuOpen ? "Tutup menu" : "Buka menu" }}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path v-if="!menuOpen" d="M3 6h14M3 10h14M3 14h14" stroke-linecap="round" />
            <path v-else d="M5 5l10 10M15 5L5 15" stroke-linecap="round" />
          </svg>
          <span aria-hidden="true">{{ menuOpen ? "Tutup" : "Menu" }}</span>
        </button>
      </div>

      <div class="pb-4 lg:hidden">
        <SearchBar />
      </div>

      <div
        v-show="menuOpen"
        id="menu-mobile"
        class="border-t border-line pb-5"
      >
        <nav class="flex flex-col" aria-label="Navigasi seluler">
          <RouterLink
            ref="firstMenuLink"
            :to="{ path: '/', hash: '#kategori' }"
            class="flex min-h-11 items-center border-b border-line text-base"
            @click="closeMenu"
          >
            Kategori
          </RouterLink>
          <RouterLink
            :to="{ path: '/', hash: '#pratinjau' }"
            class="flex min-h-11 items-center border-b border-line text-base"
            @click="closeMenu"
          >
            Pratinjau
          </RouterLink>
          <RouterLink
            to="/masuk"
            class="flex min-h-11 items-center justify-between border-b border-line text-base"
            @click="closeMenu"
          >
            <span>Masuk</span>
            <span class="text-xs text-mute">segera</span>
          </RouterLink>
          <RouterLink
            to="/keranjang"
            class="flex min-h-11 items-center justify-between text-base"
            @click="closeMenu"
          >
            <span>Keranjang</span>
            <span class="text-xs text-mute">segera</span>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>
