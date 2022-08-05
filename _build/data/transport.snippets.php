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
 * Add snippets to build
 *
 * @package rocketbooking
 * @subpackage build
 */
$snippets   = array();
$snippets[0]= $modx->newObject('modSnippet');
$snippets[0]->fromArray(array(
    'id'          => 0,
    'name'        => 'RocketBooking',
    'description' => 'Displays Tables.',
    'snippet'     => getSnippetContent($sources['source_core'].'/elements/snippets/snippet.rocketbooking.php'),
), '', true, true);
$properties = include $sources['build'].'properties/properties.rocketbooking.php';
$snippets[0]->setProperties($properties);
unset($properties);

$snippets[1]= $modx->newObject('modSnippet');
$snippets[1]->fromArray(array(
    'id'          => 1,
    'name'        => 'RocketBookingSeats',
    'description' => 'Displays Seats.',
    'snippet'     => getSnippetContent($sources['source_core'].'/elements/snippets/snippet.rocketbookingseats.php'),
), '', true, true);
unset($properties);

return $snippets;
