<script setup>
import ErrorState from "../components/ErrorState.vue"
import LoadingState from "../components/LoadingState.vue"
import { useApiHealth } from "../composables/useApiHealth"

const { status, payload, errorMessage, refresh } = useApiHealth()
</script>

<template>
  <article class="max-w-xl">
    <p class="mb-3 text-sm text-mute">Halaman sementara Milestone 2</p>
    <h1 class="font-serif text-4xl leading-tight text-ink">ATLAS</h1>
    <p class="mt-3 text-lg text-mute">Everything You Need. One Destination.</p>
    <p class="mt-8 text-ink">
      Ini bukan homepage toko. Halaman ini hanya memastikan Vue, Vite, dan Django
      REST API sudah saling terhubung.
    </p>

    <section class="mt-10 border-t border-line pt-8" aria-labelledby="api-status-heading">
      <h2 id="api-status-heading" class="text-base font-semibold text-ink">
        Status API
      </h2>

      <LoadingState v-if="status === 'loading'" message="Menghubungi Django" />
      <ErrorState
        v-else-if="status === 'error'"
        :message="errorMessage"
        @retry="refresh"
      />
      <p v-else-if="payload" class="mt-3 text-ink">
        Backend merespons:
        <code class="font-sans">{{ payload.service }} / {{ payload.status }}</code>
      </p>
    </section>
  </article>
</template>
