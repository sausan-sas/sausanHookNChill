<footer class="site-footer">
	<div class="footer-main">
		<div class="footer-brand-block"><a class="footer-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">hooknchill<span>.</span></a><p><?php esc_html_e( 'Rajut santai, karya penuh cerita. Temukan teman baru untuk hari-harimu.', 'hooknchill' ); ?></p></div>
		<div class="footer-links"><h2><?php esc_html_e( 'Jelajahi', 'hooknchill' ); ?></h2><a href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/koleksi/' ) ); ?>"><?php esc_html_e( 'Semua koleksi', 'hooknchill' ); ?></a><a href="<?php echo esc_url( home_url( '/pesan-custom/' ) ); ?>"><?php esc_html_e( 'Pesan custom', 'hooknchill' ); ?></a><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>"><?php esc_html_e( 'FAQ & perawatan', 'hooknchill' ); ?></a></div>
		<div class="footer-links"><h2><?php esc_html_e( 'Temukan kami', 'hooknchill' ); ?></h2><a href="<?php echo esc_url( home_url( '/kontak/' ) ); ?>"><?php esc_html_e( 'Kontak', 'hooknchill' ); ?></a><?php if ( get_theme_mod( 'hooknchill_whatsapp_url' ) ) : ?><a href="<?php echo esc_url( get_theme_mod( 'hooknchill_whatsapp_url' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'WhatsApp', 'hooknchill' ); ?></a><?php endif; ?></div>
		<div class="footer-note"><span class="footer-stitch" aria-hidden="true">✳</span><p><?php esc_html_e( 'Dibuat perlahan, untuk menemani lebih lama.', 'hooknchill' ); ?></p></div>
	</div>
	<div class="footer-bottom"><span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Hooknchill</span><span><?php esc_html_e( 'Handmade in Indonesia', 'hooknchill' ); ?></span></div>
</footer>
<?php wp_footer(); ?>
</body>
</html>