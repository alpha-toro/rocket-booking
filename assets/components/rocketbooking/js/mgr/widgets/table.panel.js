RocketBooking.panel.Table = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,url: RocketBooking.config.connectorUrl
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+config.tablename+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-panel'
            ,defaults: { border: false, autoHeight: true }
            ,border: true
            ,activeItem: 0
            ,hideMode: 'offsets'
            ,items: [{
                items: [
                    {
                        xtype: 'rocketbooking-grid-seats'
                        ,tableid: config.tableid
                        ,preventRender: true
                        ,cls: 'main-wrapper'
                    }
                ]
            }]
        }]
    });
    RocketBooking.panel.Table.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.panel.Table,MODx.Panel);
Ext.reg('rocketbooking-panel-table',RocketBooking.panel.Table);
