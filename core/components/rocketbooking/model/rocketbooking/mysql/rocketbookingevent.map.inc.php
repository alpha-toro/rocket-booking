<?php
/**
 * @package rocketbooking
 */
$xpdo_meta_map['RocketBookingEvent']= array (
  'package' => 'rocketbooking',
  'version' => '1.1',
  'table' => 'rocketbooking_event',
  'extends' => 'xPDOSimpleObject',
  'fields' =>
  array (
    'name' => '',
    'description' => '',
    'rank' => 0,
    'price' => 0,
    'published' => 1,
    'type' => ''
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
  ),
  'composites' =>
  array (
    'Table' =>
    array (
      'class' => 'RocketBookingTable',
      'local' => 'id',
      'foreign' => 'event',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
