sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller) {
	"use strict";

	return Controller.extend("com.gv.s4equi.S4Equipment.controller.MainView", {
		onInit: function() {

		},

		onRowClicked: function(oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContext().sPath;

			var app = this.byId("idAppControl");
			var page = this.byId("DetailsPage");
			app.to(page);
			var header = this.byId("detailsHeader");
			header.bindElement(sPath + "/ToEqui");
			debugger;
			var orderToolbar = this.byId("orderToolbar");
			orderToolbar.bindElement(sPath + "/ToOrder");
			var operationsTable = this.byId("operationsTab");
			operationsTable.bindElement(sPath + "/ToOrder" + "/ToOperation");
			//header.setBindingContext(new sap.ui.model.Context(oModel, "/BapiNotifSet('10000143')/ToEqui"));
			//header.setTitle("{path:'Qmnum'}");
		},

		onNavBack: function() {
			debugger;
			var app = this.byId("idAppControl");
			var page = this.byId("NotifPage");
			app.to(page, "fade");
		}
	});
});