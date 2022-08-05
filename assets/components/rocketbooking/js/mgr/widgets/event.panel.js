RocketBooking.panel.Event = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,url: RocketBooking.config.connectorUrl
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+config.eventname+'</h2>'
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
                        xtype: 'rocketbooking-grid-table'
                        ,eventid: config.eventid
                        ,preventRender: true
                        ,cls: 'main-wrapper'
                    }
                ]
            }]
        }]
    });
    RocketBooking.panel.Event.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.panel.Event,MODx.Panel);
Ext.reg('rocketbooking-panel-event',RocketBooking.panel.Event);
