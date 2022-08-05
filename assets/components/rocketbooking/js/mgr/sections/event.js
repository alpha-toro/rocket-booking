RocketBooking.page.Event = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        buttons: [{
            text: _('rocketbooking.back_to_events')
            ,id: 'rocketbooking-btn-back'
            ,handler: function() {
                MODx.loadPage('?a=index&namespace='+RocketBooking.request.namespace);
            }
            ,scope: this
        }]
        ,components: [{
            xtype: 'rocketbooking-panel-event'
            ,renderTo: 'rocketbooking-panel-event-div'
            ,eventid: config.eventid
            ,eventname: config.eventname
        }]
    });
    RocketBooking.page.Event.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.page.Event,MODx.Component);
Ext.reg('rocketbooking-page-event',RocketBooking.page.Event);
