<?php
/**
 *
 * @package rocketbooking
 * [[RocketBookingTables? &event_id=`4`]]
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
$event_id            = $modx->getOption('event_id',$scriptProperties,null);
$event_tpl           = $modx->getOption('event_tpl',$scriptProperties,'rb-event-tpl');
$table_tpl           = $modx->getOption('table_tpl',$scriptProperties,'rb-table-tpl');
$seat_tpl            = $modx->getOption('seat_tpl',$scriptProperties,'rb-seat-tpl');


/* build query */
$c = $modx->newQuery('RocketBookingEvent');

if (empty($event_id)) {
    return "No Event ID";
}

$c->where(array(
    'id' => $event_id, 'published' => 1
));

$records = $modx->getCollection('RocketBookingEvent',$c);

foreach ($records as $r) {
    $rArray = $r->toArray();
    $eventArray = $rArray;


    $q = $modx->newQuery('RocketBookingTable');
    $q->where(array('event' => $rArray['id'], 'published' => 1));
    $q->sortby('rank','ASC');

    $tables = $modx->getCollection('RocketBookingTable',$q);

    foreach ($tables as $t) {
        $tArray = $t->toArray();

        $s = $modx->newQuery('RocketBookingSeat');
        $s->where(array('table' => $tArray['id'], 'published' => 1));
        $s->sortby('rank','ASC');

        $seats = $modx->getCollection('RocketBookingSeat',$s);

        foreach ($seats as $st) {
            $sArray = $st->toArray();
            $tArray['seats'] .= $modx->getChunk($seat_tpl, $sArray);
        }

        $eventArray['tables'] .= $modx->getChunk($table_tpl, $tArray);
    }


    $output .= $modx->getChunk($event_tpl, $eventArray);
}



return $output;
