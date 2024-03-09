$(function(){
	"use strict";
	
	var sect = $( window.location.hash ),
		portfolio = $('.portfolio-items');
	
	if(sect.length == 1){
		$('.section.active').removeClass('active');
		sect.addClass('active');
		if( sect.hasClass('border-d') ){
			$('body').addClass('border-dark');
		}
	}
	
	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-project').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	$(window).on('load', function(){
		$('body').addClass('loaded');
		
		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		portfolio.shuffle();
		$('.portfolio-filters > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('.portfolio-filters > li > a').removeClass('active');
			$(this).addClass('active');
			portfolio.shuffle('shuffle', groupName );
		});
		
	});
	
	/*=========================================================================
		Navigation Functions
	=========================================================================*/
	$('.section-toggle').on('click', function(){
		var $this = $(this),
			sect = $( '#' + $this.data('section') ),
			current_sect = $('.section.active');
		if(sect.length == 1){
			if( sect.hasClass('active') == false && $('body').hasClass('section-switching') == false ){
				$('body').addClass('section-switching');
				if( sect.index() < current_sect.index() ){
					$('body').addClass('up');
				}else{
					$('body').addClass('down');
				}
				setTimeout(function(){
					$('body').removeClass('section-switching up down');			
				}, 2500);
				setTimeout(function(){
					current_sect.removeClass('active');
					sect.addClass('active');
				}, 1250);
				if( sect.hasClass('border-d') ){
					$('body').addClass('border-dark');
				}else{
					$('body').removeClass('border-dark');
				}
			}
		}
	});
	
	
	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		items: 2,
		responsive:{
			992: {
				items: 2
			},
			0: {
				items: 1
			}
		}
	});
	
	
	
	
	
	/*=========================================================================
		Contact Form
	=========================================================================*/
	$(function(){
		"use strict";
		
		/*=========================================================================
			Contact Form Submission (Formspree)
		=========================================================================*/
		$('#contact-form').validator().on('submit', function (e) {
			if (!e.isDefaultPrevented()) {
				// If there is no error in validation, proceed with form submission
				
				e.preventDefault();
				var $this = $(this),
					formData = $this.serialize(),
					formAction = $this.attr('action'),
					formMethod = $this.attr('method'),
					formResult = $('#contact-form-result');
	
				$.ajax({
					url: formAction,
					method: formMethod,
					data: formData,
					dataType: "json",
					success: function(response){
						if (response.success) {
							// If the submission is successful, display a success message
							formResult.html("<div class='alert alert-success' role='alert'> Message sent </div>");
							// Optionally, reset the form after successful submission
							$this[0].reset();
						} else {
							// If the submission is not successful, display an error message
							formResult.html("<div class='alert alert-danger' role='alert'>"+ message.response +"</div>");
						}
					},
					error: function(){
						// If an error occurs during the submission, display an error message
						formResult.html("<div class='alert alert-danger' role='alert'>Oops! An error occurred. Please try again later.</div>");
					}
				});
			}
		});
	});	
	
	
	
});