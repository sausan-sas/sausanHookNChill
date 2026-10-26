<?php
/**
 * Keranjang page.
 *
 * Renders the WooCommerce cart content when WooCommerce is active. Without
 * WooCommerce the page shows a friendly empty-cart state instead of a 404.
 */
get_header();
?>
<main id="main-content" class="content-shell">
	<?php if ( function_exists( 'is_cart' ) && is_cart() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<article <?php post_class( 'content-entry' ); ?>>
				<h1><?php the_title(); ?></h1>
				<div class="entry-content"><?php the_content(); ?></div>
			</article>
		<?php endwhile; ?>
	<?php else : ?>
		<section class="entry-content">
			<p class="eyebrow"><span class="eyebrow-line"></span><?php esc_html_e( 'Keranjang', 'hooknchill' ); ?></p>
			<h1><?php esc_html_e( 'Keranjangmu masih kosong.', 'hooknchill' ); ?></h1>
			<p><?php esc_html_e( 'Pemesanan langsung melalui keranjang belum aktif. Sementara itu, kamu bisa menjelajahi koleksi atau mengirim ide pesanan custom.', 'hooknchill' ); ?></p>
		</section>
		<div class="empty-products catalog-empty">
			<span class="empty-mark" aria-hidden="true">✳</span>
			<p><?php esc_html_e( 'Belum ada karya di keranjang.', 'hooknchill' ); ?></p>
			<a class="text-link" href="<?php echo esc_url( home_url( '/koleksi/' ) ); ?>"><?php esc_html_e( 'Lihat semua koleksi', 'hooknchill' ); ?><span aria-hidden="true">→</span></a>
		</div>
		<section class="custom-cta catalog-cta">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'Punya ide sendiri?', 'hooknchill' ); ?></p>
				<h2><?php esc_html_e( 'Kita rajut versimu sendiri.', 'hooknchill' ); ?></h2>
			</div>
			<a class="button button-primary" href="<?php echo esc_url( home_url( '/pesan-custom/' ) ); ?>"><?php esc_html_e( 'Mulai pesanan custom', 'hooknchill' ); ?><span aria-hidden="true">→</span></a>
		</section>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
