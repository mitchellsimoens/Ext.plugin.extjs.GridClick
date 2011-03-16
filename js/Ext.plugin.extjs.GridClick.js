//Spec - http://www.w3.org/TR/FileAPI/

Ext.define("Ext.plugin.extjs.GridClick", {
	extend   : "Ext.AbstractPlugin",
	alias    : "plugin.gridclick",

	click: true,
	containerclick: true,
	dblclick: true,

	init : function(cmp) {
		var me = this;

		cmp.addEvents({
			rowdblclick : true,
			rowclick    : true
		});

		cmp.on("afterlayout", me.onGridAfterLayout, me, {single: true});
	},

	onGridAfterLayout: function() {
		var me   = this,
			grid = me.getCmp(),
			view;

		if (!grid.hasView) {
			me.getCmp().on("afterlayout", me.onGridAfterLayout, me, {single: true});
		} else {
			view = grid.down("gridview");

			if (me.click) {          view.on("click", me.onClick, me);                   }
			if (me.containerclick) { view.on("containerclick", me.onContainerClick, me); }
			if (me.dblclick) {       view.on("dblclick", me.onDblClick, me);             }
		}
	},

	onClick: function(view, index, node, e) {
		var me    = this,
			grid  = me.getCmp();

		grid.fireEvent("rowclick", grid, index, e);
	},

	onContainerClick: function(view, e) {
		var me    = this,
			grid  = me.getCmp();

		grid.fireEvent("containerclick", grid, e);
	},

	onDblClick: function(view, index, node, e) {
		var me    = this,
			grid  = me.getCmp();

		grid.fireEvent("rowdblclick", grid, index, e);
	}
});