<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-12">
      <div class="md:col-span-5">
        <p class="font-serif text-2xl text-ink">ATLAS</p>
        <p class="mt-2 text-sm text-mute">Everything You Need. One Destination.</p>
        <p class="mt-6 max-w-sm text-sm leading-relaxed text-mute">
          ATLAS masih dalam pengembangan. Kebijakan privasi, pengembalian, dan pembayaran akan
          ditambahkan sebelum penjualan dibuka.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
        <div>
          <h2 class="text-sm font-semibold text-ink">Jelajahi</h2>
          <ul class="mt-3 space-y-2 text-sm text-mute">
            <li>
              <RouterLink :to="{ path: '/', hash: '#kategori' }" class="transition-colors hover:text-accent">
                Kategori
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ path: '/', hash: '#pratinjau' }" class="transition-colors hover:text-accent">
                Pratinjau katalog
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-sm font-semibold text-ink">Akun</h2>
          <ul class="mt-3 space-y-2 text-sm text-mute">
            <li>
              <RouterLink to="/masuk" class="transition-colors hover:text-accent">
                Masuk (segera)
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/keranjang" class="transition-colors hover:text-accent">
                Keranjang (segera)
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-sm font-semibold text-ink">Status</h2>
          <p class="mt-3 text-sm leading-relaxed text-mute">
            Katalog contoh aktif. Akun, keranjang, dan checkout belum aktif.
          </p>
        </div>
      </div>
    </div>

    <div class="border-t border-line">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-mute sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ year }} ATLAS. Situs dalam pengembangan.</p>
        <p>Tidak ada transaksi yang diproses saat ini.</p>
      </div>
    </div>
  </footer>
</template>
