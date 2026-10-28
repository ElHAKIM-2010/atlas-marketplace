<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})

defineEmits(["retry"])
</script>

<template>
  <div role="alert" class="flex flex-col gap-3">
    <p class="text-ink">{{ message }}</p>
    <button
      type="button"
      class="w-fit border border-ink bg-ink px-4 py-2 text-sm text-canvas"
      @click="$emit('retry')"
    >
      Coba lagi
    </button>
  </div>
</template>
