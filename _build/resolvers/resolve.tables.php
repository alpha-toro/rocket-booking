<?php
/**
 * RocketBooking
 *
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
 * Resolve creating db tables
 *
 * @package rocketbooking
 * @subpackage build
 */
if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
            /** @var modX $modx */
            $modx      =& $object->xpdo;
            $modelPath = $modx->getOption('rocketbooking.core_path',null,$modx->getOption('core_path').'components/rocketbooking/').'model/';
            $modx->addPackage('rocketbooking',$modelPath);

            /** @var xPDOManager $manager */
            $manager = $modx->getManager();

            $manager->createObjectContainer('RocketBookingSeat');
            $manager->createObjectContainer('RocketBookingTable');

            break;
        case xPDOTransport::ACTION_UPGRADE:
            break;
    }
}
return true;
