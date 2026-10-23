<?php
/**
 * Template Name: Pengelolaan Stok
 * Description: Halaman pengelolaan stok produk kerajinan rajut.
 */
hooknchill_require_shop_manager();
get_header( 'management' );
?>
<div class="management-app" id="stok-app">
	<aside class="management-sidebar">
		<a class="management-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="management-brand-mark">h.</span><span>hooknchill<small>WORKROOM</small></span></a>
		<div class="sidebar-label"><?php esc_html_e( 'TOKO', 'hooknchill' ); ?></div>
		<nav class="management-nav" aria-label="<?php esc_attr_e( 'Navigasi pengelolaan', 'hooknchill' ); ?>">
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/manajemen-usaha/' ) ); ?>"><span class="nav-icon">◫</span><?php esc_html_e( 'Ringkasan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/kasir/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Kasir', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/katalog/' ) ); ?>"><span class="nav-icon">▦</span><?php esc_html_e( 'Katalog', 'hooknchill' ); ?></a>
			<a class="management-nav-link is-active" href="<?php echo esc_url( home_url( '/stok/' ) ); ?>"><span class="nav-icon">▧</span><?php esc_html_e( 'Stok', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/pesanan/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Pesanan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/laporan/' ) ); ?>"><span class="nav-icon">▥</span><?php esc_html_e( 'Laporan', 'hooknchill' ); ?></a>
		</nav>
		<div class="sidebar-bottom"><div class="sidebar-status"><span></span><?php esc_html_e( 'Mode prototipe', 'hooknchill' ); ?></div><a class="management-nav-link" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="nav-icon">↗</span><?php esc_html_e( 'Lihat toko', 'hooknchill' ); ?></a></div>
	</aside>
	<div class="management-main">
		<header class="management-topbar"><div><p class="topbar-date"><?php echo esc_html( date_i18n( 'l, j F Y' ) ); ?></p><h1><?php esc_html_e( 'Pengelolaan Stok', 'hooknchill' ); ?></h1></div><div class="topbar-actions"><span class="prototype-badge"><span></span><?php esc_html_e( 'DATA CONTOH', 'hooknchill' ); ?></span><div class="topbar-user"><span class="user-avatar"><?php echo esc_html( strtoupper( substr( wp_get_current_user()->display_name, 0, 1 ) ) ); ?></span><span class="user-name"><?php echo esc_html( wp_get_current_user()->display_name ); ?></span></div><a class="logout-link" href="<?php echo esc_url( wp_logout_url( home_url( '/login-usaha/' ) ) ); ?>" aria-label="<?php esc_attr_e( 'Keluar', 'hooknchill' ); ?>">↗</a></div></header>
		<main id="main-content" class="management-content">
			<section class="metric-grid">
				<article class="metric-card"><div class="metric-top"><span>Total Produk</span><span class="metric-icon">▦</span></div><strong id="stok-total">0</strong><small>jenis produk rajut</small></article>
				<article class="metric-card"><div class="metric-top"><span>Stok Tersedia</span><span class="metric-icon">↗</span></div><strong id="stok-available">0</strong><small>produk stok aman</small></article>
				<article class="metric-card metric-warning"><div class="metric-top"><span>Stok Menipis</span><span class="metric-icon">!</span></div><strong id="stok-low">0</strong><small>perlu restock segera</small></article>
				<article class="metric-card metric-warning"><div class="metric-top"><span>Stok Habis</span><span class="metric-icon">×</span></div><strong id="stok-empty">0</strong><small>produk perlu dibuat lagi</small></article>
			</section>
			<section class="panel inventory-panel">
				<div class="inventory-toolbar">
					<label class="management-search"><span>⌕</span><input id="stok-search" type="search" placeholder="<?php esc_attr_e( 'Cari produk atau SKU...', 'hooknchill' ); ?>"></label>
					<select id="stok-category" aria-label="<?php esc_attr_e( 'Filter kategori', 'hooknchill' ); ?>"><option value="all"><?php esc_html_e( 'Semua kategori', 'hooknchill' ); ?></option></select>
					<select id="stok-filter" aria-label="<?php esc_attr_e( 'Filter status', 'hooknchill' ); ?>"><option value="all"><?php esc_html_e( 'Semua status', 'hooknchill' ); ?></option><option value="available"><?php esc_html_e( 'Tersedia', 'hooknchill' ); ?></option><option value="low"><?php esc_html_e( 'Stok menipis', 'hooknchill' ); ?></option><option value="out"><?php esc_html_e( 'Habis', 'hooknchill' ); ?></option></select>
				</div>
				<p class="result-info" id="stok-result-info"></p><div class="table-wrap"><table class="management-table inventory-table"><thead><tr><th><?php esc_html_e( 'Produk', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Kategori', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Harga', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Stok', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Status', 'hooknchill' ); ?></th><th><span class="screen-reader-text"><?php esc_html_e( 'Aksi', 'hooknchill' ); ?></span></th></tr></thead><tbody id="stok-body"></tbody></table></div>
				<p class="local-data-note inventory-note"><?php esc_html_e( 'Perubahan stok hanya tersimpan di browser ini (localStorage).', 'hooknchill' ); ?></p>
			</section>
		</main>
	</div>
</div>
<dialog class="product-dialog" id="stok-dialog"><form id="stok-form" method="dialog"><div class="dialog-heading"><div><p class="view-kicker">PENGELOLAAN STOK</p><h2 id="stok-dialog-title">Tambah Stok</h2></div><button class="icon-button" value="cancel" aria-label="Tutup">×</button></div><input type="hidden" id="stok-product-id"><label>Produk<select id="stok-product-select" required></select></label><div class="dialog-fields"><label>Jenis Perubahan<select id="stok-type" required><option value="in">Stok Masuk (Tambah)</option><option value="out">Stok Keluar (Kurangi)</option><option value="set">Set Stok Manual</option></select></label><label>Jumlah<input id="stok-quantity" type="number" min="1" step="1" required></label></div><label>Catatan<input id="stok-note" type="text" maxlength="120" placeholder="Penjualan, retur, dsb."></label><div class="dialog-actions"><button class="button button-outline" value="cancel">Batal</button><button class="button button-primary" id="save-stok" value="default">Simpan</button></div></form></dialog>
<div class="toast-message" id="stok-toast" role="status" aria-live="polite"></div>
<?php
wp_enqueue_script( 'hooknchill-stok', get_theme_file_uri( '/assets/js/stok.js' ), array(), '1.0.0', true );
get_footer( 'management' );
