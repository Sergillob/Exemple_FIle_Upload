sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("uploadExemple_File_Upload.controller.File", {

		onInit: function() {
			var oUploadCollection = this.getView().byId('UploadCollection');
			oUploadCollection.setUploadUrl("/sap/opu/odata/sap/ZSERGI_ATTACHMENTS_SRV/FileSet");
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSERGI_ATTACHMENTS_SRV", false);
			this.getView().setModel(oModel);
		},

		onBeforeUploadStarts: function(oEvent) {

			var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
				name: "slug",
				value: oEvent.getParameter("fileName")
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);

			var oModel = this.getView().getModel();

			oModel.refreshSecurityToken();

			var oHeaders = oModel.oHeaders;

			var sToken = oHeaders['x-csrf-token'];

			var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({

				name: "x-csrf-token",

				value: sToken

			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderToken);

		},

		onUploadComplete: function(oEvent) {
			this.getView().getModel().refresh();
		}
	});
});