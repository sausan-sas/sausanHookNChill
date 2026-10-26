<?php
/**
 * Template Name: Laporan Penjualan
 * Description: Halaman laporan penjualan kerajinan rajut.
 */
hooknchill_require_shop_manager();
get_header( 'management' );
?>
<div class="management-app" id="laporan-app">
	<aside class="management-sidebar">
		<a class="management-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="management-brand-mark">h.</span><span>hooknchill<small>WORKROOM</small></span></a>
		<div class="sidebar-label"><?php esc_html_e( 'TOKO', 'hooknchill' ); ?></div>
		<nav class="management-nav" aria-label="<?php esc_attr_e( 'Navigasi pengelolaan', 'hooknchill' ); ?>">
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/manajemen-usaha/' ) ); ?>"><span class="nav-icon">◫</span><?php esc_html_e( 'Ringkasan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/kasir/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Kasir', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/katalog/' ) ); ?>"><span class="nav-icon">▦</span><?php esc_html_e( 'Katalog', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/stok/' ) ); ?>"><span class="nav-icon">▧</span><?php esc_html_e( 'Stok', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/pesanan/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Pesanan', 'hooknchill' ); ?></a>
			<a class="management-nav-link is-active" href="<?php echo esc_url( home_url( '/laporan/' ) ); ?>"><span class="nav-icon">▥</span><?php esc_html_e( 'Laporan', 'hooknchill' ); ?></a>
		</nav>
		<div class="sidebar-bottom"><div class="sidebar-status"><span></span><?php esc_html_e( 'Mode prototipe', 'hooknchill' ); ?></div><a class="management-nav-link" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="nav-icon">↗</span><?php esc_html_e( 'Lihat toko', 'hooknchill' ); ?></a></div>
	</aside>
	<div class="management-main">
		<header class="management-topbar"><div><p class="topbar-date"><?php echo esc_html( date_i18n( 'l, j F Y' ) ); ?></p><h1><?php esc_html_e( 'Laporan Penjualan', 'hooknchill' ); ?></h1></div><div class="topbar-actions"><span class="prototype-badge"><span></span><?php esc_html_e( 'DATA CONTOH', 'hooknchill' ); ?></span><div class="topbar-user"><span class="user-avatar"><?php echo esc_html( strtoupper( substr( wp_get_current_user()->display_name, 0, 1 ) ) ); ?></span><span class="user-name"><?php echo esc_html( wp_get_current_user()->display_name ); ?></span></div><a class="logout-link" href="<?php echo esc_url( wp_logout_url( home_url( '/login-usaha/' ) ) ); ?>" aria-label="<?php esc_attr_e( 'Keluar', 'hooknchill' ); ?>">↗</a></div></header>
		<main id="main-content" class="management-content">
			<section class="view-intro report-intro"><div><p class="view-kicker"><?php esc_html_e( 'ANALISIS PENJUALAN', 'hooknchill' ); ?></p><h2><?php esc_html_e( 'Performa penjualan Hooknchill', 'hooknchill' ); ?></h2><p><?php esc_html_e( 'Ringkasan transaksi, produk terlaris, dan tren penjualan kerajinan rajut.', 'hooknchill' ); ?></p></div><div class="report-actions"><select id="laporan-range" aria-label="<?php esc_attr_e( 'Rentang laporan', 'hooknchill' ); ?>"><option value="7"><?php esc_html_e( '7 hari terakhir', 'hooknchill' ); ?></option><option value="30" selected><?php esc_html_e( '30 hari terakhir', 'hooknchill' ); ?></option><option value="90"><?php esc_html_e( '90 hari terakhir', 'hooknchill' ); ?></option></select><button class="button button-outline" id="export-csv" type="button"><span aria-hidden="true">↓</span> <?php esc_html_e( 'Ekspor CSV', 'hooknchill' ); ?></button></div></section>
			<section class="metric-grid report-metrics">
				<article class="metric-card"><div class="metric-top"><span><?php esc_html_e( 'Total Penjualan', 'hooknchill' ); ?></span><span class="metric-icon">↗</span></div><strong id="laporan-sales">Rp0</strong><small id="laporan-period"></small></article>
				<article class="metric-card"><div class="metric-top"><span><?php esc_html_e( 'Jumlah Transaksi', 'hooknchill' ); ?></span><span class="metric-icon">▤</span></div><strong id="laporan-orders">0</strong><small><?php esc_html_e( 'transaksi pada periode ini', 'hooknchill' ); ?></small></article>
				<article class="metric-card"><div class="metric-top"><span><?php esc_html_e( 'Produk Terjual', 'hooknchill' ); ?></span><span class="metric-icon">◉</span></div><strong id="laporan-items">0</strong><small><?php esc_html_e( 'item rajut terjual', 'hooknchill' ); ?></small></article>
				<article class="metric-card"><div class="metric-top"><span><?php esc_html_e( 'Rata-rata Transaksi', 'hooknchill' ); ?></span><span class="metric-icon">◉</span></div><strong id="laporan-average">Rp0</strong><small><?php esc_html_e( 'nilai rata-rata pesanan', 'hooknchill' ); ?></small></article>
			</section>
			<section class="report-grid">
				<section class="panel report-chart-panel"><div class="panel-heading"><div><p class="view-kicker"><?php esc_html_e( 'TREN PENJUALAN', 'hooknchill' ); ?></p><h3><?php esc_html_e( 'Penjualan per Hari', 'hooknchill' ); ?></h3></div><span class="chart-legend"><i></i><?php esc_html_e( 'Penjualan', 'hooknchill' ); ?></span></div><div class="report-chart" id="laporan-chart"></div></section>
				<section class="panel top-products-panel"><div class="panel-heading"><div><p class="view-kicker"><?php esc_html_e( 'PRODUK TERLARIS', 'hooknchill' ); ?></p><h3><?php esc_html_e( 'Rajutan Favorit', 'hooknchill' ); ?></h3></div></div><div id="laporan-top-products" class="top-products-list"></div></section>
			</section>
			<section class="panel report-table-panel"><div class="panel-heading"><div><p class="view-kicker"><?php esc_html_e( 'RIWAYAT TRANSAKSI', 'hooknchill' ); ?></p><h3><?php esc_html_e( 'Rincian Penjualan', 'hooknchill' ); ?></h3></div></div><div class="table-wrap"><table class="management-table"><thead><tr><th><?php esc_html_e( 'No. Transaksi', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Tanggal', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Item', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Metode', 'hooknchill' ); ?></th><th><?php esc_html_e( 'Total', 'hooknchill' ); ?></th></tr></thead><tbody id="laporan-sales-body"></tbody></table></div><p class="local-data-note"><?php esc_html_e( 'Menampilkan transaksi yang benar-benar tercatat di browser ini.', 'hooknchill' ); ?></p></section>
		</main>
	</div>
</div>
<div class="toast-message" id="laporan-toast" role="status" aria-live="polite"></div>
<?php
wp_enqueue_script( 'hooknchill-laporan', get_theme_file_uri( '/assets/js/laporan.js' ), array(), '1.0.0', true );
get_footer( 'management' );
