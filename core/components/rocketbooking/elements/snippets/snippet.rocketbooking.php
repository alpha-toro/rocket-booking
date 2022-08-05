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

$set                = $modx->getOption('set', $scriptProperties, null);
$sets               = $modx->getOption('sets', $scriptProperties, null);
$tpl                = $modx->getOption('tpl', $scriptProperties, 'rb-seat-tpl');
$setTpl             = $modx->getOption('setTpl', $scriptProperties, null);
$sortBy             = $modx->getOption('sortBy', $scriptProperties, 'rank');
$sortDir            = $modx->getOption('sortDir', $scriptProperties, 'ASC');
$limit              = $modx->getOption('limit', $scriptProperties, null);
$showUnpublished    = $modx->getOption('showUnpublished', $scriptProperties, false);
$showMenu           = $modx->getOption('showMenu', $scriptProperties, false);
$outputSeparator    = $modx->getOption('outputSeparator', $scriptProperties, "\n");
$setOutputSeparator = $modx->getOption('setOutputSeparator', $scriptProperties, "\n");

/* build query */
$c = $modx->newQuery('RocketBookingTable');

if (!empty($set)) {
    $c->where(array(
        'id' => $set,
    ));
} else if (!empty($sets)) {
    $c->where(array(
        'id:IN' => explode(',', $sets),
    ));
    $c->sortby('id','ASC');
} else {
    $c->sortby('id','ASC');
}
if (!$showUnpublished) {
    $c->where(array(
        'published' => true
    ));
}
if (!empty($limit)) $c->limit($limit);

// Get collection of sets based on query
$sets = $modx->getCollection('RocketBookingTable', $c);

// Loop through found sets and build the output
$list = array();
foreach ($sets as $set) {
    // Empty array to hold output from current set
    $setList  = array();
    $setArray = $set->toArray();

    // Loop through items and set output to array
    $ci = $modx->newQuery('RocketBookingSeat');

    // Hide unpublished items
    if (!$showUnpublished) {
        $ci->where(array('published' => true));
    }

    $ci->sortby($modx->quote($sortBy), $sortDir);

    foreach ($set->getMany('Item', $ci) as $item) {
        $itemArray = $item->toArray();
        $setList[] = $RocketBooking->getChunk($tpl, $itemArray);
    }

    // If no set template is defined, don't output set data
    if (!empty($setTpl)) {
        $setArray = array_merge($setArray, ['count' => count($setList)]);
        $setHeading = $RocketBooking->getChunk($setTpl, $setArray);
    }

    // Collect output from this FAQ set.
    if (isset($setHeading)) {
        $list[] = $setHeading . "\n" . implode($outputSeparator, $setList);
    } else {
        $list[] = implode($outputSeparator, $setList);

    }
}

// Build output
$output        = implode($setOutputSeparator, $list);
$toPlaceholder = $modx->getOption('toPlaceholder', $scriptProperties, false);
if (!empty($toPlaceholder)) {
    // If using a placeholder, output nothing and set output to specified placeholder
    $modx->setPlaceholder($toPlaceholder, $output);
    return '';
}

// By default just return output
return $output;
