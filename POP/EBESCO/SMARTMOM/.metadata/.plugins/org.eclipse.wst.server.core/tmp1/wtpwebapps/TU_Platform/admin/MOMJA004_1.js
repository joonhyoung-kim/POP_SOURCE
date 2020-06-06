var MOMJA004_1 = {   
      initMessage        : undefined,
      initParam          : undefined,
      groupDelMsg        : undefined,
      organizationCode   : undefined,
   
   init: function() {
      var that = this;
      Language.init(function() {
      });
      
   }, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
      index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
      if(index == 1) {
         this.initParam = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item;
      }
   }, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
      var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
      
      if(result != 'SUCCESS') {
         if(index == 1) {
            this.initParam = undefined;
         }
         
         momWidget.splashHide();
         return;
      }
      
      AUIGrid.setGridData(momWidget.grid[index], data);
      
      if(index == 0) {
         var that = this;
         var param = AUIGrid.getGridData(momWidget.grid[index])[0];
         momWidget.findBtnClicked(1, false, param, function(result, data) {
            if(result != 'SUCCESS') {
               momWidget.splashHide();
               return;
            }
            
            AUIGrid.setGridData(momWidget.grid[index+1], data);
            AUIGrid.setSelectionByIndex(momWidget.grid[index], 0);
            that.organizationCode = data[0]['organizationCode'];
         });
      } else {
         this.initParam = undefined;
      }
      
      momWidget.splashHide();
      
   }, createCallInit: function(index, param, callBackParam, indexInfo) {
      index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
      if(index == 1) {
         var that = this.init != undefined ? this : this.MOMJA004_1;
         this.initParam =  {organizationCode: this.organizationCode};
      }
   }, cellClickCallBack: function(index, e) {
      if(index == 0) {
         var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
         this.organizationCode = item['organizationCode'];
      }
   }, delCallInit: function(index, param, callBackParam, indexInfo) {
      var that = this;
      
      if (indexInfo != undefined && indexInfo['op'] == 'delMBtn1' && indexInfo['sequence'] == 1) {
			that.groupDelMsg = Language.lang['MESSAGES12456'];
      } 
   }
};

$(document).ready(function(event){
   momWidget.init(1, 'MOMJA004_1', MOMJA004_1);
   momWidget.init(2, 'MOMJA004_1', MOMJA004_1);
   MOMJA004_1.init();
});