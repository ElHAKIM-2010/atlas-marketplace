<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import CategoryNav from "../components/CategoryNav.vue"
import EmptyState from "../components/EmptyState.vue"
import ErrorState from "../components/ErrorState.vue"
import LoadingState from "../components/LoadingState.vue"
import SectionHeading from "../components/SectionHeading.vue"
import { categories, categoryName } from "../data/categories"
import { getSampleProducts } from "../services/sampleCatalog"

const route = useRoute()
const router = useRouter()

const status = ref("loading")
const products = ref([])
const errorMessage = ref("")

async function loadProducts() {
  status.value = "loading"
  errorMessage.value = ""

  try {
    products.value = await getSampleProducts()
    status.value = "ready"
  } catch (error) {
    status.value = "error"
    errorMessage.value =
      error instanceof Error ? error.message : "Data contoh tidak bisa dimuat."
  }
}

onMounted(loadProducts)

const searchTerm = computed(() =>
  typeof route.query.q === "string" ? route.query.q.trim() : "",
)
const activeCategory = computed(() =>
  typeof route.query.kategori === "string" ? route.query.kategori : "",
)
const hasFilters = computed(() => Boolean(searchTerm.value || activeCategory.value))
const isReady = computed(() => status.value === "ready")

const filteredProducts = computed(() => {
  if (!isReady.value) return []

  const term = searchTerm.value.toLocaleLowerCase("id-ID")

  return products.value.filter((product) => {
    if (activeCategory.value && product.category !== activeCategory.value) {
      return false
    }
    if (!term) return true

    const haystack = `${product.name} ${categoryName(product.category)} ${product.description}`
    return haystack.toLocaleLowerCase("id-ID").includes(term)
  })
})

const resultSummary = computed(() => {
  if (!isReady.value) return ""

  const count = filteredProducts.value.length

  if (searchTerm.value) {
    return `${count} contoh cocok dengan "${searchTerm.value}".`
  }
  if (activeCategory.value) {
    return `${count} contoh dalam kategori ${categoryName(activeCategory.value)}.`
  }
  return `${count} contoh untuk menguji pencarian dan filter.`
})

function clearFilters() {
  router.push({ path: "/", hash: "#pratinjau" })
}
</script>

<template>
  <div>
    <section class="border-b border-line">
      <div class="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <p class="font-serif text-sm text-mute">Marketplace lintas kategori</p>
          <h1 class="hero-title mt-5 font-serif text-ink">
            <span class="block">Everything You Need.</span>
            <span class="block">One Destination.</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Satu tempat untuk elektronik, busana, rumah, perawatan diri, olahraga, aksesori, dan
            kebutuhan harian.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#pratinjau"
              class="inline-flex min-h-11 items-center border border-ink bg-ink px-5 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent"
            >
              Lihat pratinjau katalog
            </a>
            <a
              href="#kategori"
              class="text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Telusuri tujuh kategori
            </a>
          </div>

          <p class="mt-6 max-w-md text-sm leading-relaxed text-mute">
            Katalog asli belum aktif. Pratinjau di halaman ini memakai data contoh yang diberi
            label.
          </p>
        </div>

        <div id="kategori" class="scroll-mt-8 lg:col-span-5 lg:scroll-mt-24">
          <div class="flex items-baseline justify-between border-b border-ink pb-3">
            <h2 class="font-serif text-xl text-ink">Indeks kategori</h2>
            <span class="text-sm text-mute">Tujuh kategori</span>
          </div>
          <CategoryNav :categories="categories" :active-slug="activeCategory" />
        </div>
      </div>
    </section>

    <section id="pratinjau" class="scroll-mt-8 border-b border-line lg:scroll-mt-24">
      <div class="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionHeading
          index="01"
          title="Pratinjau katalog"
          description="Contoh untuk menguji pencarian dan filter. Nama, kategori, dan deskripsi di bawah bukan produk yang sedang dijual."
        />

        <div
          v-if="isReady"
          class="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3"
        >
          <p class="text-sm text-mute" aria-live="polite">{{ resultSummary }}</p>
          <button
            v-if="hasFilters && filteredProducts.length"
            type="button"
            class="min-h-11 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            @click="clearFilters"
          >
            Hapus filter
          </button>
        </div>

        <LoadingState
          v-if="status === 'loading'"
          class="mt-8 text-mute"
          message="Memuat contoh katalog"
        />

        <ErrorState
          v-else-if="status === 'error'"
          class="mt-8"
          :message="errorMessage"
          @retry="loadProducts"
        />

        <template v-else>
          <ol v-if="filteredProducts.length" class="divide-y divide-line border-b border-line">
            <li
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              class="flex items-start gap-4 py-5 sm:gap-6"
            >
              <span
                aria-hidden="true"
                class="w-7 shrink-0 pt-1 font-serif text-sm tabular-nums text-mute"
              >
                {{ String(index + 1).padStart(2, "0") }}
              </span>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 class="font-serif text-2xl leading-tight text-ink">{{ product.name }}</h3>
                  <span class="border border-line px-2 py-0.5 text-xs text-mute">Contoh</span>
                </div>
                <p class="mt-1 text-sm text-mute">
                  {{ categoryName(product.category) }}. {{ product.description }}
                </p>
              </div>
            </li>
          </ol>

          <EmptyState
            v-else
            title="Belum ada contoh yang cocok"
            message="Pencarian ini hanya menyaring data contoh. Coba kata lain atau hapus filter untuk melihat semuanya."
            action-label="Hapus filter"
            @action="clearFilters"
          />
        </template>
      </div>
    </section>

    <section class="bg-ink text-canvas">
      <div class="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-12 md:items-end md:py-20">
        <p class="font-serif text-3xl leading-tight md:col-span-8 md:text-5xl">
          Satu tempat untuk kebutuhan harian, dari elektronik sampai perawatan diri.
        </p>
        <div class="md:col-span-4 md:justify-self-end">
          <p class="text-sm leading-relaxed text-canvas/75">
            Katalog, akun, dan checkout dibangun bertahap. Situs ini belum menerima pesanan.
          </p>
          <a
            href="#kategori"
            class="mt-5 inline-block border-b border-canvas/60 pb-1 text-sm text-canvas transition-colors hover:border-canvas"
          >
            Kembali ke kategori
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
