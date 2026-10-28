<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    default: "",
  },
})

defineEmits(["action"])
</script>

<template>
  <div class="border border-line px-6 py-10">
    <h3 class="font-serif text-2xl text-ink">{{ title }}</h3>
    <p class="mt-2 max-w-xl text-mute">{{ message }}</p>
    <button
      v-if="actionLabel"
      type="button"
      class="mt-6 inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
