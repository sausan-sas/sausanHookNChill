<?php
/**
 * Template Name: Daftar Pesanan
 * Description: Halaman daftar pesanan custom kerajinan rajut beserta statusnya.
 */
hooknchill_require_shop_manager();
get_header( 'management' );
?>
<div class="management-app" id="pesanan-app">
	<aside class="management-sidebar">
		<a class="management-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="management-brand-mark">h.</span><span>hooknchill<small>WORKROOM</small></span></a>
		<div class="sidebar-label"><?php esc_html_e( 'TOKO', 'hooknchill' ); ?></div>
		<nav class="management-nav" aria-label="<?php esc_attr_e( 'Navigasi pengelolaan', 'hooknchill' ); ?>">
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/manajemen-usaha/' ) ); ?>"><span class="nav-icon">◫</span><?php esc_html_e( 'Ringkasan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/kasir/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Kasir', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/katalog/' ) ); ?>"><span class="nav-icon">▦</span><?php esc_html_e( 'Katalog', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/stok/' ) ); ?>"><span class="nav-icon">▧</span><?php esc_html_e( 'Stok', 'hooknchill' ); ?></a>
			<a class="management-nav-link is-active" href="<?php echo esc_url( home_url( '/pesanan/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Pesanan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/laporan/' ) ); ?>"><span class="nav-icon">▥</span><?php esc_html_e( 'Laporan', 'hooknchill' ); ?></a>
		</nav>
		<div class="sidebar-bottom"><div class="sidebar-status"><span></span><?php esc_html_e( 'Mode prototipe', 'hooknchill' ); ?></div><a class="management-nav-link" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="nav-icon">↗</span><?php esc_html_e( 'Lihat toko', 'hooknchill' ); ?></a></div>
	</aside>
	<div class="management-main">
		<header class="management-topbar"><div><p class="topbar-date"><?php echo esc_html( date_i18n( 'l, j F Y' ) ); ?></p><h1><?php esc_html_e( 'Daftar Pesanan Custom', 'hooknchill' ); ?></h1></div><div class="topbar-actions"><span class="prototype-badge"><span></span><?php esc_html_e( 'DATA CONTOH', 'hooknchill' ); ?></span><div class="topbar-user"><span class="user-avatar"><?php echo esc_html( strtoupper( substr( wp_get_current_user()->display_name, 0, 1 ) ) ); ?></span><span class="user-name"><?php echo esc_html( wp_get_current_user()->display_name ); ?></span></div><a class="logout-link" href="<?php echo esc_url( wp_logout_url( home_url( '/login-usaha/' ) ) ); ?>" aria-label="<?php esc_attr_e( 'Keluar', 'hooknchill' ); ?>">↗</a></div></header>
		<main id="main-content" class="management-content">
			<section class="metric-grid">
				<article class="metric-card"><div class="metric-top"><span>Pesanan Baru</span><span class="metric-icon">●</span></div><strong id="pesanan-new">0</strong><small>menunggu review</small></article>
				<article class="metric-card"><div class="metric-top"><span>Dalam Proses</span><span class="metric-icon">◐</span></div><strong id="pesanan-process">0</strong><small>sedang dirajut</small></article>
				<article class="metric-card"><div class="metric-top"><span>Selesai</span><span class="metric-icon">✓</span></div><strong id="pesanan-done">0</strong><small>pesanan terpenuhi</small></article>
				<article class="metric-card metric-warning"><div class="metric-top"><span>Total Pesanan</span><span class="metric-icon">▤</span></div><strong id="pesanan-total">0</strong><small>pesanan custom tercatat</small></article>
			</section>
			<section class="panel inventory-panel">
				<div class="inventory-toolbar">
					<label class="management-search"><span>⌕</span><input id="pesanan-search" type="search" placeholder="<?php esc_attr_e( 'Cari nama pelanggan atau produk...', 'hooknchill' ); ?>"></label>
					<select id="pesanan-status" aria-label="<?php esc_attr_e( 'Filter status pesanan', 'hooknchill' ); ?>">
						<option value="all"><?php esc_html_e( 'Semua Status', 'hooknchill' ); ?></option>
						<option value="new"><?php esc_html_e( 'Baru', 'hooknchill' ); ?></option>
						<option value="review"><?php esc_html_e( 'Review', 'hooknchill' ); ?></option>
						<option value="quoted"><?php esc_html_e( 'Sudah Kutip Harga', 'hooknchill' ); ?></option>
						<option value="process"><?php esc_html_e( 'Dalam Proses', 'hooknchill' ); ?></option>
						<option value="done"><?php esc_html_e( 'Selesai', 'hooknchill' ); ?></option>
						<option value="cancel"><?php esc_html_e( 'Dibatalkan', 'hooknchill' ); ?></option>
					</select>
				</div>
				<div class="table-wrap"><table class="management-table"><thead><tr><th><?php esc_html_e( 'No. Pesanan', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Pelanggan', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Produk', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Tanggal', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Status', 'hooknchill' ); ?></th><th><span class="screen-reader-text"><?php esc_html_e( 'Aksi', 'hooknchill' ); ?></span></th></tr></thead><tbody id="pesanan-body"></tbody></table></div>
				<p class="local-data-note inventory-note"><?php esc_html_e( 'Data pesanan contoh tersimpan di browser ini.', 'hooknchill' ); ?></p>
			</section>
		</main>
	</div>
</div>
<dialog class="product-dialog" id="pesanan-dialog"><form method="dialog"><div class="dialog-heading"><div><p class="view-kicker">DETAIL PESANAN</p><h2 id="pesanan-dialog-title">Pesanan</h2></div><button class="icon-button" value="cancel" aria-label="Tutup">×</button></div><div id="pesanan-detail-content" class="pesanan-detail-content"></div><div class="dialog-actions"><button class="button button-outline" value="cancel">Tutup</button><button class="button button-primary" id="update-status" type="button">Update Status</button></div></form></dialog>
<div class="toast-message" id="pesanan-toast" role="status" aria-live="polite"></div>
<?php
wp_enqueue_script( 'hooknchill-pesanan', get_theme_file_uri( '/assets/js/pesanan.js' ), array(), '1.0.0', true );
get_footer( 'management' );
