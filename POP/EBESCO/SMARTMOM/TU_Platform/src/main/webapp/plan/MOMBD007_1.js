/*planId가 Object로 넘어오는 Error가 해결된다면, 정상적으로 작동할 것 2019.08.09 YHS
 * 
 */
var MOMBD007_1 = {
	init: function() {
		var that = this;
        Language.init(function() {
        	setTimeout(that.event, 0);
        });
	}, event: function() {
		$(document).on('change', '#planId', function() {
			momWidget.setPlanIdDate();
		});		
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMBD007_1', MOMBD007_1);
       MOMBD007_1.init();
});

