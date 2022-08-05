RocketBooking.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('rocketbooking')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-panel'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,activeItem: 0
            ,hideMode: 'offsets'
            ,items: [
                {
                    items: [
                        {
                            xtype: 'rocketbooking-grid-event'
                            ,preventRender: true
                            ,cls: 'main-wrapper'
                        }
                    ]
                }
            ]
        }]
    });
    RocketBooking.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.panel.Home,MODx.Panel);
Ext.reg('rocketbooking-panel-home',RocketBooking.panel.Home);
