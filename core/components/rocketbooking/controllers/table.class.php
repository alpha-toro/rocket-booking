
<?php
/**
 * RocketBooking
 **
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
 * @package rocketbooking
 * @subpackage controllers
 */

require_once dirname(dirname(__FILE__)).'/model/rocketbooking/rocketbooking.class.php';
class RocketBookingTableManagerController extends \modExtraManagerController {
    public $rocketbooking;
    private $tableid = false;
    private $tablename = false;

    public function initialize() {
        $this->rocketbooking = new RocketBooking($this->modx);
        $this->addCss($this->rocketbooking->config['cssUrl'].'mgr.css');
        $this->addJavascript($this->rocketbooking->config['jsUrl'].'mgr/rocketbooking.js');
        $this->addHtml('<script>
            Ext.onReady(function() {
                RocketBooking.config = ' . $this->modx->toJSON($this->rocketbooking->config) . ';
                RocketBooking.config.connector_url = "' . $this->rocketbooking->config['connectorUrl'] . '";
                RocketBooking.action = "' . (!empty($_REQUEST['a']) ? $_REQUEST['a'] : 'index') . '";
                RocketBooking.request = ' . $this->modx->toJSON($_GET) . ';
            });
        </script>');

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return array('rocketbooking:default');
    }

    public function checkPermissions() {
        return true;
    }

    public function process(array $scriptProperties = []) {
        if (isset($scriptProperties['tableid'])) {
            $this->tableid = $scriptProperties['tableid'];
        } else {
            return false;
        }
        if (isset($scriptProperties['tablename'])) {
            $this->tablename = $scriptProperties['tablename'];
        } else {
            return false;
        }
    }

    public function getPageTitle() {
        return $this->modx->lexicon('rocketbooking');
    }

    public function loadCustomCssJs() {

        $this->addJavascript($this->rocketbooking->config['jsUrl'] . 'mgr/widgets/seats.grid.js');
        $this->addJavascript($this->rocketbooking->config['jsUrl'] . 'mgr/widgets/table.panel.js');
        $this->addLastJavascript($this->rocketbooking->config['jsUrl'] . 'mgr/sections/table.js');
        $this->addHtml('<script>Ext.onReady(function() { MODx.load({xtype: "rocketbooking-page-table", tableid:"'.$this->tableid.'", tablename:"'.$this->tablename.'"}) })</script>');
    }

    public function getTemplateFile() {
        return $this->rocketbooking->config['templatesPath'] . 'table.tpl';
    }

}
