# List Hidupku - Bucket List App

Aplikasi bucket list lengkap dengan fitur CRUD, animasi menarik, dan desain aesthetic untuk merencanakan, melacak, dan mewujudkan impian hidup Anda.

## ✨ Fitur Utama

- **📝 CRUD Lengkap**: Tambah, edit, hapus, dan toggle status impian
- **📅 Tanggal Penyelesaian**: Catat kapan impian tercapai
- **📸 Foto Bukti**: Upload foto sebagai bukti pencapaian
- **🏷️ Kategori**: Travel, Adventure, Career, Learning, Personal, Achievement
- **⭐ Sistem Prioritas**: Low, Medium, High
- **🎯 Target Umur**: Set target umur untuk pencapaian
- **📊 Analytics**: Visualisasi progress dengan charts
- **🏆 Achievement System**: Badge dan pencapaian khusus
- **🌙 Dark/Light Mode**: Toggle tema terang/gelap
- **💾 Local Storage**: Data tersimpan otomatis di browser
- **📱 Responsive Design**: Tampil sempurna di semua perangkat
- **🎨 Animasi Smooth**: Menggunakan Motion (Framer Motion)
- **💫 Vision Board**: Tampilan visual inspiratif
- **📈 Timeline View**: Lihat progress dalam bentuk timeline
- **📤 Export/Import**: Backup dan restore data
- **🎯 Goal Templates**: Template impian siap pakai

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Instalasi

1. **Clone atau download project ini**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```

4. **Buka browser dan akses:**
   ```
   http://localhost:5173
   ```

### Scripts yang Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint

## 🛠️ Teknologi yang Digunakan

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS v4** - Styling Framework
- **Motion** (Framer Motion) - Animasi
- **Lucide React** - Icon Library
- **Recharts** - Chart Library
- **ShadCN/UI** - UI Components
- **React Hook Form** - Form Handling

## 📁 Struktur Project

```
├── src/
│   └── main.tsx           # Entry point
├── components/
│   ├── ui/               # ShadCN UI components
│   ├── BucketForm.tsx    # Form untuk tambah impian
│   ├── TodoItem.tsx      # Item impian dengan foto & tanggal
│   ├── CompletionDialog.tsx # Dialog penyelesaian
│   ├── RecentAchievements.tsx # Pencapaian terbaru
│   ├── VisionBoard.tsx   # Vision board view
│   ├── Timeline.tsx      # Timeline view
│   ├── Analytics.tsx     # Analytics dashboard
│   └── ...
├── styles/
│   └── globals.css       # Global styles & Tailwind config
├── App.tsx              # Main component
└── package.json         # Dependencies & scripts
```

## 🎯 Cara Menggunakan

### 1. Menambah Impian Baru
- Isi form di bagian atas
- Pilih kategori (Travel, Adventure, Career, dll.)
- Set prioritas (Low, Medium, High)
- Tambahkan target umur (opsional)
- Klik "Tambah ke List Hidupku"

### 2. Menyelesaikan Impian
- Klik checkbox di samping impian
- Dialog akan muncul untuk:
  - Set tanggal penyelesaian
  - Upload foto bukti (opsional)
  - Tambah catatan pencapaian (opsional)
- Klik "Tandai Selesai"

### 3. Melihat Progress
- Gunakan tab "Analytics" untuk melihat statistik
- Tab "Timeline" untuk melihat progress chronological
- Tab "Vision" untuk tampilan visual inspiratif
- Sidebar kiri menampilkan filter dan statistik

### 4. Export/Import Data
- Klik tombol "Export" untuk backup data
- Gunakan "Import" untuk restore dari file backup
- Data tersimpan otomatis di localStorage browser

## 🎨 Customization

### Theme Colors
Edit file `styles/globals.css` untuk mengubah warna tema:

```css :root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... */
}
```

### Kategori Baru
Edit file `components/TodoItem.tsx` untuk menambah kategori:

```typescript
const icons = {
  travel: <Plane className="w-4 h-4" />,
  newCategory: <YourIcon className="w-4 h-4" />,
  // ...
};
```

## 🤝 Contributing

Kontribusi selalu diterima! Silakan:

1. Fork project ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📝 License

Project ini bersifat open source dan dapat digunakan secara bebas.

## 🙏 Acknowledgments

- [ShadCN](https://ui.shadcn.com/) untuk UI components
- [Lucide](https://lucide.dev/) untuk icons
- [Motion](https://motion.dev/) untuk animasi
- [Tailwind CSS](https://tailwindcss.com/) untuk styling

---

**Dibuat dengan ❤️ untuk membantu mewujudkan impian hidup Anda!**