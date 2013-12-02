
$b(document).ready(function () {
	var activeSlide, topNavArray = [], mapDomCmArray = [], activeOverlay, activeNavIndex, previousNavItem, nextNavItem;
	var SLIDE_SPEED=1000, isInitialSlidingRunning = true;
    var slideWidth = 742;

	// active slide is the one showing at the time.
    activeSlide="#splendid2013_page0";

    //
    splendid2013_buildTopNav();

	$b('#splendid2013_arrowLeft, #splendid2013_arrowRight').click(splendid2013_arrowsHandler);
	
	$b('#splendid2013_container').click(function(){
		$b('#splendid2013_container').unbind('click');
		isInitialSlidingRunning = false;
		//$b('#splendid2013_arrowLeft, #splendid2013_arrowRight').click(splendid2013_arrowsHandler);
	})
	
	$b('#splendid2013_pagination li').click(function(e){
		e.stopPropagation();
		if (isInitialSlidingRunning){
			isInitialSlidingRunning = false;
		}
		else {
			if (!$b('#splendid2013_arrowLeft').hasClass('selected')){
				$b('#splendid2013_arrowLeft').addClass('selected');
			}
			runGallery('#splendid2013_page' + this.id.substr(this.id.length-1), activeSlide, 'right');
		}
	})
	
	$b('#splendid2013_container img').not('area').click(function(e){
		e.stopPropagation();
		if (isInitialSlidingRunning){
			isInitialSlidingRunning = false;
		}
		else {
			$b('#splendid2013_arrowRight').click();
		}
	})
    var x = 0;
    function runAutoSlide(){
        x++;
        console.log(x);
        runGallery('#splendid2013_page' + (x + 1), '#splendid2013_page' + x, 'right');
        if(x > 4){
            window.clearInterval(autoSlider);
            splendid2013_runIntro('#splendid2013_page0', '#splendid2013_page5');
            isInitialSlidingRunning = false;
            x = 0;
        }
        //splendid2013_runIntro('#splendid2013_page1', '#splendid2013_page0');
    }
	var autoSlider = setInterval(runAutoSlide,SLIDE_SPEED);
/*	setTimeout(function(){splendid2013_runIntro('#splendid2013_page2', '#splendid2013_page1');},SLIDE_SPEED*2+200);
	setTimeout(function(){splendid2013_runIntro('#splendid2013_page3', '#splendid2013_page2');},SLIDE_SPEED*3+400);
	setTimeout(function(){splendid2013_runIntro('#splendid2013_page4', '#splendid2013_page3');},SLIDE_SPEED*4+600);
	setTimeout(function(){splendid2013_runIntro('#splendid2013_page0', '#splendid2013_page5');isInitialSlidingRunning = false;},SLIDE_SPEED*6+1000);
    */
	initCoremetrics();
	
	var splendid2013_fb_title=encodeURIComponent("Splendid Fall 2013 | bloomingdales.com");
    var splendid2013_fb_url=encodeURIComponent('http://www1.bloomingdales.com/shop/contemporary-apparel/splendid?id=23667');
    var splendid2013_fb_summary=encodeURIComponent("These fall favorites dish out mixed-media layers, must-have prints and plenty of downtown cool.");
    var splendid2013_facebookUrl = 'http://www.facebook.com/sharer.php?s=100&p[title]='+splendid2013_fb_title+'&p[summary]='+splendid2013_fb_summary+'&p[url]='+splendid2013_fb_url+'&p[images][0]='+fbImageUrl;
	
	var splendid2013_twitterUrl = 'http://twitter.com/intent/tweet?source=webclient&text=';
	var splendid2013_twitterTextParam = "Place your orders - Splendid's Fall 2013 looks dish out downtown cool. http://bit.ly/ ";
	var splendid2013_socTwitterLink = splendid2013_twitterUrl;
	splendid2013_socTwitterLink += encodeURIComponent(splendid2013_twitterTextParam).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");

	function splendid2013_runIntro(elemIdTo,elemIdFrom){
		if (isInitialSlidingRunning)
			runGallery(elemIdTo, elemIdFrom, 'right');
	}
	
	$b('#splendid2013_nav_fb').click(function(){
		window.open(splendid2013_facebookUrl);
	});
	
	$b('#splendid2013_nav_tw').click(function(){
		window.open(splendid2013_socTwitterLink);
	});
	
	$b('#splendid2013_nav_pin').click(function(){
		var splendid2013_pinterestUrl = 'http://pinterest.com/pin/create/button/';
		var splendid2013_pinterestUrlParam = 'http://www1.bloomingdales.com/shop/contemporary-apparel/splendid?id=23667';
		var splendid2013_pinterestDescriptionParam = 'Splendid Fall 2013 | bloomingdales.com';
		var splendid2013_socPinterestLink = splendid2013_pinterestUrl;
		splendid2013_socPinterestLink += '?url=' + encodeURIComponent(splendid2013_pinterestUrlParam).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
		splendid2013_socPinterestLink += '&description=' + encodeURIComponent(splendid2013_pinterestDescriptionParam).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
		splendid2013_socPinterestLink += '&media=' + encodeURIComponent(pinImagePath + 'splendid2013_pin_' + activeSlide.substr(activeSlide.length-1) + '.jpg').replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
		
		window.open(splendid2013_socPinterestLink);
	});
	
	
	function splendid2013_buildTopNav(){
		topNavArray.push(new topNavItem('#splendid2013_page0', '1'));
		topNavArray.push(new topNavItem('#splendid2013_page1', '2'));
		topNavArray.push(new topNavItem('#splendid2013_page2', '3'));
		topNavArray.push(new topNavItem('#splendid2013_page3', '4'));
		topNavArray.push(new topNavItem('#splendid2013_page4', '5'));
		topNavArray.push(new topNavItem('#splendid2013_page5', '6'));
	}
	
	function runGallery(elementID, topNavElementID, direction){
		if (elementID != activeSlide){
			if (!direction) {
				$b(activeSlide).hide();
				$b(activeSlide).css('left', slideWidth);
				$b(elementID).show();
				$b(elementID).css('left', 0);
			} else {
				if (direction=='right'){
					$b(elementID).css('left', slideWidth);
					$b(activeSlide).animate({
						left: (-slideWidth)
					},{
						duration: SLIDE_SPEED
					})
					$b(elementID).show();
					$b(elementID).animate({
						left: 0
					},{
						duration: SLIDE_SPEED
					})
				} else {
					$b(elementID).css('left', -slideWidth);
					$b(activeSlide).animate({
						left: (slideWidth)
					},{
						duration: SLIDE_SPEED
					})
					$b(elementID).show();
					$b(elementID).animate({
						left: 0
					},{
						duration: SLIDE_SPEED
					})
				}
				
			}
			activeSlide = elementID;
			
			$b('#splendid2013_pagination li').removeClass('selected');
			$b('#splendid2013_nav_page_' + activeSlide.substr(activeSlide.length-1)).addClass('selected');
			
			
			//BLOOMIES.coremetrics.cmCreatePageviewTag(mapDomToCoremetricksLookup(activeSlide.replace('#','')), 'fall13_splendid', '', '');
			
		}
	}
	
	
	
	function splendid2013_arrowsHandler(e){
		e.stopPropagation();
		$b('#splendid2013_arrowLeft, #splendid2013_arrowRight').unbind('click');
		
		if (!$b('#splendid2013_arrowLeft').hasClass('selected')){
			$b('#splendid2013_arrowLeft').addClass('selected');
		}
		
		$b.each(topNavArray, function(key, value){
			if (value.elementID == activeSlide) {
				activeNavIndex = key;
			}
		});
		
		if (activeNavIndex == 0)
			previousNavItem = topNavArray[topNavArray.length-1];
		else
			previousNavItem = topNavArray[activeNavIndex-1];
		
		if (activeNavIndex == topNavArray.length-1)
			nextNavItem = topNavArray[0];
		else
			nextNavItem = topNavArray[activeNavIndex+1];
		
		setTimeout(bindBothArrows,SLIDE_SPEED);
		
		if (this.id == 'splendid2013_arrowLeft'){
			runGallery(previousNavItem.elementID, previousNavItem.topNavElementID, 'left');
		} else {
			runGallery(nextNavItem.elementID, nextNavItem.topNavElementID, 'right');
		}
		
	}
	
	function bindBothArrows(){
		$b('#splendid2013_arrowLeft, #splendid2013_arrowRight').click(splendid2013_arrowsHandler);
		$b('#splendid2013_arrowLeft, #splendid2013_arrowRight').click(function(){
			//BLOOMIES.coremetrics.cmCreatePageElementTag(mapDomToCoremetricksLookup(this.id), 'fall13_splendid');
		})
	}
	
	function initCoremetrics(){
		mapDomToCoremetricsTags();
		//BLOOMIES.coremetrics.cmCreatePageviewTag('fall13_splendid--hp', 'fall13_splendid', '', '');

		$b('#splendid2013_arrowLeft, #splendid2013_arrowRight,#splendid2013_social li, #splendid2013_pagination li').click(function(e){
			//BLOOMIES.coremetrics.cmCreatePageElementTag(mapDomToCoremetricksLookup(this.id), 'fall13_splendid');
		})
		
	}
	
	function mapDomToCoremetricsTags(){
		mapDomCmArray.push(new mapDomCmItem('splendid2013_arrowLeft', 'left-arrow'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_arrowRight', 'right-arrow'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_fb', 'social-fb'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_tw', 'social-twitter'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_pin', 'social-pinterest'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_page0', 'fall13_splendid--hp'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_page1', 'fall13_splendid--page_2'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_page2', 'fall13_splendid--page_3'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_page3', 'fall13_splendid--page_4'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_page4', 'fall13_splendid--page_5'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_page5', 'fall13_splendid--page_6'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_page_0', 'page_nav-1'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_page_1', 'page_nav-2'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_page_2', 'page_nav-3'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_page_3', 'page_nav-4'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_page_4', 'page_nav-5'));
		mapDomCmArray.push(new mapDomCmItem('splendid2013_nav_page_5', 'page_nav-6'));
	}

	function mapDomToCoremetricksLookup(elementID){
		var retValue;
		$b.each(mapDomCmArray, function(key, value){
			if (value.domElementID == elementID || '#' + value.domElementID == elementID) {
				retValue = value.cmLabel;
			}
		});
		return retValue;
	}
	
})