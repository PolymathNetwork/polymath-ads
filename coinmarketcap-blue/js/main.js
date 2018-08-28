
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

jQuery(document).ready(function(){
	Modernizr.on('videoautoplay', function(result) {
	  if (result) {
		// supported
	  } else {
		// not-supported
		TweenMax.set(".video_block",{className:"+=no_video"})
	  }
	});
})


var pcIniDate = new Date();
var offset = pcIniDate.getTimezoneOffset()*60*1000;
//var NYCtimeoffset = -400*60*1000;



var new_NYCtimeoffset = -(5*60)*60*1000; //(5 hours); 
//NYCtimeoffset is defined on the HTML to give an easy way to overwrite the countdown offset.
if(typeof(NYCtimeoffset) != "undefined" && NYCtimeoffset != ""){
	new_NYCtimeoffset = NYCtimeoffset;
}
//Coordinated with GMT Universal, which is 4 hours ahead NYC, so 15h GMT is 11am NYC
//this will be de fallback countdown date in case is not defined on the HTML:
new_countDownDate = "January 30, 2018 15:00:00"; 
//countDownDate is defined on the HTML to give an easy way to overwrite the countdown date.
if(typeof(countDownDate) != "undefined" && countDownDate != ""){
	new_countDownDate = countDownDate;
}
var countdownEndDate = new Date(new_countDownDate);
countdownEndDate.setTime(countdownEndDate.getTime() - offset - new_NYCtimeoffset);
var countdownEndDate_time = countdownEndDate.getTime();

//console.log(countdownEndDate_time)
var countdown_internval;

jQuery(document).ready(function(){
	// Update the count down every 1 second
	printDateCountdown()
	countdown_internval = setInterval(printDateCountdown, 1000);
})
function printDateCountdown(){

		
	  // Get todays date and time
	  var now = new Date();
	  now = now.getTime();

	  // Find the distance between now an the count down date
	  var distance = countdownEndDate_time - now;
	
	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  // Display the result in the element with id="demo"
	  
		if (distance >= 1000) {
			printDateValue(jQuery("#top_value_days"), days)
			printDateValue(jQuery("#top_value_hours"), hours)
			printDateValue(jQuery("#top_value_mins"), minutes)
			printDateValue(jQuery("#top_value_secs"), seconds)
		}

		if(days == 0){
			jQuery(".top_countdown").addClass("less_than_a_day");
		}else{
			jQuery(".top_countdown").removeClass("less_than_a_day");
		}
	  // If the count down is finished, write some text
	  if (distance < 1000) {
		//clearInterval(countdown_internval);
		jQuery(".top_countdown").addClass("less_than_a_day");
		jQuery("#top_value_days").html("00");
		jQuery("#top_value_hours").html("00");
		jQuery("#top_value_mins").html("00");
		jQuery("#top_value_secs").html("00");
		jQuery(".top_countdown").addClass("finished");
		jQuery(".banner_holder_block").addClass("timeout_finished");
		/*
		waitBeforeRepeatEvent(function(){
			setBonusValue()
		}, 5000, "setBonusValue");
		*/
	  }else{
		  jQuery(".top_countdown").removeClass("finished");
		  jQuery(".banner_holder_block").removeClass("timeout_finished");
	  }
	
}

function printDateValue(_target, _value){
	current_value = _target.attr("current_val");
	if(current_value != _value && typeof _value == 'number' && _value > -1){
		_target.attr("current_val", _value);
		if(parseInt(_value) < 10) _value = "0"+_value
		_target.html(_value)
		TweenMax.killTweensOf(_target);
		TweenMax.set(_target,{scale:.7 });
		TweenMax.to(_target,.5,{scale:1,  ease:Power3.easeOut});
	}else if(typeof _value != 'number' && _value < 0){
		_target.html("0")
	}
}




var tl_logo_home = new TimelineMax()
function setUpLogoAnimation(){
	var logo_home = jQuery(".brand_logo")
	var char_logo = logo_home.find(".char_logo")


	

	var logo_icon = jQuery(".logo_icon")
	var countdown = jQuery(".top_countdown")
	var countdown_dateitems = countdown.find(".top_countdown_date_item,.top_countdown_date_item_dots,.time_ended_message,.launch_in")
	TweenMax.set(countdown,{perspective:600})
	TweenMax.set(countdown_dateitems,{transformOrigin:"50% 50% 30"})
	
	TweenMax.set(char_logo,{transformOrigin:"50% 50%"})
	
	var bull = jQuery(".brand_icon")
	var bullbg = jQuery(".brand_icon svg .piecebackground")
	var polygons = jQuery(".brand_icon svg .piece")
	TweenMax.set(polygons,{transformOrigin:"50% 50%"})
		
	
	
	
		tl_logo_home = new TimelineMax({
			onComplete:function(){
				setUpLogoAnimation()
				//tl_logo_home.play(0)
			}	
		
		});
			
	
	TweenMax.set(bullbg,{autoAlpha:0})

		tl_logo_home
				.set(char_logo,{scale:0})
				.set(countdown_dateitems,{autoAlpha:0,rotationX:90})
				.set(bullbg,{autoAlpha:0})
				.set(polygons,{scale:0, rotation:180})
				.set(bull,{position:"relative"})
				.set(bull,{left:-100, autoAlpha:0,scale:.6, rotation:-30, transformOrigin:"50% 80%"})
				
				.set(logo_home,{autoAlpha:0})
				

				.set(countdown_dateitems,{autoAlpha:0,rotationX:-90,rotationY:30})
				
				
				
				.staggerTo(polygons,1,{scale:1, rotation:0, ease:Power3.easeOut},.02)
				
				.to(bullbg,.5,{autoAlpha:1})
				
				.to(bull,1.2,{left:0,scale:1,autoAlpha:1, rotation:0, ease:Power2.easeOut},"=-2.5" )
				
				
				
				.to(logo_home,.5,{autoAlpha:1},"=-.8")
				.staggerTo(char_logo,.5,{scale:1, ease:Power3.easeOut}, .03,"=-.5")
				
				
				.staggerTo(char_logo,.3,{delay:2,scale:0, ease:Power3.easeInOut}, .03)
				
				
				.to(logo_home,.5,{autoAlpha:0, ease:Power3.easeOut})
				if(!jQuery(".banner_holder_block").hasClass("timeout_finished")){
				
				tl_logo_home.staggerTo(countdown_dateitems,.5,{autoAlpha:1,rotationX:0,rotationY:0, ease:Back.easeOut},.05, "=-.4")
							.set(countdown_dateitems,{delay:3,clearProps:"opacity"})
							.staggerTo(countdown_dateitems,.5,{autoAlpha:0,rotationX:90, ease:Power3.easeInOut},.05)
				
				
				}
				

				
				
				
				tl_logo_home.to(bullbg,.3,{autoAlpha:0},"=-.3")
				.staggerTo(polygons,.5,{scale:0, rotation:180, ease:Power3.easeIn},.01,"=-.6")
				.to(bull,1,{left:100,scale:1,autoAlpha:0, ease:Power3.easeInOut},"=-1" )
	
}


var tl_messages = new TimelineMax()
function setUpMessageAnimation(){

	TweenMax.set(".center_message",{autoAlpha:0,rotationX:-90,transformOrigin:"50% 50% 30"})
	transitionToNextMessage()
}

function transitionToNextMessage(){
	
	var prev_message = jQuery(".center_message.current")
	if(prev_message.length == 0){
		prev_message = jQuery(".center_message").eq(jQuery(".center_message").length-1);
	}
	
	var new_message = prev_message.next();
	if(new_message.length == 0){
		new_message = jQuery(".center_message").eq(0);
	}
	jQuery(".center_message.current").removeClass("current")
	new_message.addClass("current")
	


	TweenMax.set(prev_message,{autoAlpha:1,rotationX:0})
	TweenMax.to(prev_message,.5,{autoAlpha:0,rotationX:90, ease:Power3.easeInOut})
	
	TweenMax.set(new_message,{autoAlpha:0,rotationX:-90})
	TweenMax.to(new_message,.8,{autoAlpha:1,rotationX:0, ease:Back.easeOut, onComplete:redoTransitionMessage})
		
		

}
function redoTransitionMessage(){
		waitForFinalEvent(function(){
			transitionToNextMessage()
		}, 1800, "transitionToNextMessage");
}
jQuery(document).ready(function(){
	setUpLogoAnimation()
	setUpMessageAnimation()
	jQuery(".triangle_poly").each(function(){
		TweenMax.set(jQuery(this), {transformOrigin:"center center"})
		animateTrianglePoly(jQuery(this))
	})
})

function animateTrianglePoly(what_poly){
	TweenMax.set(what_poly, {left:Math.random()*100+"%", rotation:Math.random()*360, top:90+Math.random()*30, scale:Math.random()*.5+.5, opacity:Math.random()*.3+.3})
	TweenMax.to(what_poly, 3+Math.random()*6, { rotation:Math.random()*360, top:-what_poly.height()-Math.random()*30, onComplete:animateTrianglePoly, onCompleteParams:[what_poly], ease:Linear.easeNone})
}