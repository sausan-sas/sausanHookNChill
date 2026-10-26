<?php
/** Versioned custom table schema. */

defined( 'ABSPATH' ) || exit;

final class HC_Operations_Schema {
	const VERSION     = '1.0.0';
	const VERSION_KEY = 'hooknchill_operations_schema_version';

	public static function install() {
		global $wpdb;

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$charset_collate = $wpdb->get_charset_collate();
		$stock_table     = $wpdb->prefix . 'hc_stock_movements';
		$orders_table    = $wpdb->prefix . 'hc_custom_orders';
		$events_table    = $wpdb->prefix . 'hc_custom_order_events';

		$stock_sql = "CREATE TABLE {$stock_table} (
			movement_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			product_id bigint(20) unsigned NOT NULL,
			variation_id bigint(20) unsigned DEFAULT NULL,
			order_id bigint(20) unsigned DEFAULT NULL,
			order_item_id bigint(20) unsigned DEFAULT NULL,
			movement_type varchar(20) NOT NULL,
			quantity_delta int(11) NOT NULL,
			stock_before int(10) unsigned NOT NULL,
			stock_after int(10) unsigned NOT NULL,
			source_key varchar(191) NOT NULL,
			note varchar(255) DEFAULT NULL,
			actor_user_id bigint(20) unsigned DEFAULT NULL,
			created_at datetime NOT NULL,
			PRIMARY KEY  (movement_id),
			UNIQUE KEY source_key (source_key),
			KEY product_created (product_id,created_at),
			KEY variation_created (variation_id,created_at),
			KEY order_item (order_id,order_item_id),
			KEY actor_created (actor_user_id,created_at)
		) ENGINE=InnoDB {$charset_collate};";

		$orders_sql = "CREATE TABLE {$orders_table} (
			custom_order_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			submission_key char(36) NOT NULL,
			customer_user_id bigint(20) unsigned DEFAULT NULL,
			assigned_user_id bigint(20) unsigned DEFAULT NULL,
			customer_name varchar(120) NOT NULL,
			customer_email varchar(191) DEFAULT NULL,
			whatsapp varchar(24) NOT NULL,
			product_type varchar(80) NOT NULL,
			size_text varchar(80) DEFAULT NULL,
			color_text varchar(120) DEFAULT NULL,
			quantity smallint(5) unsigned NOT NULL DEFAULT 1,
			idea_description text NOT NULL,
			reference_file_key varchar(191) DEFAULT NULL,
			needed_by date DEFAULT NULL,
			budget decimal(12,2) unsigned DEFAULT NULL,
			quoted_price decimal(12,2) unsigned DEFAULT NULL,
			deposit_amount decimal(12,2) unsigned DEFAULT NULL,
			status varchar(24) NOT NULL DEFAULT 'new',
			wc_order_id bigint(20) unsigned DEFAULT NULL,
			created_at datetime NOT NULL,
			updated_at datetime NOT NULL,
			PRIMARY KEY  (custom_order_id),
			UNIQUE KEY submission_key (submission_key),
			UNIQUE KEY wc_order_id (wc_order_id),
			KEY status_created (status,created_at),
			KEY customer_created (customer_user_id,created_at),
			KEY assigned_user_id (assigned_user_id)
		) ENGINE=InnoDB {$charset_collate};";

		$events_sql = "CREATE TABLE {$events_table} (
			event_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			custom_order_id bigint(20) unsigned NOT NULL,
			actor_user_id bigint(20) unsigned DEFAULT NULL,
			from_status varchar(24) DEFAULT NULL,
			to_status varchar(24) NOT NULL,
			note text DEFAULT NULL,
			created_at datetime NOT NULL,
			PRIMARY KEY  (event_id),
			KEY custom_order_created (custom_order_id,created_at),
			KEY actor_created (actor_user_id,created_at)
		) ENGINE=InnoDB {$charset_collate};";

		dbDelta( $stock_sql );
		dbDelta( $orders_sql );
		dbDelta( $events_sql );

		if ( self::table_exists( $stock_table ) && self::table_exists( $orders_table ) && self::table_exists( $events_table ) ) {
			update_option( self::VERSION_KEY, self::VERSION, false );
		}
	}

	public static function maybe_upgrade() {
		$installed_version = get_option( self::VERSION_KEY, '0.0.0' );
		if ( version_compare( $installed_version, self::VERSION, '<' ) ) {
			self::install();
		}
	}

	private static function table_exists( $table_name ) {
		global $wpdb;

		$found_table = $wpdb->get_var(
			$wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->esc_like( $table_name ) )
		);

		return $table_name === $found_table;
	}
}