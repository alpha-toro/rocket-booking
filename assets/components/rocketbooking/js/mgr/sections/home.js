RocketBooking.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'rocketbooking-panel-home'
            ,renderTo: 'rocketbooking-panel-home-div'
        }]
    });
    RocketBooking.page.Home.superclass.constructor.call(this,config);

};
Ext.extend(RocketBooking.page.Home,MODx.Component);
Ext.reg('rocketbooking-page-home',RocketBooking.page.Home);
