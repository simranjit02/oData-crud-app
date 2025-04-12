sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("odatacrud.controller.View1", {
        onInit() {
            this.onFilterRead()
        },
        onReadAll:function(){
            var that = this;
            var oModel= this.getOwnerComponent().getModel()
            oModel.read("/Products",{
                success:function(odata){
                    console.log("odata -> ",odata)
                  var jModel= new sap.ui.model.json.JSONModel(odata)
                  that.getView().byId("idProjects").setModel(jModel)
                }, error:function(oError){
                    console.log("oError -> ",oError)
                }
            })
        },
        onFilterRead:function(){
            var that = this;
            var oModel= this.getOwnerComponent().getModel()
            var oFilter= new sap.ui.model.Filter("Rating","EQ","3")
            oModel.read("/Products",{filters:[oFilter],
                success:function(odata){
                    console.log("odata -> ",odata)
                  var jModel= new sap.ui.model.json.JSONModel(odata)
                  that.getView().byId("idProjects").setModel(jModel)
                }, error:function(oError){
                    console.log("oError -> ",oError)
                }
            })
        }
    });
});