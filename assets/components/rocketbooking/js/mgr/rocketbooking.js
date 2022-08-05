var RocketBooking = function(config) {
    config = config || {};
    RocketBooking.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {},view: {}
});
Ext.reg('rocketbooking',RocketBooking);
RocketBooking = new RocketBooking();

RocketBooking.combo.PublishStatus = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: [[1, _('published')], [0, _('unpublished')]]
        ,name: 'published'
        ,hiddenName: 'published'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    RocketBooking.combo.PublishStatus.superclass.constructor.call(this, config);
};
Ext.extend(RocketBooking.combo.PublishStatus, MODx.combo.ComboBox);
Ext.reg('rocketbooking-combo-publish-status', RocketBooking.combo.PublishStatus);

RocketBooking.PanelSpacer = { html: '<br />', border: false, cls: 'rocketbooking-panel-spacer' };
