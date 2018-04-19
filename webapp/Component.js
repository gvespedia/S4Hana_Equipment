sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/gv/s4equi/S4Equipment/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.gv.s4equi.S4Equipment.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			var sServiceUrl = this.getMetadata().getManifestEntry("sap.app").dataSources["Z_GV_PM_NOTIF_SRV"].uri;
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
				json: true,
				loadMetadataAsync: true	
			});
			debugger;
			oModel.attachMetadataFailed(function() {
			this.getEventBus().publish("Component", "MetadataFailed");
			}, this);
			this.setModel(oModel);
			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});