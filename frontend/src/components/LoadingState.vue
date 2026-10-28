<script setup>
defineProps({
  message: {
    type: String,
    default: "Memuat",
  },
})
</script>

<template>
  <p role="status" class="text-mute">{{ message }}</p>
</template>
