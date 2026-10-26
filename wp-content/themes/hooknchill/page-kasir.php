<?php
/**
 * Template Name: Kasir / POS
 * Description: Halaman kasir untuk transaksi penjualan kerajinan rajut.
 */
hooknchill_require_shop_manager();
get_header( 'management' );
?>
<div class="management-app" id="kasir-app">
	<aside class="management-sidebar">
		<a class="management-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="management-brand-mark">h.</span><span>hooknchill<small>WORKROOM</small></span></a>
		<div class="sidebar-label"><?php esc_html_e( 'TOKO', 'hooknchill' ); ?></div>
		<nav class="management-nav" aria-label="<?php esc_attr_e( 'Navigasi pengelolaan', 'hooknchill' ); ?>">
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/manajemen-usaha/' ) ); ?>"><span class="nav-icon">◫</span><?php esc_html_e( 'Ringkasan', 'hooknchill' ); ?></a>
			<a class="management-nav-link is-active" href="<?php echo esc_url( home_url( '/kasir/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Kasir', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/katalog/' ) ); ?>"><span class="nav-icon">▦</span><?php esc_html_e( 'Katalog', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/stok/' ) ); ?>"><span class="nav-icon">▧</span><?php esc_html_e( 'Stok', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/pesanan/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Pesanan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/laporan/' ) ); ?>"><span class="nav-icon">▥</span><?php esc_html_e( 'Laporan', 'hooknchill' ); ?></a>
		</nav>
		<div class="sidebar-bottom"><div class="sidebar-status"><span></span><?php esc_html_e( 'Mode prototipe', 'hooknchill' ); ?></div><a class="management-nav-link" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="nav-icon">↗</span><?php esc_html_e( 'Lihat toko', 'hooknchill' ); ?></a></div>
	</aside>
	<div class="management-main">
		<header class="management-topbar"><div><p class="topbar-date" id="kasir-date"><?php echo esc_html( date_i18n( 'l, j F Y' ) ); ?></p><h1><?php esc_html_e( 'Kasir / Point of Sale', 'hooknchill' ); ?></h1></div><div class="topbar-actions"><span class="prototype-badge"><span></span><?php esc_html_e( 'DATA CONTOH', 'hooknchill' ); ?></span><div class="topbar-user"><span class="user-avatar"><?php echo esc_html( strtoupper( substr( wp_get_current_user()->display_name, 0, 1 ) ) ); ?></span><span class="user-name"><?php echo esc_html( wp_get_current_user()->display_name ); ?></span></div><a class="logout-link" href="<?php echo esc_url( wp_logout_url( home_url( '/login-usaha/' ) ) ); ?>" aria-label="<?php esc_attr_e( 'Keluar', 'hooknchill' ); ?>">↗</a></div></header>
		<main id="main-content" class="management-content">
			<section class="pos-layout">
				<section class="pos-products">
					<label class="management-search"><span>⌕</span><input id="kasir-search" type="search" placeholder="<?php esc_attr_e( 'Cari produk rajut atau SKU...', 'hooknchill' ); ?>"></label>
					<div class="filter-chips" id="kasir-categories"></div>
					<div class="pos-product-grid" id="kasir-product-grid"></div>
				</section>
				<aside class="pos-cart panel">
					<div class="cart-heading"><div><p class="view-kicker"><?php esc_html_e( 'TRANSAKSI BARU', 'hooknchill' ); ?></p><h3><?php esc_html_e( 'Keranjang', 'hooknchill' ); ?></h3></div><button class="subtle-button" id="clear-cart" type="button"><?php esc_html_e( 'Kosongkan', 'hooknchill' ); ?></button></div>
					<div class="pos-cart-items" id="kasir-cart-items"></div>
					<div class="pos-cart-footer">
						<div class="cart-subtotal"><span><?php esc_html_e( 'Subtotal', 'hooknchill' ); ?></span><strong id="kasir-subtotal">Rp0</strong></div>
						<label class="payment-label" for="kasir-payment"><?php esc_html_e( 'Metode Pembayaran', 'hooknchill' ); ?></label>
						<select id="kasir-payment"><option value="Tunai"><?php esc_html_e( 'Tunai', 'hooknchill' ); ?></option><option value="Transfer / QRIS"><?php esc_html_e( 'Transfer / QRIS', 'hooknchill' ); ?></option><option value="DANA"><?php esc_html_e( 'DANA', 'hooknchill' ); ?></option><option value="GoPay"><?php esc_html_e( 'GoPay', 'hooknchill' ); ?></option><option value="OVO"><?php esc_html_e( 'OVO', 'hooknchill' ); ?></option></select>
						<button class="button button-primary checkout-button" id="complete-sale" type="button" disabled><?php esc_html_e( 'Catat Transaksi', 'hooknchill' ); ?><span id="kasir-total">Rp0</span></button>
						<p class="local-data-note"><?php esc_html_e( 'Transaksi demo tersimpan di browser ini, belum masuk ke database.', 'hooknchill' ); ?></p>
					</div>
				</aside>
			</section>
		</main>
	</div>
</div>
<div class="toast-message" id="kasir-toast" role="status" aria-live="polite"></div>
<?php
wp_enqueue_script( 'hooknchill-kasir', get_theme_file_uri( '/assets/js/kasir.js' ), array(), '1.0.0', true );
get_footer( 'management' );
