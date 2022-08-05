<?php
/**
 * @package rocketbooking
 */
$xpdo_meta_map['RocketBookingSeat']= array (
  'package' => 'rocketbooking',
  'version' => '1.1',
  'table' => 'rocketbooking_seats',
  'extends' => 'xPDOSimpleObject',
  'fields' =>
  array (
    'title' => '',
    'desc' => '',
    'rank' => 0,
    'type' => 0,
    'published' => 1,
    'table' => 0,
  ),
  'fieldMeta' =>
  array (
    'title' =>
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'desc' =>
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'rank' =>
    array (
      'dbtype' => 'integer',
      'precision' => '5',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'type' =>
    array (
      'dbtype' => 'integer',
      'precision' => '1',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'published' =>
    array (
      'dbtype' => 'integer',
      'precision' => '1',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 1,
    ),
    'table' =>
    array (
      'dbtype' => 'integer',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'index',
    ),
  ),
  'aggregates' =>
  array (
    'Table' =>
    array (
      'class' => 'RocketBookingTable',
      'local' => 'table',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
