var MOMDA002 = {
	init: function() {
		this.event();
	}, event: function() {
		$(document).on("click", "#createBtn", function() {
			micaCommon.upload({after:function(data) {
				var ajaxDataSize = 0;
				var fileDataSize = 0;
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i].data;
					if(dataI.indexOf("fileName") > -1) {
						var size = dataI.substr(dataI.lastIndexOf(" ") + 1, 15);
						size = Number(size);
						if(!isNaN(size)) {
							fileDataSize += size;
						}
					} else if(dataI.indexOf(".do") > -1 && dataI.indexOf("checkSession.do") < 0) {
						var size = dataI.substr(dataI.lastIndexOf(" ") + 1, 15);
						size = Number(size);
						if(!isNaN(size)) {
							ajaxDataSize += size;
						}
					} 
					
				}
				console.log("ajaxDataSize : " + ajaxDataSize);
				console.log("fileDataSize : " + fileDataSize);
			}});
		});
	}
};
$(document).ready(function(event){
	MOMDA002.init();
});