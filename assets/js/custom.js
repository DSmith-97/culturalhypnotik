//fetch('../assets/js/items.js')
//.then((response) => response.json())
//.then((item) => alert(item.products[0].title));

(function ($) {
    window.onload = function() {
        console.log("Loaded logged");
    }

window.onbeforeunload = function(event) {
    event = event || window.event;
    if (event) {
        // update items list in memory to match what's left in the cart
        $("#itemslist")[0].innerHTML = localStorage.itemslistcontent;
        $("#cartsubtotal")[0].innerText = localStorage.subtotal;
        $(".cartNum").val(localStorage.shoppingCartCount);
        }
    }
	
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
    
    // set home url for dev and prod
    if (location.hostname !== "127.0.0.1") { 
        $(".logo").attr('href', "/culturalhypnotik/index.html");
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
    
    //add current price to array of prices
    var currentID = localStorage.getItem("currentID") ? localStorage.getItem("currentID") : localStorage.setItem("currentID", '');
    
    <!--- store shopping card info  ---->
    (function calcuateCartCount() {
       
        var shoppingCartCount = localStorage.getItem("shoppingCartCount") ? localStorage.getItem("shoppingCartCount") : localStorage.setItem("shoppingCartCount", 0);

//        var cartsubtotal = localStorage.getItem("cartsubtotal") ? localStorage.getItem("cartsubtotal") :                      localStorage.setItem("cartsubtotal", 0);
        
        var cartCount = parseInt(localStorage.getItem("shoppingCartCount"));
        var carthasitems = $(".cartprice")[0];
        var carttotal = carthasitems ? parseInt($(".cartprice")[0].innerHTML) : 0;
//        var cartsubtotal = 0;
        
        $(".cartNum").val(localStorage.getItem("shoppingCartCount"));
        
        
        <!---  Shopping Cart Modal  --->
        var aModal = '$("body").append('+
            '<div class="modal fade" id="cartModal" role="dialog">'+
              '<div class="modal-dialog modal-dialog-scrollable">'+

                '<!-- Modal content-->'+
                  '<div class="modal-content">'+
                    '<div class="modal-header">'+
                      '<h5 class="modal-title" style="line-height: 2">Shopping Cart</h5>'+
                      '<h5 style="margin-top: 10px; margin-right: 22px;">Subtotal: $<span id="cartsubtotal">0</h5>'+
                        
                    '</div>'+
                    '<div class="modal-body" style="height: 240px">'+
                        '<div id="itemslist">'+

                         '</div>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                    '<button type="button" id="emptycart" class="btn btn-link">Empty Cart</button>'+
                      '<button type="button" class="btn btn-primary" data-dismiss="modal">Checkout</button>'+
                      '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                    '</div>'+
                  '</div>'+
               '</div>'+
          '</div>")';
                
        $("body").append(aModal);
        
        $("#success-alert").hide();
        
        $(".shoppingcart, #shoppingcart").click(function(){
            $("#cartModal").modal("show");
             removeCartItem();
        });
        
        
                
        //  Item Objects  --->        
        var cartitem = 
            [
                { 'shirt' : 
                     '<div class="row" style="padding: 10px; margin-left: 10px">'+
                        '<div class="col-4" style="padding: 10px; margin-left: 10px;">'+
                            '<div>'+
                                '<img class="pull-left" style="width: 120px; height: 120px; margin-left: -20px" src="/assets/images/blk_smurf_hoodie.png" alt="">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-7" style="padding: 10px;">'+
                            '<p id="carttitle" style="font-size: small; font-weight: bold; margin-top: 15px;">Smurf Hoodie - Black</p>'+
                            '<div class="cartprice" style="font-size: small; font-weight: bolder">$52.00</div>'+
                            '<div class="cartsize" style="font-size: small; font-weight: bold">XL</div>'+
                            '<div class="cartcounter" style="font-size: small">- 1 +</div>'+
                        '</div>'
                }
            ];
        
        var cartContents = $("#itemslist")[0].innerHTML;
        
         // Highight Size Selections
        var currentItemSize = '';
        $("[name='itemSize']").click(function() {
            
            //set local storage for size
            currentItemSize = $(this)[0].innerText;
            localStorage.setItem("currentItemSize", currentItemSize);
            
            setTimeout(function(){
                $("[name='itemSize']").css("background-color" , "#007bff");
                console.log($(this)[0].innerText + " clicked");
                $(this).css("background-color", "red");
                
            }, 500);
             $(this).css("background-color", "red");
        })
        
        localStorage.getItem("itemslistcontent") ? localStorage.getItem("itemslistcontent") : localStorage.setItem("itemslistcontent", '');
        var itemsliststore = localStorage.getItem("itemslistcontent");
        $("#itemslist").append(itemsliststore);
        
        
        localStorage.getItem("cartTotalCount") ? localStorage.getItem("cartTotalCount") : localStorage.setItem("cartTotalCount", 0);
        
        
        // display subtotal number in the input box
            $("#cartsubtotal").val(localStorage.subtotal);
        
        //initialize cart localStorage to 0 if there is no value set
            localStorage.subtotal = localStorage.subtotal > 0 ? localStorage.subtotal : 0;
        
        // Add Item to Cart
        $(".addToCart").click(function() {
            
            if (!localStorage.getItem("currentItemSize")) {
                alert("Please select a size!");
            } else {
                // get the contents of the shopping cart
                var cartContents = $("#itemslist")[0].innerHTML;

                // store the active item in memory
                var currentitem = localStorage.getItem("currentitem") ? localStorage.getItem("currentitem") : localStorage.setItem("currentitem", cartitem);

                // open the shopping cart modal if the same item already exists in the cart
                // if the item is not already in the cart, add it without opening the cart modal
                if (cartContents.includes(localStorage.currentID)) {
                    $("#cartModal").modal("show");
                } else {
                    $("#success-alert").fadeIn("slow").delay(2500).fadeOut("slow");
                    //$("#itemslist").append(currentitem);
                }
                
                $("#itemslist").append(currentitem);

                // increase the cart count by 1
                cartCount+=1;
                // store the new cart count in memory
                localStorage.setItem("shoppingCartCount", cartCount);
                // replace the old cart count number shown on the shopping cart with the new number 
                $(".cartNum").val('');
                $(".cartNum").val(localStorage.getItem("shoppingCartCount"));


                //----//var currentitem = localStorage.getItem("currentitem") ? localStorage.getItem("currentitem") : localStorage.setItem("currentitem", cartitem);

                //------//   $("#itemslist").append(currentitem);
                localStorage.setItem("itemslistcontent", $("#itemslist")[0].innerHTML);


                 //take local storage number and add to currentitem price
                var newPrice = parseInt(localStorage.subtotal) + parseInt(localStorage.currentitemprice);

                 //display the updated localStorage number in the input box

                    localStorage.subtotal = parseInt(newPrice);
                    $("#cartsubtotal")[0].innerHTML = parseInt(newPrice);

                // increase the quantity counter by 1 when another item is added to the cart
                var currentItemQuantity = parseInt($("#" + localStorage.currentID + "_quantity").val());

    //if (currentItemQuantity > 0) {
                    localStorage.setItem("currentItemQuantity", parseInt(currentItemQuantity) +1 );
                    $("#" + localStorage.currentID + "_quantity").val(parseInt(localStorage.getItem("currentItemQuantity")));
    //}

                //set local storage for size
                localStorage.setItem("currentItemSize", currentItemSize);      
                
                // add item size to shopping cart size field
                $(".cartsize")[localStorage.shoppingCartCount - 1].innerText = localStorage.getItem("currentItemSize");
                
                // reset size selection after item gets added to the cart
                localStorage.setItem("currentItemSize", ""); 
                
                
                 //***************** remove an item from shopping cart  *******************//
                removeCartItem();
            }
        });
        
        $("#cartsubtotal")[0].innerHTML = parseInt(localStorage.subtotal);
        
        $('#cartModal').on('shown.bs.modal', function() {
             $(".plus").unbind().click(function() {
                $("#cartsubtotal")[0].innerHTML = parseInt(localStorage.subtotal) + parseInt($(this).parent().attr("data-price"));
                localStorage.setItem("subtotal", parseInt(localStorage.subtotal) + parseInt($(this).parent().attr("data-price")));
                console.log($(this).parent().attr("data-price"));
            })
        })
        
        function removeCartItem() {        
            $(".remove").unbind().click(function() {

                // remove item by it's container
                var pnt = $(this).closest(".itemcontainer");
                pnt.remove();

                // decriment the cart count storage variable
                cartCount-=1;
                // store the new cart count in memory
                localStorage.setItem("shoppingCartCount", cartCount);
                // replace the old cart count number shown on the shopping cart with the new number 
                $(".cartNum").val('');
                $(".cartNum").val(localStorage.getItem("shoppingCartCount"));

                // update cart subtotal stored variable
                var priceToSubtract = parseInt($(this).closest(".itemcontainer").find(".cartprice")[0].innerText);
                localStorage.subtotal -= priceToSubtract;

                //update the subtotal shown on card modal
                $("#cartsubtotal")[0].innerText = localStorage.subtotal;

                //reset shopping cart if last item gets removed
                if (localStorage.shoppingCartCount == 0) {
                    emptyShoppingCart();
                }

                // update items list in memory to match what's left in the cart
                localStorage.itemslistcontent = $("#itemslist")[0].innerHTML;
            });
        }
        
 
        function emptyShoppingCart() {
            $("#itemslist")[0].innerHTML='';
            localStorage.setItem("shoppingCartCount", 0);
            localStorage.setItem("itemslistcontent", '');
            localStorage.setItem("currentitem", '');
            localStorage.setItem("pricelist", '');
            localStorage.setItem("currentID", '');
            localStorage.setItem("currentitemprice", 0);
            localStorage.setItem("subtotal", 0);
            $(".cartNum").val('');
            $("#cartsubtotal")[0].innerHTML = '0';
            localStorage.setItem("currentItemSize", '');
            window.location.reload();
        }
        
        // clear shopping cart
        $("#emptycart").click(function() {
            emptyShoppingCart();
        });
        
        
    // get the buy link for the selected product
       function getPaylink(name, size) {
           fetch('../assets/js/items.js')
            .then((response) => response.json())
           .then(function(items) {
                items.products.forEach(function(item, index) {
                   if (item.name == name && item.size == size) {
                       localStorage.currentID = "";
                       localStorage.currentItemSize = "";
                       window.location.href = item.payLink
//                       return item.payLink;
                   }
               }) 
           })
       }
        
        $(".buyButton").click(function() {
             if (!localStorage.getItem("currentItemSize")) {
                alert("Please select a size...");
            } else {
               var name = localStorage.currentID;
               var size = localStorage.currentItemSize;
                
                getPaylink(name, size);
                }
        })
//       getPaylink("celebrateBH", "SM", "white");
       
        
    })()
    
    
    


})(window.jQuery);