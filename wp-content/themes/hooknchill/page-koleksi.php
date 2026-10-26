<?php
/**
 * Template Name: Koleksi Publik
 * Description: Katalog publik kerajinan rajut Hooknchill dengan pencarian dan filter kategori.
 */
get_header();

$theme_images_url = get_theme_file_uri( '/images' );

$catalog_products = array(
    array(
        'name' => 'Tas Selempang Rajut',
        'category' => 'Tas Rajut',
        'price' => 145000,
        'stock' => 5,
        'color' => 'sage',
        'symbol' => '',
        'description' => 'Tas selempang rajut.',
        'image' => $theme_images_url . '/hooknchill tas selempang.jpeg',
    ),
    array(
        'name' => 'Amigurumi Rajut',
        'category' => 'Amigurumi',
        'price' => 125000,
        'stock' => 6,
        'color' => 'sage',
        'symbol' => '',
        'description' => 'Boneka rajut amigurumi.',
        'image' => $theme_images_url . '/hooknchill amigurumi.jpeg',
    ),
    array(
        'name' => 'Dompet Rajut',
        'category' => 'Dompet Rajut',
        'price' => 65000,
        'stock' => 8,
        'color' => 'rose',
        'symbol' => '',
        'description' => 'Dompet berbahan rajut.',
        'image' => $theme_images_url . '/hooknchill dompet.jpeg',
    ),
    array(
        'name' => 'Tempat Laptop Rajut',
        'category' => 'Tempat Laptop',
        'price' => 210000,
        'stock' => 3,
        'color' => 'terracotta',
        'symbol' => '',
        'description' => 'Tempat laptop berbahan rajut.',
        'image' => $theme_images_url . '/hooknchill tas laptop.jpeg',
    ),
);

$catalog_categories = array( 'Tas Rajut', 'Amigurumi', 'Dompet Rajut', 'Aksesori Rajut', 'Tempat Laptop' );
$selected_category  = sanitize_text_field( wp_unslash( $_GET['kategori'] ?? '' ) );
$search_query       = sanitize_text_field( wp_unslash( $_GET['cari'] ?? '' ) );

$filtered_products = array_filter(
	$catalog_products,
	static function ( $product ) use ( $selected_category, $search_query ) {
		$matches_category = '' === $selected_category || $product['category'] === $selected_category;
		$matches_search   = '' === $search_query || false !== stripos( $product['name'] . ' ' . $product['category'] . ' ' . $product['description'], $search_query );
		return $matches_category && $matches_search;
	}
);
?>
<main id="main-content" class="catalog-page section-shell">
	<header class="catalog-header">
		<p class="eyebrow"><span class="eyebrow-line"></span><?php esc_html_e( 'Koleksi Hooknchill', 'hooknchill' ); ?></p>
		<h1><?php esc_html_e( 'Rajutan kecil, cerita yang panjang.', 'hooknchill' ); ?></h1>
		<p><?php esc_html_e( 'Tas, amigurumi, dompet, dan tempat laptop yang dirajut satu per satu. Pilih yang sudah siap, atau mulai dari idemu sendiri.', 'hooknchill' ); ?></p>
	</header>

	<form class="catalog-toolbar" method="get" action="<?php echo esc_url( home_url( '/koleksi/' ) ); ?>">
		<label class="screen-reader-text" for="catalog-search"><?php esc_html_e( 'Cari produk', 'hooknchill' ); ?></label>
		<input id="catalog-search" name="cari" type="search" value="<?php echo esc_attr( $search_query ); ?>" placeholder="<?php esc_attr_e( 'Cari tas, amigurumi, dompet...', 'hooknchill' ); ?>">
		<label class="screen-reader-text" for="catalog-category"><?php esc_html_e( 'Filter kategori', 'hooknchill' ); ?></label>
		<select id="catalog-category" name="kategori">
			<option value=""><?php esc_html_e( 'Semua kategori', 'hooknchill' ); ?></option>
			<?php foreach ( $catalog_categories as $category ) : ?>
				<option value="<?php echo esc_attr( $category ); ?>" <?php selected( $selected_category, $category ); ?>><?php echo esc_html( $category ); ?></option>
			<?php endforeach; ?>
		</select>
		<button class="button button-primary" type="submit"><?php esc_html_e( 'Cari koleksi', 'hooknchill' ); ?><span aria-hidden="true">↗</span></button>
	</form>

	<p class="catalog-result">
		<?php
		printf(
			/* translators: %d: number of products */
			esc_html( _n( '%d karya ditemukan', '%d karya ditemukan', count( $filtered_products ), 'hooknchill' ) ),
			count( $filtered_products )
		);
		?>
	</p>

	<?php if ( ! empty( $filtered_products ) ) : ?>
		<div class="product-grid catalog-grid">
			<?php foreach ( $filtered_products as $product ) : ?>
				<?php
				$order_url = add_query_arg(
					array(
						'produk' => rawurlencode( $product['name'] ),
					),
					home_url( '/pesan-custom/' )
				);
				?>
				<article class="product-card catalog-card">
					<a class="product-image catalog-art catalog-art--<?php echo esc_attr( $product['color'] ); ?>" href="<?php echo esc_url( $order_url ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Pesan %s', 'hooknchill' ), $product['name'] ) ); ?>">
						<?php if ( ! empty( $product['image'] ) ) : ?>
							<img src="<?php echo esc_url( $product['image'] ); ?>" alt="<?php echo esc_attr( $product['name'] ); ?>" loading="lazy">
						<?php else : ?>
							<span class="catalog-symbol" aria-hidden="true"><?php echo esc_html( $product['symbol'] ); ?></span>
						<?php endif; ?>
						<span class="product-badge <?php echo 0 === $product['stock'] ? 'is-preorder' : ''; ?>"><?php echo 0 === $product['stock'] ? esc_html__( 'Pre-order', 'hooknchill' ) : esc_html__( 'Ready', 'hooknchill' ); ?></span>
					</a>
					<div class="product-meta">
						<a class="product-title" href="<?php echo esc_url( $order_url ); ?>"><?php echo esc_html( $product['name'] ); ?></a>
						<span class="product-price"><?php echo esc_html( 'Rp' . number_format_i18n( $product['price'] ) ); ?></span>
					</div>
					<p class="catalog-desc"><?php echo esc_html( $product['description'] ); ?></p>
					<a class="product-view" href="<?php echo esc_url( $order_url ); ?>"><?php esc_html_e( 'Tanyakan atau pesan custom', 'hooknchill' ); ?><span aria-hidden="true">↗</span></a>
				</article>
			<?php endforeach; ?>
		</div>
	<?php else : ?>
		<div class="empty-products catalog-empty">
			<p><?php esc_html_e( 'Belum ada karya yang cocok dengan pencarianmu.', 'hooknchill' ); ?></p>
			<a class="text-link" href="<?php echo esc_url( home_url( '/koleksi/' ) ); ?>"><?php esc_html_e( 'Lihat semua koleksi', 'hooknchill' ); ?><span aria-hidden="true">→</span></a>
		</div>
	<?php endif; ?>

	<section class="custom-cta catalog-cta">
		<div>
			<p class="eyebrow"><?php esc_html_e( 'Tidak menemukan yang pas?', 'hooknchill' ); ?></p>
			<h2><?php esc_html_e( 'Kita rajut versimu sendiri.', 'hooknchill' ); ?></h2>
		</div>
		<a class="button button-primary" href="<?php echo esc_url( home_url( '/pesan-custom/' ) ); ?>"><?php esc_html_e( 'Mulai pesanan custom', 'hooknchill' ); ?><span aria-hidden="true">↗</span></a>
	</section>
</main>
<?php get_footer(); ?>
