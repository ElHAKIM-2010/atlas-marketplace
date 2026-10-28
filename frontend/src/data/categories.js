export const categories = [
  {
    slug: "elektronik",
    name: "Elektronik dan gadget",
    description: "Audio, komputer, dan aksesori harian.",
  },
  {
    slug: "busana",
    name: "Busana",
    description: "Pakaian dan lapisan dasar.",
  },
  {
    slug: "rumah",
    name: "Rumah dan hunian",
    description: "Perlengkapan ruang dan dapur.",
  },
  {
    slug: "kecantikan",
    name: "Kecantikan dan perawatan",
    description: "Perawatan kulit dan tubuh.",
  },
  {
    slug: "olahraga",
    name: "Olahraga dan luar ruang",
    description: "Latihan dan aktivitas luar.",
  },
  {
    slug: "aksesori",
    name: "Aksesori",
    description: "Tas, jam, dan pelengkap.",
  },
  {
    slug: "harian",
    name: "Kebutuhan harian",
    description: "Barang pakai sehari-hari.",
  },
]

export function categoryName(slug) {
  return categories.find((category) => category.slug === slug)?.name ?? "Kategori lain"
}
