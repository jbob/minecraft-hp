(function($) {
	var diashow_cache = [];
	$.fn.initDiashow = function() {
			$(this).children("a").hide();
			// Preloading load image
			var load = new Image();
			load.src = "images/lightbox-ico-loading.gif";
			for(var i = 0; i < $(this).length;i++) {
				var top = $(this[i]);
				var a = top.children("a:first");
				a.toggleClass("diashowPos");
				top.prepend("<h3>" + (a.attr("title") ? a.attr("title") : "Kein Titel") + "</h3>");
				top.append("<img/>");
				top.children("img").loadImage( a.attr("href") );
				top.append("<div class=\"load\"></div>");
				top.append("<br><span>Bild 1 von " + top.children("a").length + "</span>");
			}
			$(this).children("img").click(function() {
					var top = $(this).parent("div");
					var a = top.children("a.diashowPos");
					var n = top.children("a").index(elem);
					// div cant shrink:
					top.css("min-height",top.height());
					if( a.next().is("a") ) {
						var elem = a.next();
					}else{
						var elem = top.children("a:first");
					}
					top.children("h3").html(elem.attr("title") ? elem.attr("title") : "Kein Titel");
					a.toggleClass("diashowPos");
					elem.toggleClass("diashowPos");
					top.children("span").html("Bild " + (top.children("a").index(elem)+1) +" von " + top.children("a").length);
					top.children("img").loadImage( elem.attr("href") );
				});
		};
	$.fn.loadImage = function(src) {
			var image = $(this);
			if( typeof(diashow_cache[src]) == "undefined" ) {
				diashow_cache[src] = new Image();
				image.fadeTo(0,0.5);
				image.parent().children(".load").show();
				diashow_cache[src].onload = function() {
						image.attr("src",src);
						image.parent().children(".load").hide();
						image.fadeTo(0,1.0);
						diashow_cache[src].onload = function() {};
					};
				diashow_cache[src].src = src;
			}else{
				image.attr("src", src);
			}
			return image;
		};
})(jQuery);
