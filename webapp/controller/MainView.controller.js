sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller) {
	"use strict";

	return Controller.extend("com.gv.s4equi.S4Equipment.controller.MainView", {
		onInit: function() {
			
		},
		
		onTest: function(evt) {
			sap.m.MessageToast.show("Debugger");
		},
		
		dateFormatter: function(value) {
			return "Perchè mai dovrebbe funzionare così?";
		}
	});
});