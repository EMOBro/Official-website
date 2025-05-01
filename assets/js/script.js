(function($){
	'use script';

	// WOW JS
	new WOW().init();

	// Search
	$('.search-icon').click(function(){
        $('.search-form').addClass('active');
    });
    $('.search-form-x').click(function(){
        $('.search-form').removeClass('active');
    });

	// Scroll Area
	$(document).ready(function(){
	    $('.scroll-area').click(function(){
	      	$('html').animate({
	        	'scrollTop' : 0,
	      	},700);
	      	return false;
	    });
	    $(window).on('scroll',function(){
	      	var a = $(window).scrollTop();
	      	if(a>400){
	            $('.scroll-area').slideDown(300);
	        }else{
	            $('.scroll-area').slideUp(200);
	        }
	    });
	});


	/*---slider activation---*/
    var $slider = $('.hero-silder-full');
    if($slider.length > 0){
        $slider.owlCarousel({
            animateOut: 'fadeOut',
            loop: true,
            nav: false,
            autoplay: true,
            autoplayTimeout: 8000,
            items: 1,
            dots:true
        });
    }

    /*---Testimonial---*/
    var $testimonialSlider = $('.testimonial-full');
        if($testimonialSlider.length > 0){
        $('.testimonial-full').owlCarousel({
            autoplay: true,
            loop: true,
            nav: true,
            autoplay: false,
            autoplayTimeout: 8000,
            items: 2,
            dots:false,
            navText:['<span class="testimonialSlider-slider-nav"><i class="fa fa-angle-left"></i></span>','<span class="testimonialSlider-slider-nav"><i class="fa fa-angle-right"></i></span>'],
            responsiveClass:true,
            responsive:{
                    0:{
                    items:1,
                },
                400:{
                    items:1,
                },
                767:{
                    items:2,
                },
                991:{
                    items:2,
                },

            }
        });
     } 

    // Counter
    var $CounterUp = $('.counter');
    if($CounterUp.length > 0){
		$('.counter').counterUp({
	        delay: 10,
	        time: 2000
	    });
	}

	// Vedio Popup
	var $VedioPopup = $('.vedio-popup-btn-full a');
	    if($VedioPopup.length > 0){
	    $('.vedio-popup-btn-full a').magnificPopup({
	        type: 'iframe'
	    });
	}

	var $PortfolioMixItUp = $('.portfolio-full');
	    if($PortfolioMixItUp.length > 0){
		var mixer = mixitup('.portfolio-full');
		var mixer = mixitup('.portF');
		var mixer = mixitup('.portF', {
			selectors: {
				target: '.blog-item'
			},
			animation: {
				duration: 100
			}
		});
	}

	// Portfolio Popup
	var $PortfolioPopup = $('.portfolio-item a.zoom');
    if($PortfolioPopup.length > 0){
		$('.portfolio-item a.zoom').magnificPopup({
		  	type: 'image',
		   	gallery: {
		    	enabled: true
		  	},
		  	
		});
	}

	// Sticky Menu
	$(window).on('scroll',function(){
		var scroll = $(window).scrollTop();
		if(scroll < 150){
			$('.header-bottom').removeClass('sticky');
		}else{
			$('.header-bottom').addClass('sticky');
		}
	});





}(jQuery));