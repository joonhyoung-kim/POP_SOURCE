var workingManual = {
	initMessage: undefined,
	initParam: undefined,
	monitorCd: undefined,
	html: undefined,
	userId: undefined,
	pauseTime: undefined,
	researchTime: undefined,
	compareItem: undefined,
	divisionCd : undefined,
	companyCd : undefined,
	
	init: function() {
		var that = this;
		that.userId = sessionStorage.getItem("userId");
		that.divisionCd = sessionStorage.getItem("divisionCd");
		that.companyCd = sessionStorage.getItem("companyCd");
		Language.init(function() {
			mom_ajax('R', 'common.comUser', {userId: that.userId}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				} else {
					that.monitorCd = data[0].code;
				}
				
			}, undefined, undefined, this, 'sync');
		});
		
		mom_ajax('R', 'common.comCode', {codeClassId: "PAUSE_TIME", codeId: "WP"}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) { 
				return;
			} else {
				that.pauseTime = data[0].value;
			}
			
		}, undefined, undefined, this, 'sync');
		
		mom_ajax('R', 'common.comCode', {codeClassId: "PAUSE_TIME", codeId: "WR"}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) { 
				return;
			} else {
				that.researchTime = data[0].value;
			}
			
		}, undefined, undefined, this, 'sync');
		
		that.checkResource();
		
	}, checkResource: function() {
		var that = this;
		var refreshTime = that.researchTime;
		if(that.researchTime == undefined || that.researchTime == null){
			refreshTime = 1000;
			close();
		}
		
		mom_ajax('R', 'reference.document.workingManual.checkWorkingManual', {divisionCd : that.divisionCd, companyCd : that.companyCd, resourceMonitorCd: that.monitorCd}, function(result, data) {
			if(data.length > 0) {
				if(data[0].attachType != null){
					if(that.compareItem == undefined || that.compareItem != data[0].itemId) {
						that.compareItem = data[0].itemId;
						that.searchData();
					}
				} else{
					$(".slideshow-container *").remove();
					that.compareItem = "";
					that.html = '<div class="slider" style="font-size:60px"> 진행중인 품목 : ' + data[0].itemId 
								+ '<br/><img src="../Images/workingManual.JPG" id="image1" /></div>'
					$(".slideshow-container").append(that.html);
				}
			} else {
				$(".slideshow-container *").remove();
				that.compareItem = "";
				that.html = '<div class="slider"><img src="../Images/preparing.JPG" id="image1" /></div>'
				$(".slideshow-container").append(that.html);
			}
		}, undefined, undefined, this, 'sync');
		
		setTimeout(function() {
			that.checkResource();
		}, refreshTime * 1000);
		
	}, searchData: function() {
		var that = this;
		var images = new Array();
		that.html = "";
		$(".slideshow-container *").remove();
		mom_ajax('R', 'reference.document.workingManual.workingManualFile', {divisionCd : that.divisionCd, companyCd : that.companyCd, resourceMonitorCd: that.monitorCd}, function(result, data) {
			if(data.length > 0) {
				for(var i=0; i<data.length; i++) {
					if(data[i].attachType != null && data[i].attachType.indexOf('video') == -1) {
						if(data[i].CONTENTS != undefined) {
							images[i] = "data:" + data[i].attachType + ";base64," + data[i].attach;
							that.html += '<div class="slider"><img class="slider-img" src="' + images[i] + '"' + ' id=' + '"' + 'image' + Number(i+1) + '"' + ' />' + '</div>'
						} 
					} 
				}
				$(".slideshow-container").append(that.html);
				that.showSlides(0);
			}
		}, undefined, undefined, this, 'sync');
		
	}, showSlides: function(slideIndex) {
		var that = this;
	    var slides = $(".slider");
	    for (var i = 0; i < slides.length; i++) {
	       slides[i].style.display = "none";  
	    }
	    slideIndex++;
	    if (slideIndex > slides.length) {slideIndex = 1}    
	    
	    if(slides.length > 0) {
	    	slides[slideIndex-1].style.display = "block";  
	    }
	    setTimeout(function() {
			that.showSlides(slideIndex);
		}, that.pauseTime * 1000);
	}
	
};

$(document).ready(function(event) {
	workingManual.init();
});