# Hooknchill Operations

Plugin ini menyiapkan tabel custom untuk mutasi stok produk jadi, pesanan custom, dan riwayat statusnya. Plugin tidak mengganti tabel pengguna, produk, kategori, order, maupun item order WordPress/WooCommerce.

## Instalasi

1. Salin folder `hooknchill-operations` ke `wp-content/plugins/`.
2. Aktifkan **Hooknchill Operations** melalui **Plugin > Plugin Terpasang**.
3. Saat aktivasi, migration versi `1.0.0` memakai `dbDelta()` dan prefix database WordPress yang aktif.

Tabel yang dibuat: `${prefix}hc_stock_movements`, `${prefix}hc_custom_orders`, dan `${prefix}hc_custom_order_events`. Versi schema disimpan pada opsi `hooknchill_operations_schema_version`; pemeriksaan upgrade berjalan saat plugin dimuat. Aktivasi tidak menghapus data.

Referensi ke ID produk/varian, user, order, dan item order adalah relasi logis. Core WordPress/WooCommerce tidak menggunakan foreign key fisik, sehingga operasi data berikutnya harus memvalidasi referensi dan menggunakan API WooCommerce. Tabel order WooCommerce dapat memakai HPOS atau penyimpanan legacy.

Migration baru membuat/memperbarui struktur saja; belum ada CRUD atau koneksi UI. Setelah aktivasi, verifikasi tabel di database staging sebelum mengintegrasikannya dengan alur stok dan pesanan.