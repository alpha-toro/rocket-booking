RocketBooking.grid.Table = function(config) {
    config = config || {};
    var gridView = new Ext.grid.GridView({
        forceFit: true
        ,scrollOffset: 0
        ,getRowClass : function (row, index) {
            var cls = '';
            var data = row.data;

            if (data.published == 0) {
                cls = 'rocketbooking-grid-table-unpublished'; // Faded color
            }

            return cls;
        }
    });  //end gridView

    Ext.applyIf(config,{
        id: 'rocketbooking-grid-table'
        ,url: RocketBooking.config.connectorUrl
        ,baseParams: {
          action: 'mgr/table/getlist',
          event: config.eventid
        }
        ,fields: ['id','name','description','rank','price','published','type']
        ,autoHeight: true
        ,paging: true
        ,ddGroup: 'mygridDD'
        ,enableDragDrop: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/table/updatefromgrid'
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
                header: 'Type'
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
            text: _('rocketbooking.table_create')
            ,handler: this.createTable
            ,scope: this
        }]
    });
    RocketBooking.grid.Table.superclass.constructor.call(this,config);
    this.addEvents('sort');
    this.on('sort',this.onSort,this);
};
Ext.extend(RocketBooking.grid.Table,MODx.grid.Grid,{
    windows: {}

    ,onSort: function(o) {
        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/table/sort'
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
            text: _('rocketbooking.table_manage')
            ,handler: this.manageTable
        });
        m.push({
            text: _('rocketbooking.table_update')
            ,handler: this.updateTable
        });

        if (record.published) {
            m.push({
                text: _('rocketbooking.unpublish')
                ,handler: this.unpublishTable
            });
        } else {
            m.push({
                text: _('rocketbooking.publish')
                ,handler: this.publishTable
            });
        }

        m.push('-');
        m.push({
            text: _('rocketbooking.table_remove')
            ,handler: this.removeTable
        });
        this.addContextMenuItem(m);
    }

    ,manageTable: function() {
        var redir = '?a=table&namespace='+MODx.request.namespace+'&tableid=';

        // needed for double click
        if (typeof(this.menu.record) == "undefined") {
            redir += this.getSelectedAsList();
        } else {
            redir += this.menu.record.id+'&tablename='+this.menu.record.name;
        }
        MODx.loadPage(redir);
    }

    ,createTable: function(btn,e) {
        if (!this.config || !this.config.eventid) return false;
        var s = this.config.eventid;

        this.windows.createTable = MODx.load({
            xtype: 'rocketbooking-window-table-create'
            ,event: s
            ,listeners: {
                'success': {fn:function() {this.refresh();},scope:this}
            }
        });
        this.windows.createTable.show(e.target);
    }

    ,updateTable: function(btn,e) {
        e.preventDefault();
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        if (!this.windows.updateTable) {
            this.windows.updateTable = MODx.load({
                xtype: 'rocketbooking-window-table-update'
                ,record: r
                ,listeners: {
                    'success': {fn:function() {this.refresh();},scope:this}
                }
            });
        }
        this.windows.updateTable.fp.getForm().reset();
        this.windows.updateTable.fp.getForm().setValues(r);
        this.windows.updateTable.show(e.target);
    }

    ,publishTable: function(btn, e) {
        if (!this.menu.record) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/table/publish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:function(r) {
                    this.refresh();
                }, scope:this}
            }
        });
    }

    ,unpublishTable: function(btn, e) {
        if (!this.menu.record) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/table/unpublish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:function(r) {
                    this.refresh();
                }, scope:this}
            }
        });
    }

    ,removeTable: function(btn,e) {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: _('rocketbooking.table_remove')
            ,text: _('rocketbooking.table_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/table/remove'
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
Ext.reg('rocketbooking-grid-table',RocketBooking.grid.Table);


RocketBooking.window.CreateTable = function(config) {
    config = config || {};
    this.ident = config.ident || 'mecset'+Ext.id();
    Ext.applyIf(config,{
        title: _('rocketbooking.table_create')
        ,id: this.ident
        ,autoHeight: true
        ,width: 475
        ,modal: true
        ,url: RocketBooking.config.connectorUrl
        ,baseParams: {
            action: 'mgr/table/create'
            ,event: config.event
        }
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
    RocketBooking.window.CreateTable.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.window.CreateTable,MODx.Window);
Ext.reg('rocketbooking-window-table-create',RocketBooking.window.CreateTable);

RocketBooking.window.UpdateTable = function(config) {
    config = config || {};
    this.ident = config.ident || 'meuset'+Ext.id();
    Ext.applyIf(config,{
        title: _('rocketbooking.table_update')
        ,id: this.ident
        ,autoHeight: true
        ,width: 475
        ,modal: true
        ,url: RocketBooking.config.connectorUrl
        ,action: 'mgr/table/update'
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
    RocketBooking.window.UpdateTable.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.window.UpdateTable,MODx.Window);
Ext.reg('rocketbooking-window-table-update',RocketBooking.window.UpdateTable);

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
