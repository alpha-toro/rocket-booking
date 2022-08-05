
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
 * rocketbooking; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 */
/**
 * Resolve files. Mostly for removing files that get removed from the package.
 *
 * @package rocketbooking
 * @subpackage build
 */
if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            $removedFiles = [
                'components/rocketbooking/controllers/mgr/header.php',
                'components/rocketbooking/controllers/mgr/set.php',
                'components/rocketbooking/processors/mgr/seat/create.php',
                'components/rocketbooking/processors/mgr/seat/getlist.php',
                'components/rocketbooking/processors/mgr/seat/publish.php',
                'components/rocketbooking/processors/mgr/seat/remove.php',
                'components/rocketbooking/processors/mgr/seat/sort.php',
                'components/rocketbooking/processors/mgr/seat/unpublish.php',
                'components/rocketbooking/processors/mgr/seat/update.php',
                'components/rocketbooking/processors/mgr/table/getlist.php',
                'components/rocketbooking/processors/mgr/table/publish.php',
                'components/rocketbooking/processors/mgr/table/remove.php',
                'components/rocketbooking/processors/mgr/table/sort.php',
                'components/rocketbooking/processors/mgr/table/unpublish.php',
            ];

            foreach ($removedFiles as $file) {
                $file = str_replace('/', DIRECTORY_SEPARATOR, $file);
                if (file_exists(MODX_CORE_PATH . $file)) {
                    if (is_dir(MODX_CORE_PATH . $file)) {
                        rmdir(MODX_CORE_PATH . $file);
                    } else {
                        unlink(MODX_CORE_PATH . $file);
                    }
                }
            }

        break;

        case xPDOTransport::ACTION_UNINSTALL:
        break;
    }
}
return true;
