sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("odatacrud.controller.View1", {
        onInit() {
            this.onParametersRead()
        },
        onReadAll:function(){
            var that = this;
            var oModel= this.getOwnerComponent().getModel()
            oModel.read("/Products",{
                success:function(odata){
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
                  var jModel= new sap.ui.model.json.JSONModel(odata)
                  that.getView().byId("idProjects").setModel(jModel)
                }, error:function(oError){
                    console.log("oError -> ",oError)
                }
            })
        },
        onSorterRead:function(){
            var that = this;
            var oModel= this.getOwnerComponent().getModel()
            var oSorter= new sap.ui.model.Sorter("Price",false)
            oModel.read("/Products",{sorters:[oSorter],
                success:function(odata){
                  var jModel= new sap.ui.model.json.JSONModel(odata)
                  that.getView().byId("idProjects").setModel(jModel)
                }, error:function(oError){
                    console.log("oError -> ",oError)
                }
            })
        },
        onParametersRead:function(){
            var that = this;
            var oModel= this.getOwnerComponent().getModel()
            oModel.read("/Products",{urlParameters:{$skip:2,$top:4},
                success:function(odata){
                  var jModel= new sap.ui.model.json.JSONModel(odata)
                  that.getView().byId("idProjects").setModel(jModel)
                }, error:function(oError){
                    console.log("oError -> ",oError)
                }
            })
        }
    });
});