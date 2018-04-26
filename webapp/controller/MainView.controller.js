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
			var myPath = sPath + "/ToOperations";

			var oTemplate = new sap.m.ColumnListItem({
					type: sap.m.ListType.Inactive,
					cells: [
						new sap.m.ObjectIdentifier({title:"{Description}", text: "{Activity}"}),
						new sap.m.Label({text: "{WorkCntr}"})
					]
				});
				//var oTemplate = operationsTable.getBindingInfo("items").template;
			//operationsTable.bindItems({path: myPath });
			operationsTable.bindAggregation("items", myPath, oTemplate);

			//operationsTable.bindElement(sPath + "/ToOperations");
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