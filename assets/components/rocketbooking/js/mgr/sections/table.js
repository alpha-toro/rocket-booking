RocketBooking.page.Table = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        buttons: [{
            text: _('rocketbooking.back_to_sets')
            ,id: 'rocketbooking-btn-back'
            ,handler: function() {
                MODx.loadPage('?a=index&namespace='+RocketBooking.request.namespace);
            }
            ,scope: this
        }]
        ,components: [{
            xtype: 'rocketbooking-panel-table'
            ,renderTo: 'rocketbooking-panel-table-div'
            ,tableid: config.tableid
            ,tablename: config.tablename
        }]
    });
    RocketBooking.page.Table.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.page.Table,MODx.Component);
Ext.reg('rocketbooking-page-table',RocketBooking.page.Table);
