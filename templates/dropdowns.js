(function($){
	$.fn.dropdowns = function (options) {
		
		var defaults = {
			toggleWidth: 780
		}
		
		var options = $.extend(defaults, options);
		
		var ww = $(window).width();
		
		var addParents = function() {
			$(".nav li a").each(function() {
				if ($(this).next().length > 0) {
					$(this).addClass("parent");
				}
			});
		}
		
		var adjustMenu = function() {
			if (ww < options.toggleWidth) {
				// if "more" link not in DOM, add it
				if (!$(".more")[0]) {
					$('<div class="more" onClick="togglePlusMinus(this)">+</div>').insertBefore($('.parent')); 
				}
				$(".toggleMenu").show();
				if (!$(".toggleMenu").hasClass("active")) {
					$(".nav").hide();
				} else {
					$(".nav").show();
				}
				$(".nav li").unbind('mouseenter mouseleave');
				$(".nav li .more").unbind('click').bind('click', function(e) {
					// must be attached to anchor element to prevent bubbling
					e.preventDefault();
					$(this).parent("li").toggleClass("hover");
				});
			} 
			else if (ww >= options.toggleWidth) {
				// remove .more link in desktop view
				$('.more').remove(); 
				$(".toggleMenu").hide();
				$(".nav").show();
				$(".nav li").removeClass("hover");
				$(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
					// must be attached to li so that mouseleave is not triggered when hover over submenu
					$(this).toggleClass('hover');
				});
			}
		}
		
		return this.each(function() {
			$(".toggleMenu").click(function(e) {
				e.preventDefault();
				$(this).toggleClass("active");
				$(this).next(".nav").toggle();
				adjustMenu();
			});
			adjustMenu();
			addParents();
			$(window).bind('resize orientationchange', function() {
				ww = $(window).width();
				adjustMenu();
			});
		});
	
	}
})(jQuery)

function toggle3Bars(x) {
	x.classList.toggle("change");
}

function togglePlusMinus(x) {
	if (x.textContent == "+") {
		x.innerHTML = "&#8210;";
	}
	else {
		x.textContent = "+";
	}
}
