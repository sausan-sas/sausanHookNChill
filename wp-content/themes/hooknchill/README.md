# Hooknchill WordPress Theme

Tema awal Hooknchill. Memerlukan WordPress 6.4+, PHP 8.0+, dan WooCommerce untuk katalog, halaman produk, dan keranjang.

## Instalasi

1. Salin folder `hooknchill` ke `wp-content/themes/` pada instalasi WordPress.
2. Aktifkan tema **Hooknchill** melalui **Tampilan > Tema**.
3. Pasang WooCommerce, lalu tambahkan produk dan kategori.
4. Salin dan aktifkan plugin `wp-content/plugins/hooknchill-operations/` jika ingin menyiapkan tabel custom pesanan dan mutasi stok. Rincian migration ada di README plugin.
5. Pilih halaman beranda statis di **Pengaturan > Membaca**.
6. Buat halaman dengan slug `pesan-custom`, `manajemen-usaha`, `login-usaha`, `cerita-kami`, `faq`, dan `kontak`, lalu atur navigasi di **Tampilan > Menu**.
7. Tambahkan foto produk dan thumbnail kategori melalui Media WordPress.

## Melihat di browser

1. Buat situs lokal WordPress dengan LocalWP, lalu aktifkan WooCommerce.
2. Salin folder tema ini ke `app/public/wp-content/themes/hooknchill` pada situs LocalWP dan aktifkan tema tersebut.
3. Buat halaman dengan slug di atas. Pilih halaman Beranda sebagai halaman statis melalui **Pengaturan > Membaca**.
4. Buka URL situs lokal: `/` untuk beranda, `/shop/` untuk katalog (slug bisa mengikuti pengaturan halaman toko), lalu pilih kartu produk untuk melihat detailnya. `/login-usaha/` membuka login dan `/manajemen-usaha/` membuka area pengelola.
5. Masuk menggunakan akun Administrator atau Shop Manager. Di dashboard, tab Ringkasan, Kasir, Produk & stok, dan Laporan berpindah dalam satu halaman.

## Halaman pengelolaan

Buat halaman WordPress dengan slug `manajemen-usaha` dan `login-usaha` untuk memakai template dashboard serta login. Akses dashboard dibatasi ke administrator atau akun dengan capability `manage_woocommerce` (misalnya peran Shop Manager WooCommerce). Login memakai autentikasi WordPress.

Dashboard, kasir, stok, dan laporan adalah prototipe frontend. Produk dan transaksi contoh, transaksi POS demo, perubahan stok, serta ekspor laporan berjalan di browser dan disimpan di `localStorage`; belum membaca atau menulis data WooCommerce/database. Untuk melihat katalog dan detail produk sesungguhnya, buat produk/kategori WooCommerce dan isi foto produk.

Halaman `pesan-custom` menggunakan template tema dan mengirim detail pesanan ke alamat email admin WordPress. Atur alamat tersebut di **Pengaturan > Umum** dan pastikan hosting mempunyai SMTP/email transactional yang berfungsi. Gambar referensi dibatasi 5 MB (JPG, PNG, WebP), dikirim sebagai lampiran email, lalu dihapus dari folder upload.

Pembayaran dan tarif ongkir belum terintegrasi. Pilih dan uji plugin/provider yang kompatibel sebelum mengaktifkan transaksi; jangan simpan kredensial di file tema.