$(document).on('ready', function() {
	//START TIME
	var startTime = new Date().getTime();

	//CURRENT TIME
	var currentTime = function() {
		var time = new Date().getTime();
		return time;
	};
	
	//TIMER
	var timer = function() {
		return currentTime()-startTime;
	};
	
	//TIME BEFORE CLICKING SIGN-UP
	var signUpTime = -1;
	$(document).on('click','#sign-up',function() {
		signUpTime = timer();
	});
	
	//CURRENT SCROLL POSITION
	var currentScrollPosition = function() {
		var position = $(window).scrollTop();
		return position;
	};
	
	//DISTANCE SCROLLED AND PERCENT VIEWED
	var currentPercentScrolled = 0;
	var distanceScrolled = 0;
	var percentViewed = 0;
	var totalScrolled = function() {
		var currentPosition = currentScrollPosition();
		//TOTAL DISTANCE
		if (distanceScrolled < currentPosition) {
			distanceScrolled = currentPosition;
		}
		//PERCENT VIEWED
		currentPercentScrolled = 100 * currentPosition/($(document).height() - $(window).height());
		if (percentViewed < currentPercentScrolled) {
			percentViewed = currentPercentScrolled;
		}
	};
	$(document).scroll(totalScrolled);

	//SAVE TO METRICS FORM
	var updateMetrics = function() {
		$('#percent-viewed').text(percentViewed + '%');
		$('#scroll-position').text(currentScrollPosition() + 'px');
		$('#scroll-percent').text(currentPercentScrolled + '%');
		$('#total-scrolled').text(distanceScrolled + 'px');
		$('#time-on-page').text(timer()/1000 + ' seconds');
		if (signUpTime < 0) {
			$('#signup-time').text('Not Clicked');
		}
		else {
			$('#signup-time').text(signUpTime/1000 + ' seconds');
		}
	};

	//SHOW METRICS FORM AND UPDATE METRICS
	$('#stats').click(function() {
		$('#stat-box').css('display','block');
		setInterval(updateMetrics, 500);
	});
});