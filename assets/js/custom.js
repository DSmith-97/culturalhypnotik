(function ($) {
	
	"use strict";
	$('.owl-men-item').owlCarousel({
		items:5,
		loop:true,
		dots: true,
		nav: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:3
			  }
		 }
	})

	$('.owl-women-item').owlCarousel({
		items:5,
		loop:true,
		dots: true,
		nav: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:3
			  }
		 }
	 })

	$('.owl-kid-item').owlCarousel({
		items:5,
		loop:true,
		dots: true,
		nav: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:3
			  }
		 }
	 })

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('#top').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.lenth > 0 && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}
    
    function getProducts() {
        var allProducts;
        
        var myData;
        fetch('https://api.jsonbin.io/v3/b/63d7c247c0e7653a0567e87b', {
            method : 'GET',
            headers : {
                'X-Master-Key' : '$2b$10$n1b5ZZoBznlH6lKNu2S2W.oWE3Db9OUpAQiNtZ/dLDmhskCcSBpfi'
            }
        }).then(function(resp){
                return resp.json();
            }).then(function(data) {
                allProducts = data;
                console.log(data);
            });
        
        return allProducts;
    }
    
    function updateProduct(itemNumber, property, newValue) {
        // get the list of products from the db        
        var allProducts;
        
        var myData;
        fetch('https://api.jsonbin.io/v3/b/63d7c247c0e7653a0567e87b', {
            method : 'GET',
            headers : {
                'X-Master-Key' : '$2b$10$n1b5ZZoBznlH6lKNu2S2W.oWE3Db9OUpAQiNtZ/dLDmhskCcSBpfi'
            }
        }).then(function(resp) {
                return resp.json();
            }).then(function(data) {
                allProducts = data;
                console.log(data);
            
            // get identify the product by item number and update the property
            var theRecord = allProducts.record.Products;
            theRecord.forEach(function(item, index) {
                if (item.itemNum == "004") {
                    item.type = "hoodie";
                }
            });
            
                var request = new XMLHttpRequest();

                request.onreadystatechange = () => {
                  if (request.readyState == XMLHttpRequest.DONE) {
                    console.log(request.responseText);
                  }
                };

                request.open("PUT", "https://api.jsonbin.io/v3/b/63d7c247c0e7653a0567e87b", true);
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("X-Master-Key", "$2b$10$n1b5ZZoBznlH6lKNu2S2W.oWE3Db9OUpAQiNtZ/dLDmhskCcSBpfi");
                request.send(JSON.stringify({"Products" : theRecord}));
            })
        
    }
        
       
    $("#instaButton").click(function() {
        getProducts();
    });
    
    
    $("#fbButton").click(function() {
        updateProduct("001", "color", "white");
    });
    
    <!--- store shopping card info  ---->
    (function calcuateCartCount() {

        localStorage.getItem("shoppingCartCount") ? localStorage.getItem("shoppingCartCount") : localStorage.setItem("shoppingCartCount", 0);
        var cartCount = parseInt(localStorage.getItem("shoppingCartCount"));

        $(".addToCart").click(function(){
            cartCount+=1;
            localStorage.setItem("shoppingCartCount", cartCount);
            $(".cartNum").val('');
            $(".cartNum").val(localStorage.getItem("shoppingCartCount"));
        })
         $(".cartNum").val(localStorage.getItem("shoppingCartCount"));
        
        
        <!---  Shopping Cart Modal  --->
        var aModal = '$("body").append('+
            '<div class="modal fade" id="cartModal" role="dialog">'+
              '<div class="modal-dialog">'+

                '<!-- Modal content-->'+
                  '<div class="modal-content">'+
                    '<div class="modal-header">'+
                      '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                      '<h4 class="modal-title">Shopping Cart</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                      '<p>Your Items:</p>'+
                        '<div>'+
                            '<ul>'+
                                '<ul>Item 1</ul>'+
                                '<ul>Item 2</ul>'+
                                '<ul>Item 2</ul>'+
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                      '<button type="button" class="btn btn-primary" data-dismiss="modal">Proceed to Checkout!</button>'+
                      '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                    '</div>'+
                  '</div>'+
               '</div>'+
          '</div>")';
                

        $("body").append(aModal);
        
        $(".shoppingcart, #shoppingcart").click(function(){
              $("#cartModal").modal("show");
            console.log("modal clicked");
          });
        
    })()
    
    
    


})(window.jQuery);