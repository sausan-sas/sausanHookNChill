<?php
/**
 * Template Name: Blog
 * Description: Halaman blog tips rajut dan inspirasi.
 */
get_header();
?>
<main id="main-content" class="content-shell">
	<section class="entry-content">
		<p class="eyebrow"><span class="eyebrow-line"></span><?php esc_html_e( 'Blog & Tips Rajut', 'hooknchill' ); ?></p>
		<h1><?php esc_html_e( 'Tips dan Inspirasi Rajut', 'hooknchill' ); ?></h1>
		<p><?php esc_html_e( 'Temukan tutorial dasar merajut, inspirasi padu padan, dan ide hadiah dari kami.', 'hooknchill' ); ?></p>
	</section>
	<section class="blog-posts">
		<article class="panel">
			<h3><?php esc_html_e( 'Cara Merawat Produk Rajut Agar Awet', 'hooknchill' ); ?></h3>
			<p><?php esc_html_e( 'Cuci tangan dengan air dingin dan sabun lembut. Jangan peras. Keringkan dengan cara dilipat di atas handuk.', 'hooknchill' ); ?></p>
		</article>
		<article class="panel">
			<h3><?php esc_html_e( 'Inspirasi Padu Padan Tas Rajut', 'hooknchill' ); ?></h3>
			<p><?php esc_html_e( 'Padukan tas rajut neutral dengan outfit colorful untuk kesan playful.', 'hooknchill' ); ?></p>
		</article>
		<article class="panel">
			<h3><?php esc_html_e( 'Ide Hadiah dari Produk Rajut', 'hooknchill' ); ?></h3>
			<p><?php esc_html_e( 'Amigurumi, dompet rajut, atau coaster set bisa jadi pilihan hadiah yang bermakna.', 'hooknchill' ); ?></p>
		</article>
	</section>
</main>
<?php get_footer(); ?>
