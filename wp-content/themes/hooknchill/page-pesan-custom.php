<?php
get_header();
$status          = sanitize_key( wp_unslash( $_GET['custom-order'] ?? '' ) );
$prefill_product = isset( $_GET['produk'] ) && is_string( $_GET['produk'] ) ? sanitize_text_field( wp_unslash( $_GET['produk'] ) ) : '';
$prefill_message = $prefill_product ? sprintf( __( 'Saya tertarik dengan %s.', 'hooknchill' ), $prefill_product ) : '';
?>
<main id="main-content" class="custom-order-page">
	<section class="custom-order-intro">
		<p class="eyebrow"><span class="eyebrow-line"></span><?php esc_html_e( 'Karya yang dimulai dari idemu', 'hooknchill' ); ?></p>
		<h1><?php esc_html_e( 'Ceritakan rajutan impianmu.', 'hooknchill' ); ?></h1>
		<p><?php esc_html_e( 'Isi detail yang sudah kamu tahu. Tim kami akan menghubungi lewat WhatsApp untuk membahas desain, harga, dan waktu pengerjaan.', 'hooknchill' ); ?></p>
	</section>
	<div class="custom-order-layout">
		<section class="custom-order-form-section" aria-labelledby="custom-form-title">
			<h2 id="custom-form-title"><?php esc_html_e( 'Detail pesanan', 'hooknchill' ); ?></h2>
			<?php if ( $prefill_product ) : ?><p class="form-notice form-notice-info" role="status"><?php echo esc_html( sprintf( __( 'Kamu membuka formulir dari %s. Lengkapi detail di bawah ini.', 'hooknchill' ), $prefill_product ) ); ?></p><?php endif; ?>
			<?php if ( 'sent' === $status ) : ?><p class="form-notice form-notice-success" role="status"><?php esc_html_e( 'Terima kasih! Detail pesananmu sudah dikirim. Tim kami akan menghubungi melalui WhatsApp.', 'hooknchill' ); ?></p><?php elseif ( 'invalid' === $status ) : ?><p class="form-notice form-notice-error" role="alert"><?php esc_html_e( 'Periksa kembali nama, nomor WhatsApp, jenis produk, jumlah, dan deskripsi ide.', 'hooknchill' ); ?></p><?php elseif ( 'upload-error' === $status ) : ?><p class="form-notice form-notice-error" role="alert"><?php esc_html_e( 'Gambar harus berupa JPG, PNG, atau WebP dan berukuran maksimal 5 MB.', 'hooknchill' ); ?></p><?php elseif ( 'mail-error' === $status ) : ?><p class="form-notice form-notice-error" role="alert"><?php esc_html_e( 'Pesanan belum dapat dikirim. Silakan coba lagi atau hubungi kami melalui kontak yang tersedia.', 'hooknchill' ); ?></p><?php endif; ?>
			<form class="custom-order-form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" enctype="multipart/form-data">
				<input type="hidden" name="action" value="hooknchill_custom_order">
				<?php wp_nonce_field( 'hooknchill_custom_order', 'hooknchill_nonce' ); ?>
				<div class="form-trap" aria-hidden="true"><label for="company-website">Website</label><input id="company-website" type="text" name="company_website" tabindex="-1" autocomplete="off"></div>
				<div class="form-grid">
					<div class="form-field"><label for="customer-name"><?php esc_html_e( 'Nama lengkap *', 'hooknchill' ); ?></label><input id="customer-name" name="customer_name" type="text" autocomplete="name" required maxlength="120"></div>
					<div class="form-field"><label for="customer-phone"><?php esc_html_e( 'Nomor WhatsApp *', 'hooknchill' ); ?></label><input id="customer-phone" name="customer_phone" type="tel" autocomplete="tel" placeholder="08xxxxxxxxxx" required maxlength="24"></div>
					<div class="form-field"><label for="product-type"><?php esc_html_e( 'Jenis produk *', 'hooknchill' ); ?></label><select id="product-type" name="product_type" required><option value=""><?php esc_html_e( 'Pilih jenis produk', 'hooknchill' ); ?></option><option><?php esc_html_e( 'Tas selempang rajut', 'hooknchill' ); ?></option><option><?php esc_html_e( 'Amigurumi', 'hooknchill' ); ?></option><option><?php esc_html_e( 'Dompet rajut', 'hooknchill' ); ?></option><option><?php esc_html_e( 'Tempat laptop rajut', 'hooknchill' ); ?></option><option><?php esc_html_e( 'Lainnya', 'hooknchill' ); ?></option></select></div>
					<div class="form-field"><label for="product-size"><?php esc_html_e( 'Ukuran', 'hooknchill' ); ?></label><input id="product-size" name="product_size" type="text" placeholder="<?php esc_attr_e( 'Contoh: 15 cm atau ukuran M', 'hooknchill' ); ?>" maxlength="80"></div>
					<div class="form-field"><label for="product-color"><?php esc_html_e( 'Warna pilihan', 'hooknchill' ); ?></label><input id="product-color" name="product_color" type="text" placeholder="<?php esc_attr_e( 'Contoh: sage dan krem', 'hooknchill' ); ?>" maxlength="120"></div>
					<div class="form-field"><label for="quantity"><?php esc_html_e( 'Jumlah *', 'hooknchill' ); ?></label><input id="quantity" name="quantity" type="number" min="1" max="100" value="1" required></div>
					<div class="form-field"><label for="needed-by"><?php esc_html_e( 'Tanggal dibutuhkan', 'hooknchill' ); ?></label><input id="needed-by" name="needed_by" type="date" min="<?php echo esc_attr( wp_date( 'Y-m-d' ) ); ?>"></div>
					<div class="form-field"><label for="budget"><?php esc_html_e( 'Anggaran (Rp)', 'hooknchill' ); ?></label><input id="budget" name="budget" type="number" min="0" step="5000" placeholder="<?php esc_attr_e( 'Contoh: 150000', 'hooknchill' ); ?>"></div>
					<div class="form-field form-field-wide"><label for="idea-description"><?php esc_html_e( 'Ceritakan ide dan detail yang diinginkan *', 'hooknchill' ); ?></label><textarea id="idea-description" name="idea_description" rows="5" maxlength="3000" required placeholder="<?php esc_attr_e( 'Model, fungsi, inisial, atau detail lain yang penting untukmu...', 'hooknchill' ); ?>"><?php echo esc_textarea( $prefill_message ); ?></textarea></div>
					<div class="form-field form-field-wide"><label for="reference-image"><?php esc_html_e( 'Gambar referensi (opsional)', 'hooknchill' ); ?></label><input id="reference-image" name="reference_image" type="file" accept="image/jpeg,image/png,image/webp"><span class="field-hint"><?php esc_html_e( 'JPG, PNG, atau WebP. Maksimal 5 MB.', 'hooknchill' ); ?></span></div>
				</div>
				<p class="privacy-note"><?php esc_html_e( 'Gambar referensi dikirim sebagai lampiran email kepada admin dan tidak disimpan sebagai gambar publik di galeri website.', 'hooknchill' ); ?></p>
				<button class="button button-primary" type="submit"><?php esc_html_e( 'Kirim ide pesanan', 'hooknchill' ); ?><span aria-hidden="true">↗</span></button>
			</form>
		</section>
		<aside class="custom-order-aside"><span class="aside-mark" aria-hidden="true">✳</span><p class="eyebrow"><?php esc_html_e( 'Setelah formulir terkirim', 'hooknchill' ); ?></p><h2><?php esc_html_e( 'Kita bicarakan bersama.', 'hooknchill' ); ?></h2><ol><li><?php esc_html_e( 'Admin meninjau detail dan referensimu.', 'hooknchill' ); ?></li><li><?php esc_html_e( 'Kita menyepakati desain, harga, dan estimasi waktu melalui WhatsApp.', 'hooknchill' ); ?></li><li><?php esc_html_e( 'Pesanan mulai dirajut setelah detail dan ketentuan pembayaran disetujui.', 'hooknchill' ); ?></li></ol><p class="aside-footnote"><?php esc_html_e( 'Pengiriman formulir belum otomatis mengonfirmasi pesanan atau pembayaran.', 'hooknchill' ); ?></p></aside>
	</div>
</main>
<?php get_footer(); ?>