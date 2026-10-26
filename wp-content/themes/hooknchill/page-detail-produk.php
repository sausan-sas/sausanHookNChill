<?php
/**
 * Template Name: Detail Produk
 * Description: Halaman detail produk kerajinan rajut dengan info lengkap.
 */
hooknchill_require_shop_manager();
get_header( 'management' );

$product_id = isset( $_GET['id'] ) ? sanitize_key( wp_unslash( $_GET['id'] ) ) : '';
?>
<div class="management-app" id="detail-app">
	<aside class="management-sidebar">
		<a class="management-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="management-brand-mark">h.</span><span>hooknchill<small>WORKROOM</small></span></a>
		<div class="sidebar-label"><?php esc_html_e( 'TOKO', 'hooknchill' ); ?></div>
		<nav class="management-nav" aria-label="<?php esc_attr_e( 'Navigasi pengelolaan', 'hooknchill' ); ?>">
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/manajemen-usaha/' ) ); ?>"><span class="nav-icon">◫</span><?php esc_html_e( 'Ringkasan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/kasir/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Kasir', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/katalog/' ) ); ?>"><span class="nav-icon">▦</span><?php esc_html_e( 'Katalog', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/stok/' ) ); ?>"><span class="nav-icon">▧</span><?php esc_html_e( 'Stok', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/pesanan/' ) ); ?>"><span class="nav-icon">▤</span><?php esc_html_e( 'Pesanan', 'hooknchill' ); ?></a>
			<a class="management-nav-link" href="<?php echo esc_url( home_url( '/laporan/' ) ); ?>"><span class="nav-icon">▥</span><?php esc_html_e( 'Laporan', 'hooknchill' ); ?></a>
		</nav>
		<div class="sidebar-bottom"><div class="sidebar-status"><span></span><?php esc_html_e( 'Mode prototipe', 'hooknchill' ); ?></div><a class="management-nav-link" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="nav-icon">↗</span><?php esc_html_e( 'Lihat toko', 'hooknchill' ); ?></a></div>
	</aside>
	<div class="management-main">
		<header class="management-topbar"><div><p class="topbar-date"><?php echo esc_html( date_i18n( 'l, j F Y' ) ); ?></p><h1><?php esc_html_e( 'Detail Produk', 'hooknchill' ); ?></h1></div><div class="topbar-actions"><a class="button button-outline" href="<?php echo esc_url( home_url( '/katalog/' ) ); ?>">&larr; <?php esc_html_e( 'Kembali ke Katalog', 'hooknchill' ); ?></a><div class="topbar-user"><span class="user-avatar"><?php echo esc_html( strtoupper( substr( wp_get_current_user()->display_name, 0, 1 ) ) ); ?></span><span class="user-name"><?php echo esc_html( wp_get_current_user()->display_name ); ?></span></div><a class="logout-link" href="<?php echo esc_url( wp_logout_url( home_url( '/login-usaha/' ) ) ); ?>" aria-label="<?php esc_attr_e( 'Keluar', 'hooknchill' ); ?>">↗</a></div></header>
		<main id="main-content" class="management-content">
			<section id="product-detail-container">
				<div class="empty-state"><span>⟳</span><p><?php esc_html_e( 'Memuat detail produk...', 'hooknchill' ); ?></p></div>
			</section>
		</main>
	</div>
</div>
<div class="toast-message" id="detail-toast" role="status" aria-live="polite"></div>
<?php
wp_enqueue_script( 'hooknchill-detail', get_theme_file_uri( '/assets/js/detail-produk.js' ), array(), '1.0.0', true );
wp_localize_script( 'hooknchill-detail', 'DetailProdukData', array( 'productId' => $product_id ) );
get_footer( 'management' );
