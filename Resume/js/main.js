;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};


	// Page Nav
	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	//navbar.attr('aria-expanded', 'false');
		    	$('.js-resume-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#resume-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 400 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top resume-animated slideInDown');
			} else if ( scrlTop <= 400) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top resume-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top resume-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};
	
	/* var createCircles = function() {
		var colors = [
			['#f6608a', '#ffffff'], 
			['#f6608a', '#ffffff'], 
			['#f6608a', '#ffffff'], 
			['#f6608a', '#ffffff'], 
			['#f6608a', '#ffffff'], 
			['#f6608a', '#ffffff']
		];
		for (var i = 1; i <= 7; i++) {
			var child = $('#circles-' + i),
				percentage = 30 + (i * 10);
				
			Circles.create({
				id:         child.id,
				percentage: percentage,
				radius:     80,
				width:      10,
				number:   	percentage / 1,
				text:       '%',
				colors:     colors[i - 1]
			});
		}
	} */

	// Document on load.
	$(function(){
		
		clickMenu();

		windowScroll();

		navigationSection();
		
		/* createCircles(); */
	});


}());