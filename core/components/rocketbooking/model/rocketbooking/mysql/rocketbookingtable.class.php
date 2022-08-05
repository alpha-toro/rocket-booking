<?php
/**
 * @package rocketbooking
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/rocketbookingtable.class.php');
class RocketBookingTable_mysql extends RocketBookingTable {}
?>
