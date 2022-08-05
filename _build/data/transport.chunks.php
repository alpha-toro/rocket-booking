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
 * Loads system settings into build
 *
 * @package rocketbooking
 * @subpackage build
 */

$chunks = array();

$chunks[1]= $modx->newObject('modChunk');
$chunks[1]->fromArray(array(
    'id' => 1,
    'name' => 'rb-event-tpl',
    'description' => 'Event template.',
    'snippet' => file_get_contents($sources['source_core'].'/elements/chunks/event.chunk.tpl'),
    'properties' => NULL
),'',true,true);

$chunks[2]= $modx->newObject('modChunk');
$chunks[2]->fromArray(array(
    'id' => 2,
    'name' => 'rb-seat-tpl',
    'description' => 'Seat template.',
    'snippet' => file_get_contents($sources['source_core'].'/elements/chunks/seat.chunk.tpl'),
    'properties' => NULL
),'',true,true);

$chunks[3]= $modx->newObject('modChunk');
$chunks[3]->fromArray(array(
    'id' => 3,
    'name' => 'rb-table-tpl',
    'description' => 'Table template.',
    'snippet' => file_get_contents($sources['source_core'].'/elements/chunks/table.chunk.tpl'),
    'properties' => NULL
),'',true,true);

return $chunks;
