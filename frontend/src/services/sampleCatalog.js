export async function getSampleProducts() {
  let response

  try {
    response = await fetch("/data/sample-products.json", {
      headers: { Accept: "application/json" },
    })
  } catch {
    throw new Error("Data contoh gagal dimuat. Periksa koneksi Anda, lalu coba lagi.")
  }

  if (!response.ok) {
    throw new Error(`Data contoh tidak bisa dimuat (kode ${response.status}).`)
  }

  const data = await response.json().catch(() => {
    throw new Error("Format data contoh tidak dikenali.")
  })

  if (!Array.isArray(data)) {
    throw new Error("Format data contoh tidak dikenali.")
  }

  return data
}
