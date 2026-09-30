# Panda AI

Website landing page dan live floating AI widget yang clean, responsif, dan bisa di-drag.

## Menjalankan lokal

```bash
python3 -m http.server 4173
```

Buka `http://localhost:4173`.

## Yang tersedia

- Landing page responsif dengan section fitur, cara kerja, dan embed snippet.
- Tombol **Play Panda** menampilkan launcher Panda kecil di kanan bawah.
- Launcher bisa dibuka/tutup dan digeser ke posisi lain.
- Setup screen mendukung mode demo, OpenAI/ChatGPT, Google Gemini, Anthropic Claude, dan custom OpenAI-compatible endpoint.
- Chat panel mendukung minimize, close, quick prompt, multiline input, dan pemanggilan API langsung dari browser.
- Menu pengaturan Panda untuk menyembunyikan launcher, mengatur opacity tombol, dan mengubah ukuran tombol floating secara live.
- Preferensi widget disimpan lokal di browser, sedangkan API key tidak ditulis ke localStorage. Untuk deployment production, gunakan server-side proxy agar key tidak terekspos di browser.

Struktur utama:

- `index.html` — halaman home dan visual landing page.
- `features.html` — halaman fitur Panda.
- `how-it-works.html` — halaman cara kerja Panda.
- `integrations.html` — halaman provider dan instalasi widget.
- `docs.html` — halaman dokumentasi dan API methods.
- `styles.css` dan `pages.css` — sistem visual, responsive layout, dan styling widget/inner pages.
- `app.js` — interaksi landing page, widget draggable, setup provider, chat, serta adapter API.
- `widget.js` — script embeddable standalone; tambahkan `<script src="/widget.js"></script>` di website lain atau panggil `PandaAI.init()`.

Menu utama sengaja menggunakan halaman terpisah, bukan anchor satu halaman, supaya tiap informasi memiliki ruang dan URL sendiri.
