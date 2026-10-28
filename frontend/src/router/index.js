import { createRouter, createWebHistory } from "vue-router"

import HomePage from "../pages/HomePage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/masuk",
      name: "login",
      component: () => import("../pages/ComingSoonPage.vue"),
      meta: {
        title: "Masuk",
        heading: "Masuk",
        description:
          "Akun pelanggan belum aktif. Pendaftaran, masuk, dan profil dibangun setelah katalog terhubung ke database.",
        note: "Sampai saat itu, ATLAS tidak menyimpan data akun.",
      },
    },
    {
      path: "/keranjang",
      name: "cart",
      component: () => import("../pages/ComingSoonPage.vue"),
      meta: {
        title: "Keranjang",
        heading: "Keranjang",
        description:
          "Keranjang belum aktif. Penambahan produk, jumlah, dan checkout dibangun setelah katalog dan akun siap.",
        note: "Sampai saat itu, tidak ada pesanan yang bisa dibuat.",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../pages/NotFoundPage.vue"),
      meta: {
        title: "Halaman tidak ditemukan",
      },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"

    if (to.hash) {
      return { el: to.hash, top: 96, behavior }
    }

    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} | ATLAS`
    : "ATLAS | Marketplace lintas kategori"
})

export default router
