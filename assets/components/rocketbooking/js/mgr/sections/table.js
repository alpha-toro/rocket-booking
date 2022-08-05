RocketBooking.page.Table = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
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
