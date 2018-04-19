function initModel() {
	var sUrl = "/S4_HANA_ESPEDIA/sap/opu/odata/SAP/Z_GV_PM_NOTIF_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}