<?php
/**
 * RocketBooking
 *
 * rocketbooking is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * rocketbooking is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * rocketbooking; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package rocketbooking
 */
/**
 * Remove an Item.
 *
 * @package rocketbooking
 * @subpackage processors
 */
class RocketBookingSeatRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'RocketBookingSeat';
    public $languageTopic = array('rocketbooking:default');
    public $objectType = 'rocketbooking.rocketbooking';

    private $rank;
    private $table;

    /**
     * Get rank and set to use after removal
     *
     * @return boolean
     */
    public function beforeRemove() {
        $this->rank = $this->object->get('rank');
        $this->table  = $this->object->get('table');

        return !$this->hasErrors();
    }

    /**
     * Cleanup ranks after removal
     *
     * @return bool
     */
    public function afterRemove() {
        /**
         * If we made it here, then the item has been deleted. We now need to go through
         * each item below the removed spot and decrease each rank by 1 to keep ranks in order
         */
        $this->modx->exec("
            UPDATE {$this->modx->getTableName($this->classKey)}
            SET rank = rank - 1
            WHERE
            `table` = {$this->table}
            AND rank > {$this->rank}
            AND rank > 0
        ");
        return true;
    }
}

return 'RocketBookingSeatRemoveProcessor';
