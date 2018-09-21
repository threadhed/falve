$(document).ready(function() {

	$(window).scroll(function(){
		//console.log($('#main').offset().top) // > $(this).height() + $(this).scrollTop());
		//console.log($('#main').offset().top)
		//console.log($('#header').height()) // > $(this).height() + $(this).scrollTop());
		//console.log($(this).scrollTop() > $('#header').height()) // > $(this).height() + $(this).scrollTop());
		//console.log($('#main').offset().top > $('#header').height() + $(this).scrollTop()) // > $(this).height() + $(this).scrollTop());
		$('body').toggleClass('fixed', $(this).scrollTop() >= $('#header').height());
	});

	$('.carousel-large').appendTo("#container").fadeIn('fast');

	$('.carousel').before('<div class="carousel-nav">').cycle({
		debug   : false,
		fx      : 'scrollHorz',
		easing  : 'easeInOutExpo',
		speed   : 600,
		timeout : 3000,
		pause   : 1,
		pager   :  '.carousel-nav' 
	});

	$('.infinite-scroll').addClass('infinitescroll').infinitescroll({
		loading: {
			img        : "/site/themes/falve/images/loading.gif",
			msgText    : "Getting more",
			finishedMsg: "Fin.",
			finished    : function(e){
				$('#infscr-loading').hide(200);
			}
		},
		navSelector  : "div.navigation", // selector for the paged navigation (it will be hidden)
		nextSelector : "div.navigation a", // selector for the NEXT link (to page 2)
		itemSelector : ".item" // selector for all items you'll retrieve
		
	},function(e)
	{
		$(e).each(function(){
			$(this).hide().fadeIn(600);
		});
	});

	$('.shop-images a.product').live('click',function(e){
		e.preventDefault();
		var $trigger = $(this);
		var $target = $(this).nextAll('.clear:first');
		var $close = $('<a class="close" />');
		var myUrl = $(this).attr("href") + " #product-content";
		var animationSpeed = 500;


		if(myUrl != $target.data('current'))
		{
			$trigger.addClass('loading');
			hideShopDetails(true);
			// Get the target for the content:
			$target.load(myUrl, function(){
				$('#product-content').attr('id','').prepend($close);
				$(this).slideDown(animationSpeed,'easeInOutExpo').data('current',myUrl);
				$trigger.removeClass('loading');				
				$.scrollTo( $target, animationSpeed, {
					easing: 'easeInOutExpo',
					offset: -50
				} );
			});
		}
		else
		{
			$target.slideToggle(animationSpeed,'easeInOutExpo');
		}
	});
	$('.product-content .close').live('click',function(e){
		e.preventDefault();
		hideShopDetails();
	});

	$('.gallery-images a').live('click',function(e){
		e.preventDefault();
		var $container = $(this).parents('.product-content').find('.product-image');
		var $old = $container.children('img');
		var $new = $('<img />').attr('src',$(this).attr('href')).hide().css('position','absolute');
		if($old.attr('src') != $(this).attr('href'))
		{
			$container.animate({
				width:    $old.outerWidth(),
				height:   $old.outerHeight()
			},'fast').addClass('loading').children('img').fadeOut('fast', function (){
				$(this).remove();
			});
			$container.prepend($new).children('img').bind("load", function () {
				$(this).fadeIn('slow');
				$container.animate({
					width:    $(this).outerWidth(),
					height:   $(this).outerHeight()
				},'fast').removeClass('loading');
			});
		}
	});




if($('body').hasClass('header-image'))
{



  // Global vars
  var $artHeaderInner = $('.brand-block');
  var $artHeader = $('#header');
  var $artTitle = $('.art-title');
  var $artSubtitle = $('.art-subtitle');
//  var $artTime = $('.art-time');
  var artTitleFontSize = parseInt($artTitle.css('font-size'));
  var $nav = $('#main-nav');
  var windowScroll;
  var isMobile = false;

	//Scrolly stuff
	function isLargeViewport() {
    if($nav.css('position') == "relative") {
      return false;
    } else {
      return true;
    }
  }

  // If large viewport and not mobile, parallax the title
  if(!isMobile) {
    $(window).scroll(function() {
      if(isLargeViewport()) {
        slidingTitle();
      }
    });
  }

  // Window gets large enough, need to recalc all parallaxing title values
  $(window).resize(function() {
    if(isLargeViewport()) {
      slidingTitle();
    }
  });

	// Functional parallaxing calculations
	function slidingTitle() {
	
		//Get scroll position of window
		windowScroll = $(this).scrollTop();

		//Slow scroll of .art-header-inner scroll and fade it out
		
		$artHeaderInner.css({
			'margin-top' : -(windowScroll/3)+"px",
			'opacity' : 1-(windowScroll/550)
		});

		//Slowly parallax the background of .art-header
		$artHeader.css({
			'background-position' : 'center ' + (-windowScroll/5)+"px"
		});

		//Fade the .nav out
		$nav.css({
			'opacity' : 1-(windowScroll/400)
		});
	}

}

});
function hideShopDetails(emptyOthers) {
	$('.shop-detail').slideUp('fast','easeInOutExpo');
}