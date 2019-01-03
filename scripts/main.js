$(document).ready(function () {
	// Cache selectors
	var lastId,
	    topMenu = $("#top-menu"),
	    topMenuHeight = topMenu.outerHeight()+35,
	    // All list items
	    menuItems = topMenu.find("li a"),
	    // Anchors corresponding to menu items
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	    var href = $(this).attr("href"),
	        offsetTop = href === "#" ? 0 : $(href).offset().top;
	    $('html, body').stop().animate({
	        scrollTop: offsetTop
	    }, 800,'swing');
	    e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+5;

	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";

	   if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass("active")
				.end().filter("[href=#"+id+"]").parent().addClass("active");
	   }
	});

	 $(".js-scroll").click(function(event){
	     event.preventDefault();
	     //calculate destination place
	     var dest=0;
	     if($(this.hash).offset().top > $(document).height()-$(window).height()){
	          dest=$(document).height()-$(window).height();
	     }else{
	          dest=$(this.hash).offset().top;
	     }
	     //go to destination
	     $('html,body').animate({scrollTop:dest}, 1000,'swing');
	 });

	 // Parallax hero text
	var $window = $(window);
	var scrollFade = function ($element, friction, offset) {
		friction  = (friction  === undefined)? 0.45 : friction;
		offset = (offset === undefined)? 0 : offset;

		var parentHeight = $element.parent().outerHeight() * 0.45;
		var previousOpacity = Infinity;

		$window.scroll(function() {
			var scrollTop = Math.max(0, $window.scrollTop())
			, yOffset   = scrollTop * friction
			, opacity   = 2 - (scrollTop / parentHeight - (parentHeight * offset))

			if (opacity < 0 && previousOpacity < 0) return;

			$element.css({
				transform: 'translate3d(0px,'+ yOffset +'px, 0)',
				opacity: opacity
			});

			previousOpacity = opacity;
		});
	}

	scrollFade($('.hero-content')
		, .75  // Friction (0 ~ 1): lower = none
		, 0    // Fade duration (0 ~ 1): lower = longer
	);

	// Particles
	$('#home').parallax({
	   invertX: true,
	   invertY: true,
	   scalarX: 10,
		frictionY: .1
	});


	particlesJS("particles-js", {
	 "particles": {
	   "number": {
		 "value": 70,
		 "density": {
		   "enable": true,
		   "value_area": 800
		 }
	   },
	   "color": {
		 "value": "#ffffff"
	   },
	   "shape": {
		 "type": "circle",
		 "stroke": {
		   "width": 3,
		   "color": "#ccc"
		 },
		 "polygon": {
		   "nb_sides": 5
		 }
	   },
	   "opacity": {
		 "value": 0.5,
		 "random": false,
		 "anim": {
		   "enable": false,
		   "speed": 1,
		   "opacity_min": 0.1,
		   "sync": false
		 }
	   },
	   "size": {
		 "value": 3,
		 "random": true,
		 "anim": {
		   "enable": false,
		   "speed": 40,
		   "size_min": 0.1,
		   "sync": false
		 }
	   },
	   "line_linked": {
		 "enable": true,
		 "distance": 150,
		 "color": "#AAA",
		 "opacity": 0.4,
		 "width": 1
	   },
	   "move": {
		 "enable": true,
		 "speed": 4,
		 "direction": "none",
		 "random": false,
		 "straight": false,
		 "out_mode": "out",
		 "bounce": false,
		 "attract": {
		   "enable": false,
		   "rotateX": 600,
		   "rotateY": 1200
		 }
	   }
	 },
	 "interactivity": {
	   "detect_on": "canvas",
	   "events": {
		 "onhover": {
		   "enable": true,
		   "mode": "grab"
		 },
		 "onclick": {
		   "enable": true,
		   "mode": "push"
		 },
		 "resize": true
	   },
	   "modes": {
		 "grab": {
		   "distance": 140,
		   "line_linked": {
			 "opacity": 1
		   }
		 },
		 "bubble": {
		   "distance": 400,
		   "size": 40,
		   "duration": 2,
		   "opacity": 8,
		   "speed": 3
		 },
		 "repulse": {
		   "distance": 200,
		   "duration": 0.4
		 },
		 "push": {
		   "particles_nb": 4
		 },
		 "remove": {
		   "particles_nb": 2
		 }
	   }
	 },
	 "retina_detect": true
	});

	// Animsition
	$(".animsition").animsition({
		inClass: 'fade-in',
		outClass: 'fade-out',
		inDuration: 800,
		outDuration: 800,
		linkElement: '.animsition-link',
		// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
		loading: true,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		loadingInner: '<img src="images/icons/loading.gif" alt="loading" />', // e.g '<img src="loading.svg" />'
		timeout: false,
		timeoutCountdown: 5000,
		onLoadEvent: true,
		browser: [ 'animation-duration', '-webkit-animation-duration'],
		// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
		overlay : false,
		overlayClass : 'animsition-overlay-slide',
		overlayParentElement : 'body',
		transition: function(url){ window.location.href = url; }
	});

	// Animate skill bars
	$(".skills").addClass("active");
	$(".skills .skill .skill-bar span").each(function() {
		$(this).animate({
		  "width": $(this).parent().attr("data-bar") + "%"
		}, 1000);
		$(this).append('<b>' + $(this).parent().attr("data-bar") + '%</b>');
	});
	setTimeout(function() {
		$(".skills .skill .skill-bar span b").animate({"opacity":"1"},1000);
	}, 2000);

	// Scroll to section
	$(".js-scroll").click(function(event){
		event.preventDefault();
		var dest=0;
		if($(this.hash).offset().top > $(document).height()-$(window).height()){
			 dest=$(document).height()-$(window).height();
		}else{
			 dest=$(this.hash).offset().top;
		}
		//go to destination
		$('html,body').animate({scrollTop:dest}, 1000,'swing');
	});

	var $frameContent = $('.content');
	$('.frame-anchor').click(function() {
		$frameContent.animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
	}, 1000, 'swing');
	return false;
	});

	// Social share
	$(".share").on('click', function(e) {
		$(".fab").removeClass("no");
		if(e.target != this) return;
		$('.share, .fab').toggleClass("active");
	});

	// Toggle comment form
	$('.add-comment-button').click(function() {
		$('.comment-form').slideToggle('slow');
		$(this).slideToggle('slow');
	});

	// Filter thumbnails
	$('.filter a').click(function(e) {
		e.preventDefault();
		$('.filter a').removeClass('active');
		$(this).addClass('active');

		var a = $(this).attr('href');
		a = a.substr(1);
		$('.portfolio-thumb li').each(function() {
			if (!$(this).hasClass(a) && a != 'all') {
				$(this).addClass('noshow').attr('disabled', true);
			}
			else {
				$(this).removeClass('noshow').attr('disabled', false);
			}
		});
	});

	// Bootstrap carousel
	$('#myCarousel').carousel('pause');

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            jQuery('#myCarousel').carousel(parseInt(id));
        } catch (e) {
            console.log('Regex failed!', e);
        }
    });
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
		var id = $('.item.active').data('slide-number');
		$('#carousel-text').html($('#slide-content-'+id).html());
		$('[id^=carousel-selector-]').removeClass('active');
		$('[id=carousel-selector-'+id+']').addClass('active');
    });

	// Google Map
	var	$main_color = '#2d313f',
		$saturation= -20,
		$brightness= 5;

	var style= [
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: $saturation}
			]
		},
	    {	//poi stands for point of interest - don't show these lables on the map
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    },
		{
			//don't show local road lables on the map
			featureType: "road.local",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show arterial road lables on the map
			featureType: "road.arterial",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		},
		//style different elements on the map
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]

		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		}
	];

	var $mapWrapper = $('#gmap'), draggableOp;

	if ( $mapWrapper.length > 0 ) {
		var map = new GMaps({
			div: '#gmap',
			lat : 40.710310,
			lng : -74.008456,
			scrollwheel: false,
			draggable: draggableOp,
			zoom: 16,
			disableDefaultUI: true,
			styles : style
		});

		map.addMarker({
			lat : 40.710310,
			lng : -74.0084567,
			icon: 'images/icons/marker.png',
			infoWindow: {
				content: '<p>If you see me, say hello!</p>'
			}
		});
	}
})
