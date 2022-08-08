<?php
/**
 * @package rocketbooking
 */
$xpdo_meta_map['RocketBookingTable']= array (
  'package' => 'rocketbooking',
  'version' => '1.1',
  'table' => 'rocketbooking_table',
  'extends' => 'xPDOSimpleObject',
  'fields' =>
  array (
    'name' => '',
    'description' => '',
    'rank' => 0,
    'price' => 0,
    'published' => 1,
    'type' => '',
    'event' => 0
  ),
  'fieldMeta' =>
  array (
    'name' =>
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'description' =>
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
    'price' =>
    array (
      'dbtype' => 'decimal',
      'precision' => '6,2',
      'attributes' => 'unsigned',
      'phptype' => 'float',
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
    'type' =>
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'event' =>
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
  'composites' =>
  array (
    'Seat' =>
    array (
      'class' => 'RocketBookingSeat',
      'local' => 'id',
      'foreign' => 'table',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
  'aggregates' =>
    array (
    'Event' =>
    array (
      'class' => 'RocketBookingEvent',
      'local' => 'event',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
