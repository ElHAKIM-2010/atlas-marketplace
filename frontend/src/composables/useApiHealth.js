import { onMounted, ref } from "vue"

import { getHealth } from "../services/api"

export function useApiHealth() {
  const status = ref("loading")
  const payload = ref(null)
  const errorMessage = ref("")

  async function refresh() {
    status.value = "loading"
    errorMessage.value = ""
    payload.value = null

    try {
      payload.value = await getHealth()
      status.value = payload.value?.status === "ok" ? "ok" : "error"
      if (status.value === "error") {
        errorMessage.value = "API merespons, tetapi status tidak ok."
      }
    } catch (error) {
      status.value = "error"
      errorMessage.value =
        error instanceof Error
          ? error.message
          : "Tidak bisa menghubungi API. Pastikan Django sedang berjalan."
    }
  }

  onMounted(refresh)

  return { status, payload, errorMessage, refresh }
}
