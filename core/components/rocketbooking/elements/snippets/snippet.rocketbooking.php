<?php
/**
 * The base RocketBooking snippet.
 *
 * @package rocketbooking
 */
$RocketBooking = $modx->getService(
    'rocketbooking',
    'RocketBooking',
    $modx->getOption('rocketbooking.core_path', null, $modx->getOption('core_path').'components/rocketbooking/').'model/rocketbooking/',
    $scriptProperties
);
if (!($RocketBooking instanceof RocketBooking)) return 'No RocketBooking Service';

$output             = '';
$tpl                = $modx->getOption('tpl', $scriptProperties, 'rb-event-tpl');
$sortBy             = $modx->getOption('sortBy', $scriptProperties, 'rank');
$sortDir             = $modx->getOption('sortDir', $scriptProperties, 'ASC');


/* build query */
$c = $modx->newQuery('RocketBookingEvent');
$c->sortby($sortBy,$sortDir);

// Get collection of sets based on query
$records = $modx->getCollection('RocketBookingEvent', $c);

// Loop through events and build the output
foreach ($records as $r) {
    $rArray = $r->toArray();
    $output .= $modx->getChunk($tpl, $rArray);
}

return $output;
