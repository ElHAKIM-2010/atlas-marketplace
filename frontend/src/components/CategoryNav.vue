<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
  activeSlug: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <nav aria-label="Kategori produk">
    <ul class="border-t border-line">
      <li v-for="(category, index) in categories" :key="category.slug" class="border-b border-line">
        <RouterLink
          :to="{ path: '/', query: { kategori: category.slug }, hash: '#pratinjau' }"
          class="group flex min-h-11 items-start gap-4 py-3 transition-colors"
          :class="activeSlug === category.slug ? 'text-accent' : 'text-ink hover:text-accent'"
          :aria-current="activeSlug === category.slug ? 'true' : undefined"
        >
          <span
            class="w-6 shrink-0 pt-0.5 font-serif text-sm tabular-nums"
            :class="activeSlug === category.slug ? 'text-accent' : 'text-mute group-hover:text-accent'"
          >
            {{ String(index + 1).padStart(2, "0") }}
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-base font-medium">{{ category.name }}</span>
            <span class="mt-0.5 hidden text-sm text-mute sm:block">{{ category.description }}</span>
          </span>
        </RouterLink>
      </li>
    </ul>
    <RouterLink
      v-if="activeSlug"
      :to="{ path: '/', hash: '#kategori' }"
      class="mt-4 inline-block text-sm text-accent underline underline-offset-4"
    >
      Tampilkan semua kategori
    </RouterLink>
  </nav>
</template>
