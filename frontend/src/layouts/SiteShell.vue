<script setup>
import SiteFooter from "../components/SiteFooter.vue"
import SiteHeader from "../components/SiteHeader.vue"
</script>

<template>
  <div class="flex min-h-svh flex-col">
    <a class="skip-link" href="#konten">Lewati ke konten utama</a>
    <SiteHeader />
    <main id="konten" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
