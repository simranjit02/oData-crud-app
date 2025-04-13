sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("odatacrud.controller.View1", {
      onInit() {
        this.onReadAll();
        var oViewModel = new sap.ui.model.json.JSONModel({
            isLoading: false
          });
          this.getView().setModel(oViewModel, "viewModel");
      },
      onReadAll: function () {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/Products", {
          success: function (odata) {
            var jModel = new sap.ui.model.json.JSONModel(odata);
            that.getView().byId("idProjects").setModel(jModel);
          },
          error: function (oError) {
            console.log("oError -> ", oError);
          },
        });
      },
      onFilterRead: function () {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        var oFilter = new sap.ui.model.Filter("Rating", "EQ", "3");
        oModel.read("/Products", {
          filters: [oFilter],
          success: function (odata) {
            var jModel = new sap.ui.model.json.JSONModel(odata);
            that.getView().byId("idProjects").setModel(jModel);
          },
          error: function (oError) {
            console.log("oError -> ", oError);
          },
        });
      },
      onSorterRead: function () {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        var oSorter = new sap.ui.model.Sorter("Price", false);
        oModel.read("/Products", {
          sorters: [oSorter],
          success: function (odata) {
            var jModel = new sap.ui.model.json.JSONModel(odata);
            that.getView().byId("idProjects").setModel(jModel);
          },
          error: function (oError) {
            console.log("oError -> ", oError);
          },
        });
      },
      onParametersRead: function () {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/Products", {
          urlParameters: { $skip: 2, $top: 4 },
          success: function (odata) {
            var jModel = new sap.ui.model.json.JSONModel(odata);
            that.getView().byId("idProjects").setModel(jModel);
          },
          error: function (oError) {
            console.log("oError -> ", oError);
          },
        });
      },
      onReadKey: function () {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/Products(2)", {
          success: function (odata) {
            console.log("odata", odata);
            var jModel = new sap.ui.model.json.JSONModel({ results: [odata] });
            that.getView().byId("idProjects").setModel(jModel);
          },
          error: function (oError) {
            console.log("oError -> ", oError);
          },
        });
      },
      onEdit: function (oEvent) {
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        oModel.setUseBatch(false);
        if (oEvent.getSource().getText() === "Edit") {
          oEvent.getSource().setText("Submit");
          oEvent
            .getSource()
            .getParent()
            .getParent()
            .getCells()[3]
            .setEditable(true);
        } else {
          oEvent.getSource().setText("Edit");
          that.getView().getModel("viewModel").setProperty("/isLoading", true);
          oEvent
            .getSource()
            .getParent()
            .getParent()
            .getCells()[3]
            .setEditable(false);
          var oInput = oEvent
            .getSource()
            .getParent()
            .getParent()
            .getCells()[3]
            .getValue();
          var oID = oEvent.getSource().getBindingContext().getProperty("ID");
          oModel.update(
            "/Products(" + oID + ")",
            { Rating: oInput },
            {
              success: function () {
                MessageToast.show("Data update successfully", {
                  duration: 2000,
                });
                that.getView().getModel("viewModel").setProperty("/isLoading", false);
                that.onReadAll();
              },
              error: function (oError) {
                console.log("oError -> ", oError);
              },
            }
          );
        }
      },
      onDuplicate:function(oEvent){
        var that = this;
        that.getView().getModel("viewModel").setProperty("/isLoading", true);
        var oModel = this.getOwnerComponent().getModel();
        oModel.setUseBatch(false);
        var oDuplicateData=oEvent.getSource().getBindingContext().getObject();
        oDuplicateData.ID= 100+oDuplicateData.ID
        oModel.create("/Products",oDuplicateData,{
            success: function () {
              MessageToast.show("New Data Added Successfully", {
                duration: 2000,
              });
              that.getView().getModel("viewModel").setProperty("/isLoading", false);
              that.onReadAll();
            },
            error: function (oError) {
              console.log("oError -> ", oError);
            },
          })

      },
      onDelete:function(oEvent){
        var that = this;
        that.getView().getModel("viewModel").setProperty("/isLoading", true);
        var oModel = this.getOwnerComponent().getModel();
        oModel.setUseBatch(false);
        var oID = oEvent.getSource().getBindingContext().getProperty("ID");
        oModel.remove("/Products("+oID+")",{
            success: function () {
              MessageToast.show("Record Deleted Successfully", {
                duration: 2000,
              });
              that.getView().getModel("viewModel").setProperty("/isLoading", false);
              that.onReadAll();
            },
            error: function (oError) {
              console.log("oError -> ", oError);
            },
          })

      }
    });
  }
);
