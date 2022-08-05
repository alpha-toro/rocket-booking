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
 * Adds modMenu items into package
 *
 * @package rocketbooking
 * @subpackage build
 */
/* load action into menu */
$menu= $modx->newObject('modMenu');
$menu->fromArray(array(
    'text'        => 'rocketbooking',
    'parent'      => 'components',
    'description' => 'rocketbooking.menu_desc',
    'action'      => 'index',
    'namespace'   => 'rocketbooking'
), '', true, true);

return $menu;
