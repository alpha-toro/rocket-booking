<?php
/**
 * RocketBooking
 *
 * RocketBooking is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * RocketBooking is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * RocketBooking; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 */
/**
 * Properties for the RocketBooking snippet.
 *
 * @package rocketbooking
 * @subpackage build
 */
$properties = array(
    array(
        'name'    => 'seatTpl',
        'desc'    => 'prop_rocketbooking.tpl_desc',
        'type'    => 'textfield',
        'options' => '',
        'value'   => 'rb-seat-tpl',
        'lexicon' => 'rocketbooking:properties',
    ),
    array(
        'name'    => 'tableTpl',
        'desc'    => 'prop_rocketbooking.tpl_desc',
        'type'    => 'textfield',
        'options' => '',
        'value'   => 'rb-table-tpl',
        'lexicon' => 'rocketbooking:properties',
    ),
    array(
        'name'    => 'sortBy',
        'desc'    => 'prop_rocketbooking.sortby_desc',
        'type'    => 'textfield',
        'options' => '',
        'value'   => 'rank',
        'lexicon' => 'rocketbooking:properties',
    ),
    array(
        'name'    => 'sortDir',
        'desc'    => 'prop_rocketbooking.sortdir_desc',
        'type'    => 'textfield',
        'options' => '',
        'value'   => 'ASC',
        'lexicon' => 'rocketbooking:properties',
    ),
    array(
        'name'    => 'outputSeparator',
        'desc'    => 'prop_rocketbooking.outputseparator_desc',
        'type'    => 'textfield',
        'options' => '',
        'value'   => "\n",
        'lexicon' => 'rocketbooking:properties',
    ),
    array(
        'name'    => 'toPlaceholder',
        'desc'    => 'prop_rocketbooking.toplaceholder_desc',
        'type'    => 'combo-boolean',
        'options' => '',
        'value'   => false,
        'lexicon' => 'rocketbooking:properties',
    ),
);

return $properties;
