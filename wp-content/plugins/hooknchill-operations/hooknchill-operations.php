<?php
/**
 * Plugin Name: Hooknchill Operations
 * Description: Schema storage for Hooknchill stock movements and custom orders.
 * Version: 1.0.0
 * Requires at least: 6.4
 * Requires PHP: 8.0
 * Text Domain: hooknchill-operations
 *
 * @package HooknchillOperations
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/includes/class-hc-operations-schema.php';

register_activation_hook( __FILE__, array( 'HC_Operations_Schema', 'install' ) );
add_action( 'plugins_loaded', array( 'HC_Operations_Schema', 'maybe_upgrade' ) );