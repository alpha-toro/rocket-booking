<?php
/**
 *
 * @package rocketbooking
 */

$rocketBooking = $modx->getService('rocketbooking','RocketBooking',$modx->getOption('rocketbooking.core_path',null,$modx->getOption('core_path').'components/rocketbooking/').'model/rocketbooking/',$scriptProperties);
if (!($RocketBooking instanceof RocketBooking)) return '';

$set = $modx->getOption('set',$scriptProperties,null);
$tpl = $modx->getOption('tpl',$scriptProperties,'Faqs');
$questionTpl = $modx->getOption('questionTpl',$scriptProperties,'rg-set-tpl');
$sortBy = $modx->getOption('sortBy',$scriptProperties,'name');
$sortDir = $modx->getOption('sortDir',$scriptProperties,'ASC');
$limit = $modx->getOption('limit',$scriptProperties,null);
$outputSeparator = $modx->getOption('outputSeparator',$scriptProperties,"\n");
$questionOutputSeparator = $modx->getOption('questionOutputSeparator',$scriptProperties,"\n");
$showUnpublished = $modx->getOption('showUnpublished', $scriptProperties, false);

/* build query */
$c = $modx->newQuery('RocketBookingTable');

if (!empty($set)) {
    $field = (is_numeric($set)) ? 'id' : 'name';
    $c->where(array(
        $field => $set,
    ));
}

// Hide unpublished sets
if (!$showUnpublished) {
    $c->where(array('published' => true));
}

$c->sortby($modx->quote($sortBy),$sortDir);
if (!empty($limit)) $c->limit($limit);
$items = $modx->getCollection('RocketBookingTable',$c);

/* iterate through items */
$list = array();

$si = 0;
foreach ($items as $item) {
    $si++;
    $itemArray = $item->toArray();
    $itemArray['setidx'] = $si;

    // get items of this set
    $criteria = $modx->newQuery('RocketBookingSeat');
    if (!$showUnpublished) {
        $criteria->where(array('published' => true));
    }
    $criteria->sortby($modx->quote('rank'),'ASC');
    $seats = $item->getMany('Seat',$criteria);

    $list = array();
    $qi = 0;
    foreach ($seats as $q) {
        $qi++;
    	  $qArray = $q->toArray();
        $qArray['idx'] = $qi;
    	  $qArray['set_name'] = $itemArray['name'];
	      $list[] = $rocketBooking->getChunk($questionTpl,$qArray);
    }
    $itemArray['seats'] = implode($questionOutputSeparator,$list);

    $list[] = $rocketBooking->getChunk($tpl,$itemArray);
}

/* output */
$output = implode($outputSeparator,$list);
$toPlaceholder = $modx->getOption('toPlaceholder',$scriptProperties,false);
if (!empty($toPlaceholder)) {
    /* if using a placeholder, output nothing and set output to specified placeholder */
    $modx->setPlaceholder($toPlaceholder,$output);
    return '';
}

/* by default just return output */
return $output;
