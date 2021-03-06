sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller) {
	"use strict";

	return Controller.extend("com.gv.s4equi.S4Equipment.controller.MainView", {
		onInit: function() {

		},
		_fragments: [],
		_getFragment: function(sName, oController) {
			debugger;
			var aViewName = this.getView().getViewName().split("."); // view.login.Login
			aViewName.pop();
			var sViewPath = aViewName.join(".") + "."; // view.login.
			if (!this._fragments[sName]) {
				if (oController && typeof oController === "string") {
					oController = sap.ui.controller(sViewPath + oController);
				} else {
					oController = this;
				}
				this._fragments[sName] = sap.ui.xmlfragment(
					sViewPath + sName,
					oController
				);
				// version >= 1.20.x
				this.getView().addDependent(this._fragments[sName]);
			}
			return this._fragments[sName];
		},

		onRowClicked: function(oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContext().sPath;

			var app = this.byId("idAppControl");
			var page = this.byId("DetailsPage");
			app.to(page);
			var header = this.byId("detailsHeader");
			header.bindElement(sPath + "/ToEqui");
			var orderToolbar = this.byId("orderToolbar");
			orderToolbar.bindElement(sPath + "/ToOrder");
			var operationsTable = this.byId("operationsTab");
			var myPath = sPath + "/ToOperations";

			var oTemplate = new sap.m.ColumnListItem({
				type: sap.m.ListType.Inactive,
				cells: [
					new sap.m.ObjectIdentifier({
						title: "{Description}",
						text: "{Activity}"
					}),
					new sap.m.Label({
						text: "{WorkCntr}"
					})
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
			var app = this.byId("idAppControl");
			var page = this.byId("NotifPage");
			app.to(page, "show");
		},

		onCreateNotif: function() {
			if (!this._creationFragment) {
				this._creationFragment = sap.ui.xmlfragment("com.gv.s4equi.S4Equipment.view.CreationDialog" , this);
			} 
			this._creationFragment.open();
		},

		dialogSave: function() {
			var description = sap.ui.getCore().byId("popupDescription").getValue();
			var equipment = sap.ui.getCore().byId("popupEqunr").getValue();
			sap.ui.getCore().byId("popupDescription").setValue("");
			sap.ui.getCore().byId("popupEqunr").setValue("");
			this._creationFragment.close();
			var oModel = this.getView().getModel();
			oModel.create("/BapiNotifSet", {
				"Notificat": "0",
				"Equipment": equipment,
				"Descript": description,
				"OrderNo": "0"
			}, {
				success: function(oData) {
					if (oData.hasOwnProperty("Notificat")) {
					sap.m.MessageToast.show("Successfully created notification: " + oData.Notificat);
					} else {
						sap.m.MessageToast.show("Success");
					}
				},
				error: function(err) {
					sap.m.MessageBox.alert("Error!");
				}
			});
		},

		dialogClose: function() {
			sap.ui.getCore().byId("popupDescription").setValue("");
			sap.ui.getCore().byId("popupEqunr").setValue("");
			this._creationFragment.close();
		}

	});
});