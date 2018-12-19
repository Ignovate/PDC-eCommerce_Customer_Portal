/*
Author Name: iGnovate;
Version: 1.0;
*/
(function ($) {
	"use Strict";
/*---------------------------------
    1. Mean Menu Active
-----------------------------------*/
jQuery('.header-menu-area nav').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: "991"
});
/*---------------------------------
	2. Header Top Dropdown Menu 
-----------------------------------*/
$( '.drodown-show > a' ).on('click', function(e) {
    e.preventDefault();
    if($(this).hasClass('active')) {
        $( '.drodown-show > a' ).removeClass('active').siblings('.ht-dropdown').slideUp()
        $(this).removeClass('active').siblings('.ht-dropdown').slideUp();
    } else {
        $( '.drodown-show > a' ).removeClass('active').siblings('.ht-dropdown').slideUp()
        $(this).addClass('active').siblings('.ht-dropdown').slideDown();
    }
}); 
/*-- DeopDown Menu --*/
$('.dropdown, .mega-menu').hide();
if( $(window).width() > 991 ) {
    $('.header-menu-area > nav > ul > li').hover(
      function() {
        if( $(this).children('ul').size() > 0 && $(this).children().hasClass('dropdown') || $(this).children().hasClass('mega-menu') ) {
            $(this).children().stop().slideDown(400);
        }
      }, function() {
        $(this).children('.dropdown, .mega-menu').stop().slideUp(300);
      }
    );
};
/*---------------------------------
	3. Shopping Cart Toggle Active 
-----------------------------------*/
$( '.shoppingcart-search-item > ul > li > a' ).on('click', function(e) {
    e.preventDefault();
    if($(this).hasClass('active')) {
        $( '.shoppingcart-search-item > ul > li > a' ).removeClass('active').siblings('.header-cart,.currency-dropdown').slideUp()
        $(this).removeClass('active').siblings('.header-cart,.currency-dropdown').slideUp();
    } else {
        $( '.shoppingcart-search-item > ul > li > a' ).removeClass('active').siblings('.header-cart,.currency-dropdown').slideUp()
        $(this).addClass('active').siblings('.header-cart,.currency-dropdown').slideDown();
    }
});
/*---------------------------------
    4. Sticky Menu Active
-----------------------------------*/
$(window).scroll(function() {
if ($(this).scrollTop() >50){  
    $('.header-sticky').addClass("is-sticky");
  }
  else{
    $('.header-sticky').removeClass("is-sticky");
  }
});
/*----------------------------
    5. Owl Active
------------------------------ */
/*----------
    5.1 Hero Slider Active
------------------------------*/
$('.hero-slider').owlCarousel({
    smartSpeed: 5000,
    nav: true,
    loop: true,
	dots: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: false,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
/*------- 
    5.2 Product Slider Active 
----------------------------------*/
 $('.product-slider').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    })
/*---------
    5.3 Product Slider 5 Active Home-2
----------------------------------*/
 $('.product-slider-5').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 5
            },
            1200: {
                items: 5
            }
        }
    })
/*----------
    5.4 New Product Slider Active 
----------------------------------*/
 $('.new-product-slider').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        margin: 30,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    })
/*---- 
    5.5 On Sale Product Slider Active 
-------------------------------------------*/
 $('.on-sale-product-slider').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
})
/*--------
    5.6 On Sale Product 4 Slider Active Home-2
---------------------------------------------*/
 $('.on-sale-product-slider-4').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
})
/*--------------------------------
    5.7 Shop Category Active
----------------------------------*/
 $('.category-slider').owlCarousel({
    smartSpeed: 1000,
    nav: false,
    navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
})  
/*--------------------------------
    5.8 Banner Slider
----------------------------------*/
 $('.banner-slider').owlCarousel({
    smartSpeed: 1000,
    nav: true,
    navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        },
        1200: {
            items: 3
        }
    }
})   
/*--------------------------------
    5.9 Amazing Offer Slider
----------------------------------*/
 $('.amazing-offer-slider').owlCarousel({
    smartSpeed: 1000,
    nav: true,
    navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 5
        },
        1200: {
            items: 5
        }
    }
}) 
/*--------------------------------
    5.10 Wishlist Slider
----------------------------------*/
 $('.wishlist-slider, .bestselling-slider').owlCarousel({
    smartSpeed: 1000,
    nav: true,
    navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 2
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        },
        1200: {
            items: 3
        }
    }
}) 
/*--------------------------------
    5.11 Top Selling Slider
----------------------------------*/
 $('.topselling-slider').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
})
/*--------------------------------
    5.12 Category Amazing Slider
----------------------------------*/
 $('.category-amazing-slider').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        dots: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
})
/*--------------------------------
    5.13 Related Products Slider
----------------------------------*/
 $('.related-products-slider').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            },
            1200: {
                items: 5
            }
        }
})
/*--------------------------------
    5.14 Recently Viewed Slider
----------------------------------*/
 $('.recently-viewed-slider').owlCarousel({
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            },
            1200: {
                items: 5
            }
        }
})
/*----------------------------------- 
    6. Single Product Side Menu Active 
--------------------------------------*/  
$('.single-slide-menu').slick({
		prevArrow: '<i class="fa fa-angle-up"></i>',
		nextArrow: '<i class="fa fa-angle-down slick-next-btn"></i>',
        slidesToShow: 4,
        vertical: true,        
        slidesToScroll: 5,
        verticalSwiping: true,        
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2
              }
            }
          ]
	});
$('.modal').on('shown.bs.modal', function (e) {
    $('.single-slide-menu').resize();
})
    
$('.single-slide-menu a').on('click',function(e){
      e.preventDefault();
     
      var $href = $(this).attr('href');
     
      $('.single-slide-menu a').removeClass('active');
      $(this).addClass('active');
     
      $('.product-details-large .tab-pane').removeClass('active show');
      $('.product-details-large '+ $href ).addClass('active show');
     
  })
    
/*----------------------------------
	7. Instafeed active 
------------------------------------*/
if($('#Instafeed').length) {
    var feed = new Instafeed({
        get: 'user',
        userId: 6665768655,
        accessToken: '6665768655.1677ed0.313e6c96807c45d8900b4f680650dee5',
        target: 'Instafeed',
        resolution: 'low_resolution',
        limit: 6,
        template: '<li><a href="{{link}}" target="_new"><img src="{{image}}" /></a></li>',
    });
    feed.run(); 
}
    
new WOW().init();
/*----------------------------------
   8. ScrollUp Active
-----------------------------------*/
$.scrollUp({
    scrollText: '<i class="fa fa-angle-double-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
});
/*------------------------------ 
    9. Cart Plus Minus Button
---------------------------------*/
 $(".cart-plus-minus").append('<div class="dec qtybutton"><i class="zmdi zmdi-minus"></i></div><div class="inc qtybutton"><i class="zmdi zmdi-plus"></i></div>');
  $(".qtybutton").on("click", function() {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass('inc')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
       // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
        } else {
        newVal = 0;
      }
      }
    $button.parent().find("input").val(newVal);
  });
/*------------------------------ 
    10. Nice Select Active
---------------------------------*/
// $('select').niceSelect();
/*------------------------------
    11. Category menu Active
------------------------------*/
    $('#cate-toggle li.has-sub>a,#cate-mobile-toggle li.has-sub>a,#shop-cate-toggle li.has-sub>a').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        } else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });
    $('#cate-toggle>ul>li.has-sub>a').append('<span class="holder"></span>');

 /*--- showlogin toggle function ----*/
    $('#showlogin').on('click', function() {
        $('#checkout-login').slideToggle(900);
    });

 /*--- showlogin toggle function ----*/
    $('#showcoupon').on('click', function() {
        $('#checkout_coupon').slideToggle(900);
    });
/*--- showlogin toggle function ----*/
    $('#cbox').on('click', function() {
        $('#cbox-info').slideToggle(900);
    });

 /*--- showlogin toggle function ----*/
    $('#ship-box').on('click', function() {
        $('#ship-box-info').slideToggle(1000);
    });

})(jQuery);
/* --------------------------------------------------------
	12. Price Range Slider
* -------------------------------------------------------*/  
$( function() {
    $("#price-range" ).slider({
        range: true,
        min: 1,
        max: 10000,
        step: 1,
        values: [ 1, 10000 ],
        slide: function( event, ui ) {
            $( "#min, #min1" ).val( "" + ui.values[ 0 ] );
            $( "#max, #max1" ).val( "" + ui.values[1] );
        }
    });
    $("#min, #min1").val("" + $( "#price-range" ).slider( "values", 0));
    $("#max, #max1").val("" + $( "#price-range" ).slider( "values", 1)); 
});
/* --------------------------------------------------------
	13. Product block show hide - up and down
* -------------------------------------------------------*/ 
$(function(){
    $(".show-hide").click(function(){
        $("#show-hide-block").slideToggle();
        $("i", this).toggleClass("zmdi zmdi-chevron-up zmdi zmdi-chevron-down");
    });
});