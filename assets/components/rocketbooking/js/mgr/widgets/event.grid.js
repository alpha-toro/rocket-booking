RocketBooking.grid.Event = function(config) {
    config = config || {};
    var gridView = new Ext.grid.GridView({
        forceFit: true
        ,scrollOffset: 0
        ,getRowClass : function (row, index) {
            var cls = '';
            var data = row.data;

            if (data.published == 0) {
                cls = 'rocketbooking-grid-event-unpublished'; // Faded color
            }

            return cls;
        }
    });  //end gridView

    Ext.applyIf(config,{
        id: 'rocketbooking-grid-event'
        ,url: RocketBooking.config.connectorUrl
        ,baseParams: { action: 'mgr/event/getlist' }
        ,fields: ['id','name','description','rank','type','price','published']
        ,autoHeight: true
        ,paging: true
        ,ddGroup: 'mygridDD'
        ,enableDragDrop: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/event/updatefromgrid'
        ,autosave: true
        ,view: gridView
        ,columns: [
            {
                header: _('id')
                ,dataIndex: 'id'
                ,width: 20
            }
            ,{
                header: _('name')
                ,dataIndex: 'name'
                ,width: 100
                ,editor: { xtype: 'textfield' }
            }
            ,{
                header: _('description')
                ,dataIndex: 'description'
                ,width: 300
                ,editor: { xtype: 'textfield' }
            }
            ,{
                header: _('rocketbooking.type')
                ,dataIndex: 'type'
                ,width: 60
                ,editor: { xtype: 'rocketbooking-combo-type', renderer: true }
            }
            ,{
                header: 'Price'
                ,dataIndex: 'price'
                ,width: 50
                ,editor: { xtype: 'numberfield' }
            }
            ,{
                header: _('published')
                ,dataIndex: 'published'
                ,width: 50
                ,renderer: {fn:this._renderPublished, scope: this}
            }
        ]
        ,listeners: {
            "render": {
                scope: this
                ,fn: function(grid) {
                    var ddrow = new Ext.dd.DropTarget(grid.container, {
                        ddGroup: 'mygridDD'
                        ,copy: false
                        ,notifyDrop: function(dd, e, data) { // thing being dragged, event, data from dagged source
                            var ds = grid.store;
                            var sm = grid.getSelectionModel();
                            rows   = sm.getSelections();

                            if (dd.getDragData(e)) {
                                var targetNode = dd.getDragData(e).selections[0];
                                var sourceNode = data.selections[0];

                                grid.fireEvent('sort',{
                                    target: targetNode
                                    ,source: sourceNode
                                    ,event: e
                                    ,dd: dd
                                });
                            }
                        }
                    });
                }
            }
        }
        ,tbar: [{
            text: _('rocketbooking.event_create')
            ,handler: this.createEvent
            ,scope: this
        }]
    });
    RocketBooking.grid.Event.superclass.constructor.call(this,config);
    this.addEvents('sort');
    this.on('sort',this.onSort,this);
};
Ext.extend(RocketBooking.grid.Event,MODx.grid.Grid,{
    windows: {}

    ,onSort: function(o) {
        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/event/sort'
                ,source: o.source.id
                ,target: o.target.id
            }
            ,listeners: {
                'success':{fn:function(r) {
                    this.refresh();
                },scope:this}
            }
        });
    }
    ,getMenu: function() {
        var record = this.menu.record;
        var m = [];
        m.push({
            text: _('rocketbooking.event_manage')
            ,handler: this.manageEvent
        });
        m.push({
            text: _('rocketbooking.event_update')
            ,handler: this.updateEvent
        });

        if (record.published) {
            m.push({
                text: _('rocketbooking.unpublish')
                ,handler: this.unpublishEvent
            });
        } else {
            m.push({
                text: _('rocketbooking.publish')
                ,handler: this.publishEvent
            });
        }

        m.push('-');
        m.push({
            text: _('rocketbooking.event_remove')
            ,handler: this.removeEvent
        });
        this.addContextMenuItem(m);
    }

    ,manageEvent: function() {
        var redir = '?a=event&namespace='+MODx.request.namespace+'&eventid=';

        // needed for double click
        if (typeof(this.menu.record) == "undefined") {
            redir += this.getSelectedAsList();
        } else {
            redir += this.menu.record.id+'&eventname='+this.menu.record.name;
        }
        MODx.loadPage(redir);
    }

    ,createEvent: function(btn,e) {
        e.preventDefault();
        if (!this.windows.createEvent) {
            this.windows.createEvent = MODx.load({
                xtype: 'rocketbooking-window-event-create'
                ,listeners: {
                    'success': {fn:function() {this.refresh();},scope:this}
                }
            });
        }
        this.windows.createEvent.fp.getForm().reset();
        this.windows.createEvent.show(e.target);
    }

    ,updateEvent: function(btn,e) {
        e.preventDefault();
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        if (!this.windows.updateEvent) {
            this.windows.updateEvent = MODx.load({
                xtype: 'rocketbooking-window-event-update'
                ,record: r
                ,listeners: {
                    'success': {fn:function() {this.refresh();},scope:this}
                }
            });
        }
        this.windows.updateEvent.fp.getForm().reset();
        this.windows.updateEvent.fp.getForm().setValues(r);
        this.windows.updateEvent.show(e.target);
    }

    ,publishEvent: function(btn, e) {
        if (!this.menu.record) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/event/publish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:function(r) {
                    this.refresh();
                }, scope:this}
            }
        });
    }

    ,unpublishEvent: function(btn, e) {
        if (!this.menu.record) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/event/unpublish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:function(r) {
                    this.refresh();
                }, scope:this}
            }
        });
    }

    ,removeEvent: function(btn,e) {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: _('rocketbooking.event_remove')
            ,text: _('rocketbooking.event_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/event/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) {this.refresh();},scope:this}
            }
        });
    }

    ,_renderPublished: function(value, p, record) {
        return (value == 1) ? 'Yes' : 'No';
    }
});
Ext.reg('rocketbooking-grid-event',RocketBooking.grid.Event);


RocketBooking.window.CreateEvent = function(config) {
    config = config || {};
    this.ident = config.ident || 'mecset'+Ext.id();
    Ext.applyIf(config,{
        title: _('rocketbooking.event_create')
        ,id: this.ident
        ,autoHeight: true
        ,width: 475
        ,modal: true
        ,url: RocketBooking.config.connectorUrl
        ,action: 'mgr/event/create'
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textarea'
            ,fieldLabel: _('description')
            ,name: 'description'
            ,anchor: '100%'
        },{
            xtype: 'numberfield'
            ,fieldLabel: 'Price'
            ,name: 'price'
            ,anchor: '100%'
        }]
    });
    RocketBooking.window.CreateEvent.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.window.CreateEvent,MODx.Window);
Ext.reg('rocketbooking-window-event-create',RocketBooking.window.CreateEvent);

RocketBooking.window.UpdateEvent = function(config) {
    config = config || {};
    this.ident = config.ident || 'meuset'+Ext.id();
    Ext.applyIf(config,{
        title: _('rocketbooking.event_update')
        ,id: this.ident
        ,autoHeight: true
        ,width: 475
        ,modal: true
        ,url: RocketBooking.config.connectorUrl
        ,action: 'mgr/event/update'
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textarea'
            ,fieldLabel: _('description')
            ,name: 'description'
            ,anchor: '100%'
        },{
            xtype: 'numberfield'
            ,fieldLabel: 'Price'
            ,name: 'price'
            ,anchor: '100%'
        }]
    });
    RocketBooking.window.UpdateEvent.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.window.UpdateEvent,MODx.Window);
Ext.reg('rocketbooking-window-event-update',RocketBooking.window.UpdateEvent);


RocketBooking.combo.Type = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['type','label']
            ,data: [
                ['Normal','Normal'],
                ['Handicap','Handicap'],
                ['VIP','VIP']
            ]
        })
        ,mode: 'local'
        ,displayField: 'label'
        ,valueField: 'type'
    });
    RocketBooking.combo.Type.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.combo.Type,MODx.combo.ComboBox);
Ext.reg('rocketbooking-combo-type',RocketBooking.combo.Type);
