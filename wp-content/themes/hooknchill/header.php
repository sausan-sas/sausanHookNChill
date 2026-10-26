<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content"><?php esc_html_e( 'Lewati ke konten', 'hooknchill' ); ?></a>
<div class="announcement-bar"><?php esc_html_e( 'Dirajut satu per satu, dengan sabar dan sepenuh hati.', 'hooknchill' ); ?></div>
<header class="site-header">
	<div class="header-inner">
		<div class="brand">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Hooknchill, beranda"><span class="brand-mark" aria-hidden="true">h.</span><span class="brand-name">hooknchill</span></a>
			<?php endif; ?>
		</div>
		<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span class="menu-toggle-lines" aria-hidden="true"></span><span class="screen-reader-text"><?php esc_html_e( 'Buka navigasi', 'hooknchill' ); ?></span></button>
		<nav class="primary-navigation" id="primary-navigation" aria-label="<?php esc_attr_e( 'Navigasi utama', 'hooknchill' ); ?>">
			<?php
			wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'nav-list', 'fallback_cb' => false ) );
			if ( ! has_nav_menu( 'primary' ) ) :
				?>
				<ul class="nav-list">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Beranda', 'hooknchill' ); ?></a></li>
					<li><a href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/koleksi/' ) ); ?>"><?php esc_html_e( 'Koleksi', 'hooknchill' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/pesan-custom/' ) ); ?>"><?php esc_html_e( 'Pesan custom', 'hooknchill' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/cerita-kami/' ) ); ?>"><?php esc_html_e( 'Cerita kami', 'hooknchill' ); ?></a></li>
				</ul>
			<?php endif; ?>
		</nav>
		<div class="header-actions">
			<form class="header-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<label class="screen-reader-text" for="header-search-input"><?php esc_html_e( 'Cari produk', 'hooknchill' ); ?></label>
				<input id="header-search-input" type="search" name="s" placeholder="<?php esc_attr_e( 'Cari rajutan...', 'hooknchill' ); ?>">
				<?php if ( class_exists( 'WooCommerce' ) ) : ?><input type="hidden" name="post_type" value="product"><?php endif; ?>
			</form>
			<a class="cart-link" href="<?php echo esc_url( function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : home_url( '/keranjang/' ) ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Keranjang, %d barang', 'hooknchill' ), hooknchill_cart_count() ) ); ?>">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 1.9-1.4L21 8H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="19" r="1" fill="currentColor"/><circle cx="17.5" cy="19" r="1" fill="currentColor"/></svg>
				<span class="cart-count"><?php echo esc_html( hooknchill_cart_count() ); ?></span>
			</a>
		</div>
	</div>
</header>