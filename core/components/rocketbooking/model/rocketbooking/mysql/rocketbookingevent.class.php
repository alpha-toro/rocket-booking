<?php
/**
 * @package rocketbooking
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/rocketbookingevent.class.php');
class RocketBookingEvent_mysql extends RocketBookingEvent {}
?>
