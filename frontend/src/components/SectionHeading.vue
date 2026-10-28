<script setup>
defineProps({
  index: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <div class="flex items-start gap-5">
    <span class="mt-1 w-8 shrink-0 font-serif text-sm tabular-nums text-accent">
      {{ index }}
    </span>
    <div class="min-w-0">
      <h2 class="font-serif text-3xl leading-tight text-ink md:text-4xl">
        {{ title }}
      </h2>
      <p v-if="description" class="mt-3 max-w-2xl text-mute">
        {{ description }}
      </p>
    </div>
  </div>
</template>
