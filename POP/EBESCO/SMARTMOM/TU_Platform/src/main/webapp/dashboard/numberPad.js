var userName = sessionStorage.getItem("userName");
var search =  decodeURI(location.search.replace("?", ""));
var searchArr = search.split('/');
var numberPad = {
	currentPage : undefined,
	initMessage : undefined,
	initParam : undefined,
	excelParam : undefined,

	init : function() {

		var that = this;
		Language.init(function() {			
		});
		
		that.event();
		// this.design();
	},	
	event : function() {
		var that = this;
		var cnt = 0;

		
		// 화면 닫기
		$(document).on('click', '#closeBtn', function() {

			// momWidget.messageBox({type:'warning', width:'400', height: '145',
			// html:Language.lang['MESSAGES10685']});
			window.close();
		});
		// numbox
		$(document).on('click', '#numBox', function() {
			document.getElementById('numBox').innerHTML = '';
	        $('#keypad').fadeToggle('fast');
	        event.stopPropagation();

		});
		// btn
		$(document).on("click", ".btn", function() {
			   if(this.innerHTML == 'DEL'){
		            var numBox = document.getElementById('numBox');
		            if(numBox.innerHTML.length > 0){
		                numBox.innerHTML = numBox.innerHTML.substring(0, numBox.innerHTML.length - 1);
		            }
		        }
				else if(this.id == 'enter_key')
				{
					//$('#keypad').fadeToggle('fast');
					var savaText= $('#numbox').text();
					var param = '?' +'numberPad/'+ saveText;			
					window.open('complete.html'+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
				}
		        else if(this.id == 'delete_key')
				{
		            document.getElementById('numBox').innerHTML = '';
		        }
		        
		        event.stopPropagation();
		});
	
		// key
		$(document).on("click", ".key", function() {
			  var numBox = document.getElementById('numBox');
		        if(this.innerHTML == '0'){
		            if (numBox.innerHTML.length > 0)
		                numBox.innerHTML = numBox.innerHTML + this.innerHTML;
		        }
		        else
		            numBox.innerHTML = numBox.innerHTML + this.innerHTML;
		        
		        event.stopPropagation();
		});
		// dot
		$(document).on("click", ".Dotkey", function() {
			  var numBox = document.getElementById('numBox');
		        numBox.innerHTML = numBox.innerHTML + ".";	        
		        event.stopPropagation();
		});
	

	}, 
		
};

$(document).ready(function(event) {
	numberPad .init();
	 
});