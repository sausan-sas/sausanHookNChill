<?php get_header(); ?>
<main id="main-content" class="content-shell">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article <?php post_class( 'content-entry' ); ?>><h1><?php the_title(); ?></h1><div class="entry-content"><?php the_content(); ?></div></article>
	<?php endwhile; else : ?>
		<h1><?php esc_html_e( 'Belum ada konten.', 'hooknchill' ); ?></h1>
	<?php endif; ?>
</main>
<?php get_footer(); ?>