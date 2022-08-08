<?php
/**
 *
 * @package rocketbooking
 * [[RocketBookingSeats? &table_id=`4`]]
 *
 */

$RocketBooking = $modx->getService(
    'rocketbooking',
    'RocketBooking',
    $modx->getOption('rocketbooking.core_path', null, $modx->getOption('core_path').'components/rocketbooking/').'model/rocketbooking/',
    $scriptProperties
);
if (!($RocketBooking instanceof RocketBooking)) return 'No RocketBooking Service';

$output              = '';
$table_id            = $modx->getOption('table_id',$scriptProperties,null);
$table_tpl           = $modx->getOption('table_tpl',$scriptProperties,'rb-table-tpl');
$seat_tpl            = $modx->getOption('seat_tpl',$scriptProperties,'rb-seat-tpl');


/* build query */
$c = $modx->newQuery('RocketBookingTable');

if (empty($table_id)) {
    return "No Table ID";
}

$c->where(array(
    'id' => $table_id, 'published' => 1
));


$records = $modx->getCollection('RocketBookingTable',$c);

foreach ($records as $r) {
    $rArray = $r->toArray();
    $tableArray = $rArray;


    $c = $modx->newQuery('RocketBookingSeat');
    $c->where(array('table' => $rArray['id'], 'published' => 1));
    $c->sortby('rank','ASC');

    $seats = $modx->getCollection('RocketBookingSeat',$c);

    foreach ($seats as $s) {
        $sArray = $s->toArray();
        $tableArray['seats'] .= $modx->getChunk($seat_tpl, $sArray);
    }

    $output .= $modx->getChunk($table_tpl, $tableArray);
}



return $output;
