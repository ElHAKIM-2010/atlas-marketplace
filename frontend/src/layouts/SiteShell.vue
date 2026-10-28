<script setup></script>

<template>
  <div class="min-h-svh">
    <header class="border-b border-line">
      <div class="mx-auto flex max-w-5xl items-baseline justify-between px-5 py-5">
        <p class="font-serif text-xl tracking-tight text-ink">ATLAS</p>
        <p class="text-sm text-mute">Kerangka proyek</p>
      </div>
    </header>
    <main class="mx-auto max-w-5xl px-5 py-12">
      <slot />
    </main>
  </div>
</template>
