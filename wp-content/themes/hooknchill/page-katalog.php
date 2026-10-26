<?php
/**
 * Template Name: Katalog Produk
 * Description: Halaman katalog produk kerajinan rajut dengan filter kategori dan pencarian.
 */
hooknchill_require_shop_manager();
get_header( 'management' );
?>
<div class="management-app" id="katalog-app">
	<aside class="management-sidebar">
		<a class="management-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="management-brand-mark">h.</span><span>hooknchill<small>WORKROOM</small></span></a>
		<div class="sidebar-label"><?php esc_html_e( 'TOKO', 'hooknchill' ); ?></div>
		<nav class="management-nav" aria-label="<?php esc_attr_e( 'Navigasi pengelolaan', 'hooknchill' ); ?>">
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/manajemen-usaha/' ) ); ?>"><span class="nav-icon">◫</span><?php esc_html_e( 'Ringkasan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/kasir/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Kasir', 'hooknchill' ); ?></a>
			<a class="management-nav-link is-active" href="<?php echo esc_url( home_url( '/katalog/' ) ); ?>"><span class="nav-icon">▦</span><?php esc_html_e( 'Katalog', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/stok/' ) ); ?>"><span class="nav-icon">▧</span><?php esc_html_e( 'Stok', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/pesanan/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Pesanan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/laporan/' ) ); ?>"><span class="nav-icon">▥</span><?php esc_html_e( 'Laporan', 'hooknchill' ); ?></a>
		</nav>
		<div class="sidebar-bottom"><div class="sidebar-status"><span></span><?php esc_html_e( 'Mode prototipe', 'hooknchill' ); ?></div><a class="management-nav-link" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="nav-icon">↗</span><?php esc_html_e( 'Lihat toko', 'hooknchill' ); ?></a></div>
	</aside>
	<div class="management-main">
		<header class="management-topbar"><div><p class="topbar-date" id="katalog-date"><?php echo esc_html( date_i18n( 'l, j F Y' ) ); ?></p><h1><?php esc_html_e( 'Katalog Produk Rajut', 'hooknchill' ); ?></h1></div><div class="topbar-actions"><span class="prototype-badge"><span></span><?php esc_html_e( 'DATA CONTOH', 'hooknchill' ); ?></span><div class="topbar-user"><span class="user-avatar"><?php echo esc_html( strtoupper( substr( wp_get_current_user()->display_name, 0, 1 ) ) ); ?></span><span class="user-name"><?php echo esc_html( wp_get_current_user()->display_name ); ?></span></div><a class="logout-link" href="<?php echo esc_url( wp_logout_url( home_url( '/login-usaha/' ) ) ); ?>" aria-label="<?php esc_attr_e( 'Keluar', 'hooknchill' ); ?>">↗</a></div></header>
		<main id="main-content" class="management-content">
			<section class="view-intro"><div><p class="view-kicker"><?php esc_html_e( 'KERAJINAN RAJUT', 'hooknchill' ); ?></p><h2><?php esc_html_e( 'Semua koleksi rajutan', 'hooknchill' ); ?></h2><p><?php esc_html_e( 'Jelajahi berbagai produk kerajinan rajut: tas, amigurumi, dompet, aksesori, dan tempat laptop.', 'hooknchill' ); ?></p></div></section>
			<section class="panel inventory-panel"><div class="inventory-toolbar"><label class="management-search"><span>⌕</span><input id="katalog-search" type="search" placeholder="<?php esc_attr_e( 'Cari produk atau SKU...', 'hooknchill' ); ?>"></label><select id="katalog-category" aria-label="<?php esc_attr_e( 'Filter kategori', 'hooknchill' ); ?>"><option value="all"><?php esc_html_e( 'Semua kategori', 'hooknchill' ); ?></option></select><select id="katalog-stock" aria-label="<?php esc_attr_e( 'Filter status stok', 'hooknchill' ); ?>"><option value="all"><?php esc_html_e( 'Semua stok', 'hooknchill' ); ?></option><option value="available"><?php esc_html_e( 'Tersedia', 'hooknchill' ); ?></option><option value="low"><?php esc_html_e( 'Stok menipis', 'hooknchill' ); ?></option><option value="out"><?php esc_html_e( 'Habis', 'hooknchill' ); ?></option></select><select id="katalog-sort" aria-label="<?php esc_attr_e( 'Urutkan produk', 'hooknchill' ); ?>"><option value="newest"><?php esc_html_e( 'Terbaru', 'hooknchill' ); ?></option><option value="price-asc"><?php esc_html_e( 'Harga terendah', 'hooknchill' ); ?></option><option value="price-desc"><?php esc_html_e( 'Harga tertinggi', 'hooknchill' ); ?></option><option value="name"><?php esc_html_e( 'Nama A-Z', 'hooknchill' ); ?></option></select><button class="button button-primary" id="add-product" type="button" style="margin-left:auto">＋ <span><?php esc_html_e( 'Tambah Produk', 'hooknchill' ); ?></span></button></div><p class="result-info" id="katalog-result-info"></p><div class="table-wrap"><table class="management-table inventory-table"><thead><tr><th><?php esc_html_e( 'Produk', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Kategori', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Harga', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Stok', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Status', 'hooknchill' ); ?></th><th><span class="screen-reader-text"><?php esc_html_e( 'Aksi', 'hooknchill' ); ?></span></th></tr></thead><tbody id="katalog-body"></tbody></table></div><p class="local-data-note inventory-note"><?php esc_html_e( 'Data contoh tersimpan di browser ini, belum terhubung ke database.', 'hooknchill' ); ?></p></section>
		</main>
	</div>
</div>
<dialog class="product-dialog" id="product-dialog"><form id="product-form" method="dialog"><div class="dialog-heading"><div><p class="view-kicker"><?php esc_html_e( 'KATALOG PRODUK', 'hooknchill' ); ?></p><h2 id="product-dialog-title"><?php esc_html_e( 'Tambah Produk', 'hooknchill' ); ?></h2></div><button class="icon-button" value="cancel" aria-label="<?php esc_attr_e( 'Tutup', 'hooknchill' ); ?>">×</button></div><input type="hidden" id="product-id"><label><?php esc_html_e( 'Nama Produk', 'hooknchill' ); ?><input id="product-name" name="name" required maxlength="80"></label><div class="dialog-fields"><label><?php esc_html_e( 'Kategori', 'hooknchill' ); ?><select id="product-category" required></select></label><label><?php esc_html_e( 'SKU', 'hooknchill' ); ?><input id="product-sku" required maxlength="24"></label><label><?php esc_html_e( 'Harga (Rp)', 'hooknchill' ); ?><input id="product-price" type="number" min="0" step="1000" required></label><label><?php esc_html_e( 'Stok', 'hooknchill' ); ?><input id="product-stock" type="number" min="0" step="1" required></label></div><div class="dialog-actions"><button class="button button-outline" value="cancel"><?php esc_html_e( 'Batal', 'hooknchill' ); ?></button><button class="button button-primary" id="save-product" value="default"><?php esc_html_e( 'Simpan Produk', 'hooknchill' ); ?></button></div></form></dialog>
<div class="toast-message" id="katalog-toast" role="status" aria-live="polite"></div>
<?php
wp_enqueue_script( 'hooknchill-katalog', get_theme_file_uri( '/assets/js/katalog.js' ), array( 'hooknchill-data-produk' ), '1.0.1', true );
wp_localize_script(
	'hooknchill-katalog',
	'HooknchillKatalog',
	array( 'imagesUrl' => get_theme_file_uri( '/images' ) )
);
get_footer( 'management' );
