<?php
/** Theme setup and assets. */

function hooknchill_setup() {
	load_theme_textdomain( 'hooknchill', get_template_directory() . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array( 'height' => 80, 'width' => 220, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'woocommerce' );
	register_nav_menus( array( 'primary' => __( 'Navigasi utama', 'hooknchill' ), 'footer' => __( 'Navigasi footer', 'hooknchill' ) ) );
}
add_action( 'after_setup_theme', 'hooknchill_setup' );

function hooknchill_is_management_page() {
	return is_page( array( 'manajemen-usaha', 'login-usaha', 'katalog', 'detail-produk', 'stok', 'pesanan', 'kasir', 'laporan' ) );
}

function hooknchill_enqueue_assets() {
	wp_enqueue_style( 'hooknchill-fonts', 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap', array(), null );
	wp_enqueue_style( 'hooknchill-main', get_theme_file_uri( '/assets/css/main.css' ), array( 'hooknchill-fonts' ), '1.0.0' );
	wp_enqueue_script( 'hooknchill-navigation', get_theme_file_uri( '/assets/js/navigation.js' ), array(), '1.0.0', true );
	if ( is_page( 'pesan-custom' ) ) {
		wp_enqueue_style( 'hooknchill-custom-order', get_theme_file_uri( '/assets/css/custom-order.css' ), array( 'hooknchill-main' ), '1.0.0' );
	}
	if ( hooknchill_is_management_page() ) {
		wp_enqueue_style( 'hooknchill-management', get_theme_file_uri( '/assets/css/management.css' ), array( 'hooknchill-main' ), '1.0.0' );
		if ( is_page( 'manajemen-usaha' ) ) {
			wp_enqueue_script( 'hooknchill-management', get_theme_file_uri( '/assets/js/management.js' ), array(), '1.0.0', true );
			wp_localize_script(
				'hooknchill-management',
				'HooknchillManagement',
				array( 'userName' => wp_get_current_user()->display_name )
			);
		}
		if ( is_page( 'katalog' ) ) {
			wp_enqueue_script( 'hooknchill-data-produk', get_theme_file_uri( '/assets/js/data-produk.js' ), array(), '1.0.1', true );
			wp_enqueue_script( 'hooknchill-katalog', get_theme_file_uri( '/assets/js/katalog.js' ), array( 'hooknchill-data-produk' ), '1.0.1', true );
		}
		if ( is_page( 'detail-produk' ) ) {
			wp_enqueue_script( 'hooknchill-data-produk', get_theme_file_uri( '/assets/js/data-produk.js' ), array(), '1.0.0', true );
			wp_enqueue_script( 'hooknchill-detail', get_theme_file_uri( '/assets/js/detail-produk.js' ), array( 'hooknchill-data-produk' ), '1.0.0', true );
		}
		if ( is_page( 'stok' ) ) {
			wp_enqueue_script( 'hooknchill-data-produk', get_theme_file_uri( '/assets/js/data-produk.js' ), array(), '1.0.0', true );
			wp_enqueue_script( 'hooknchill-stok', get_theme_file_uri( '/assets/js/stok.js' ), array( 'hooknchill-data-produk' ), '1.0.0', true );
		}
		if ( is_page( 'pesanan' ) ) {
			wp_enqueue_script( 'hooknchill-pesanan', get_theme_file_uri( '/assets/js/pesanan.js' ), array(), '1.0.0', true );
		}
		if ( is_page( 'kasir' ) ) {
			wp_enqueue_script( 'hooknchill-data-produk', get_theme_file_uri( '/assets/js/data-produk.js' ), array(), '1.0.0', true );
			wp_enqueue_script( 'hooknchill-kasir', get_theme_file_uri( '/assets/js/kasir.js' ), array( 'hooknchill-data-produk' ), '1.0.0', true );
		}
		if ( is_page( 'laporan' ) ) {
			wp_enqueue_script( 'hooknchill-laporan', get_theme_file_uri( '/assets/js/laporan.js' ), array(), '1.0.0', true );
		}
	}
	if ( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() ) ) {
		wp_enqueue_style( 'hooknchill-woocommerce', get_theme_file_uri( '/assets/css/woocommerce.css' ), array( 'hooknchill-main' ), '1.0.0' );
	}
}
add_action( 'wp_enqueue_scripts', 'hooknchill_enqueue_assets' );

function hooknchill_maybe_load_plugin() {
	if ( function_exists( 'HC_Operations_Schema' ) ) {
		return;
	}
	$plugin_file = WP_PLUGIN_DIR . '/hooknchill-operations/hooknchill-operations.php';
	if ( file_exists( $plugin_file ) ) {
		require_once $plugin_file;
	}
}
add_action( 'plugins_loaded', 'hooknchill_maybe_load_plugin' );

function hooknchill_cart_count() {
	if ( ! function_exists( 'WC' ) || ! WC()->cart ) {
		return 0;
	}
	return WC()->cart->get_cart_contents_count();
}

function hooknchill_post_text( $key, $multiline = false ) {
	if ( ! isset( $_POST[ $key ] ) || ! is_string( $_POST[ $key ] ) ) {
		return '';
	}

	$value = wp_unslash( $_POST[ $key ] );
	return $multiline ? sanitize_textarea_field( $value ) : sanitize_text_field( $value );
}

function hooknchill_handle_custom_order() {
	check_admin_referer( 'hooknchill_custom_order', 'hooknchill_nonce' );

	$name        = hooknchill_post_text( 'customer_name' );
	$phone       = preg_replace( '/[^0-9+]/', '', hooknchill_post_text( 'customer_phone' ) );
	$product     = hooknchill_post_text( 'product_type' );
	$size        = hooknchill_post_text( 'product_size' );
	$color       = hooknchill_post_text( 'product_color' );
	$quantity    = isset( $_POST['quantity'] ) && is_scalar( $_POST['quantity'] ) ? absint( wp_unslash( $_POST['quantity'] ) ) : 0;
	$description = hooknchill_post_text( 'idea_description', true );
	$needed_by   = hooknchill_post_text( 'needed_by' );
	$budget      = isset( $_POST['budget'] ) && is_scalar( $_POST['budget'] ) ? absint( wp_unslash( $_POST['budget'] ) ) : 0;
	$honeypot    = hooknchill_post_text( 'company_website' );
	$redirect    = wp_get_referer() ? wp_get_referer() : home_url( '/pesan-custom/' );

	if ( $honeypot ) {
		wp_safe_redirect( add_query_arg( 'custom-order', 'sent', $redirect ) );
		exit;
	}

	$phone_digits = preg_replace( '/\D/', '', $phone );
	$date_parts = array();
	if ( $needed_by && ( ! preg_match( '/^(\d{4})-(\d{2})-(\d{2})$/', $needed_by, $date_parts ) || ! wp_checkdate( (int) $date_parts[2], (int) $date_parts[3], (int) $date_parts[1], $needed_by ) ) ) {
		wp_safe_redirect( add_query_arg( 'custom-order', 'invalid', $redirect ) );
		exit;
	}

	if ( ! $name || strlen( $phone_digits ) < 8 || strlen( $phone_digits ) > 16 || ! $product || ! $description || $quantity < 1 || $quantity > 100 ) {
		wp_safe_redirect( add_query_arg( 'custom-order', 'invalid', $redirect ) );
		exit;
	}

	$attachment = '';
	$file = $_FILES['reference_image'] ?? array();
	if ( ! is_array( $file ) ) {
		wp_safe_redirect( add_query_arg( 'custom-order', 'upload-error', $redirect ) );
		exit;
	}
	if ( ! empty( $file['name'] ) ) {
		if ( ! is_string( $file['name'] ) || ! isset( $file['error'], $file['size'], $file['tmp_name'] ) || ! is_scalar( $file['error'] ) || ! is_scalar( $file['size'] ) || UPLOAD_ERR_OK !== (int) $file['error'] || 0 > (int) $file['size'] || (int) $file['size'] > 5 * MB_IN_BYTES || ! is_string( $file['tmp_name'] ) ) {
			wp_safe_redirect( add_query_arg( 'custom-order', 'upload-error', $redirect ) );
			exit;
		}

		$allowed_mimes = array( 'jpg|jpeg|jpe' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp' );
		$file_type     = wp_check_filetype_and_ext( $file['tmp_name'], $file['name'], $allowed_mimes );
		if ( empty( $file_type['type'] ) || ! in_array( $file_type['type'], $allowed_mimes, true ) ) {
			wp_safe_redirect( add_query_arg( 'custom-order', 'upload-error', $redirect ) );
			exit;
		}

		require_once ABSPATH . 'wp-admin/includes/file.php';
		$upload = wp_handle_upload( $file, array( 'test_form' => false, 'mimes' => $allowed_mimes ) );
		if ( ! empty( $upload['error'] ) || empty( $upload['file'] ) ) {
			wp_safe_redirect( add_query_arg( 'custom-order', 'upload-error', $redirect ) );
			exit;
		}
		$attachment = $upload['file'];
	}

	$subject = sprintf( '[Hooknchill] Pesanan custom dari %s', $name );
	$message = implode(
		"\n",
		array(
			'Pesanan custom baru',
			'',
			'Nama: ' . $name,
			'WhatsApp: ' . $phone,
			'Jenis produk: ' . $product,
			'Ukuran: ' . ( $size ? $size : '-' ),
			'Warna: ' . ( $color ? $color : '-' ),
			'Jumlah: ' . $quantity,
			'Tanggal dibutuhkan: ' . ( $needed_by ? $needed_by : '-' ),
			'Anggaran: ' . ( $budget ? 'Rp ' . number_format_i18n( $budget ) : '-' ),
			'',
			'Ide pelanggan:',
			$description,
			$attachment ? '' : 'Gambar referensi: tidak dilampirkan',
		)
	);

	$sent = wp_mail( get_option( 'admin_email' ), $subject, $message, array( 'Content-Type: text/plain; charset=UTF-8' ), $attachment ? array( $attachment ) : array() );
	if ( $attachment ) {
		wp_delete_file( $attachment );
	}

	wp_safe_redirect( add_query_arg( 'custom-order', $sent ? 'sent' : 'mail-error', $redirect ) );
	exit;
}
add_action( 'admin_post_nopriv_hooknchill_custom_order', 'hooknchill_handle_custom_order' );
add_action( 'admin_post_hooknchill_custom_order', 'hooknchill_handle_custom_order' );

function hooknchill_require_shop_manager() {
	if ( ! is_user_logged_in() ) {
		wp_safe_redirect( home_url( '/login-usaha/?redirect_to=' . rawurlencode( home_url( '/manajemen-usaha/' ) ) ) );
		exit;
	}

	if ( ! current_user_can( 'manage_woocommerce' ) && ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Akun ini tidak memiliki akses ke pengelolaan toko.', 'hooknchill' ), esc_html__( 'Akses ditolak', 'hooknchill' ), array( 'response' => 403 ) );
	}
}