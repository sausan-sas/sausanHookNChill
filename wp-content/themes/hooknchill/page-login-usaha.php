<?php
if ( is_user_logged_in() && ( current_user_can( 'manage_woocommerce' ) || current_user_can( 'manage_options' ) ) ) {
	wp_safe_redirect( home_url( '/manajemen-usaha/' ) );
	exit;
}
get_header( 'management' );
$redirect_to = isset( $_GET['redirect_to'] ) && is_string( $_GET['redirect_to'] ) ? esc_url_raw( wp_unslash( $_GET['redirect_to'] ) ) : home_url( '/manajemen-usaha/' );
?>
<main id="main-content" class="login-page">
	<a class="login-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="management-brand-mark">h.</span><span>hooknchill<small>WORKROOM</small></span></a>
	<section class="login-panel"><div class="login-art"><span class="login-art-knot" aria-hidden="true">✳</span><p><?php esc_html_e( 'Merawat setiap karya, dari benang sampai pesanan.', 'hooknchill' ); ?></p><div class="login-art-line" aria-hidden="true"></div></div><div class="login-form-wrap"><p class="view-kicker"><?php esc_html_e( 'AREA PENGELOLA TOKO', 'hooknchill' ); ?></p><h1><?php esc_html_e( 'Selamat datang kembali.', 'hooknchill' ); ?></h1><p><?php esc_html_e( 'Masuk untuk melihat kegiatan usaha Hooknchill.', 'hooknchill' ); ?></p><?php wp_login_form( array( 'echo' => true, 'redirect' => $redirect_to, 'form_id' => 'hooknchill-login-form', 'label_username' => __( 'Email atau nama pengguna', 'hooknchill' ), 'label_password' => __( 'Kata sandi', 'hooknchill' ), 'label_remember' => __( 'Ingat saya', 'hooknchill' ), 'label_log_in' => __( 'Masuk ke dashboard', 'hooknchill' ), 'remember' => true ) ); ?><a class="back-to-store" href="<?php echo esc_url( home_url( '/' ) ); ?>">← <?php esc_html_e( 'Kembali ke toko', 'hooknchill' ); ?></a></div></section>
	<p class="login-caption"><?php esc_html_e( 'HOOKNCHILL · RAJUT SANTAI, KARYA PENUH CERITA', 'hooknchill' ); ?></p>
</main>
<?php get_footer( 'management' ); ?>