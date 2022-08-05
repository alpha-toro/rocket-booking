RocketBooking.grid.Seats = function(config) {
    config = config || {};

    this.exp = new Ext.grid.RowExpander({});

    Ext.applyIf(config,{
        id: 'rocketbooking-grid-seats'
        ,url: RocketBooking.config.connectorUrl
        ,baseParams: {
            action: 'mgr/seat/getlist'
            ,table: config.tableid
        }
        ,fields: ['id', 'title', 'desc', 'table', 'rank', 'published', 'actions']
        ,paging: true
        ,ddGroup: 'mygridDD'
        ,enableDragDrop: true
        ,remoteSort: false
        ,cls: 'gallery-grid'
        ,bodyCssClass: 'grid-with-buttons'
        ,autosave: true
        ,preventRender: true
        ,autoExpandColumn: 'title'
        //,plugins: [this.exp]
        ,viewConfig: {
            forceFit:true
            ,enableRowBody:true
            ,showPreview:true
            //,getRowClass: this.applyRowClass
            ,scrollOffset: 0
        }
        ,sortInfo: {
            field: 'rank'
            ,direction: 'ASC'
        }
        ,columns: [
          //this.exp,
          {
            header: _('rocketbooking.title')
            ,dataIndex: 'title'
          },
          {
            header: _('rocketbooking.desc')
            ,dataIndex: 'desc'
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
                            rows = sm.getSelections();

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
        ,tbar: [
            {
                text: _('rocketbooking.seat_create')
                ,handler: this.createSeat
                ,scope: this
            }
            ,{
                xtype: 'textfield'
                ,id: 'rocketbooking-tf-search'
                ,emptyText: _('search')+'...'
                ,listeners: {
                    'change': {fn: this.search, scope: this}
                    ,'render': {fn: function(cmp) {
                        new Ext.KeyMap(cmp.getEl(), {
                            key: Ext.EventObject.ENTER
                            ,fn: function() {
                                this.fireEvent('change',this);
                                this.blur();
                                return true;
                            }
                            ,scope: cmp
                        });
                    },scope:this}
                }
            }
            ,'-'
            ,{
                xtype: 'button'
                ,id: 'modx-filter-clear'
                ,text: _('filter_clear')
                ,listeners: {
                    'click': {fn: this.clearFilter, scope: this}
                }
            }
        ]
    });
    RocketBooking.grid.Seats.superclass.constructor.call(this,config);
    this._makeTemplate();
    this.addEvents('sort');
    this.on('sort',this.onSort,this);
    this.on('click', this.handleButtons, this);
};
Ext.extend(RocketBooking.grid.Seats,MODx.grid.Grid,{
    windows: {}

    ,onSort: function(o) {
        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/seat/sort'
                ,table: this.config.tableid
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

    ,_makeTemplate: function() {

    }

    ,applyRowClass: function(record, rowIndex, p, ds) {
        if (this.grid.viewConfig.showPreview) {
            var xf = Ext.util.Format;
            p.body = '<p>PREVIEW</p>';
            return 'x-grid3-row-expanded';
        }
        return 'x-grid3-row-collapsed';
    }

    ,clearFilter: function() {
        var s = this.getStore();
        s.baseParams.query = '';
        Ext.getCmp('rocketbooking-tf-search').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }

    ,search: function(tf,newValue,oldValue) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }

    ,getMenu: function() {
        var record = this.menu.record;
        var m = [];
        m.push({
            text: _('rocketbooking.seat_update')
            ,handler: this.updateSeat
        });

        if (record.published) {
            m.push({
                text: _('rocketbooking.unpublish')
                ,handler: this.unpublishSeat
            });

        } else {
            m.push({
                text: _('rocketbooking.publish')
                ,handler: this.publishSeat
            });
        }

        m.push('-');
        m.push({
            text: _('rocketbooking.seat_remove')
            ,handler: this.removeSeat
        });
        this.addContextMenuItem(m);
    }

    ,createSeat: function(btn,e) {
        if (!this.config || !this.config.tableid) return false;
        var s = this.config.tableid;

        this.windows.createSeat = MODx.load({
            xtype: 'rocketbooking-window-seat-create'
            ,table: s
            ,listeners: {
                'success': {fn:function() {this.refresh();},scope:this}
            }
        });
        this.windows.createSeat.show(e.target);
    }

    ,updateSeat: function(btn,e) {
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        this.windows.updateSeat = MODx.load({
            xtype: 'rocketbooking-window-seat-update'
            ,record: r
            ,listeners: {
                'success': {fn:function() {this.refresh();},scope:this}
            }
        });
        this.windows.updateSeat.fp.getForm().setValues(r);
        this.windows.updateSeat.show(e.target);
    }

    ,removeSeat: function(btn,e) {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: _('rocketbooking.seat_remove')
            ,text: _('rocketbooking.seat_remove_confirm')
            ,url: RocketBooking.config.connectorUrl
            ,params: {
                action: 'mgr/seat/remove'
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

    ,publishSeat: function() {
        MODx.Ajax.request({
            url: RocketBooking.config.connectorUrl
            ,params: {
                action: 'mgr/seat/publish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn: this.refresh, scope: this}
            }
        });
        return true;

    }

    ,unpublishSeat: function(record) {
        MODx.Ajax.request({
            url: RocketBooking.config.connectorUrl
            ,params: {
                action: 'mgr/seat/unpublish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn: this.refresh, scope: this}
            }
        });
        return true;
    }

    ,handleButtons: function(e) {
        var target  = e.getTarget();
        var element = target.className.split(' ')[0];
        if (element == 'controlBtn') {
            var action       = target.className.split(' ')[1];
            var record       = this.getSelectionModel().getSelected().data;
            this.menu.record = record;
            switch (action) {
                case 'edit':
                    this.updateSeat(null, e);
                    break;
                case 'publish':
                    this.publishSeat();
                    break;
                case 'unpublish':
                    this.unpublishSeat();
                    break;
                case 'delete':
                    this.removeSeat();
                    break;
                default:
                    break;
            }
        }
    }
});
Ext.reg('rocketbooking-grid-seats',RocketBooking.grid.Seats);


RocketBooking.window.CreateSeat = function(config) {
    config = config || {};
    this.ident = config.ident || 'mecitem'+Ext.id();
    Ext.applyIf(config,{
        title: _('rocketbooking.seat_create')
        ,id: this.ident
        ,autoHeight: true
        ,width: 650
        ,modal: true
        ,url: RocketBooking.config.connectorUrl
        ,closeAction: 'close'
        ,baseParams: {
            action: 'mgr/seat/create'
            ,table: config.table
        }
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('rocketbooking.title')
            ,name: 'title'
            ,allowBlank: false
            ,id: 'rocketbooking-'+this.ident+'-title'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,allowBlank: true
            ,fieldLabel: _('rocketbooking.desc')
            ,name: 'desc'
            ,id: 'rocketbooking-'+this.ident+'-desc'
            ,anchor: '100%'
        }],
        keys: [] //Prevent enter key from submitting the form
    });
    RocketBooking.window.CreateSeat.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.window.CreateSeat,MODx.Window);
Ext.reg('rocketbooking-window-seat-create',RocketBooking.window.CreateSeat);


RocketBooking.window.UpdateSeat = function(config) {
    config = config || {};
    this.ident = config.ident || 'meuitem'+Ext.id();
    Ext.applyIf(config,{
        title: _('rocketbooking.seat_update')
        ,id: this.ident
        ,autoHeight: true
        ,width: 650
        ,modal: true
        ,url: RocketBooking.config.connectorUrl
        ,action: 'mgr/seat/update'
        ,closeAction: 'close'
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
            ,id: 'rocketbooking-'+this.ident+'-id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('rocketbooking.title')
            ,name: 'title'
            ,id: 'rocketbooking-'+this.ident+'-title'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('rocketbooking.desc')
            ,name: 'desc'
            ,id: 'rocketbooking-'+this.ident+'-desc'
            ,anchor: '100%'
        }],
        keys: [] //Prevent enter key from submitting the form
    });
    RocketBooking.window.UpdateSeat.superclass.constructor.call(this,config);
};
Ext.extend(RocketBooking.window.UpdateSeat,MODx.Window);
Ext.reg('rocketbooking-window-seat-update',RocketBooking.window.UpdateSeat);
