/*!

Based on the following project:

Name: Scrollgress
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 20, 2014
Last Updated: August 20, 2014
Licensed under the MIT license

*/

;(function($) {

    $.fn.scrollgress = function(options) {
    
    	//return if no element was bound
		//so chained events can continue
		if(!this.length) { 
			return this; 
		}

		//define default parameters
        var defaults = {
            height: '5px',
            color: '#ff0000',
            /*suifengtec: init_success callback*/
            init_success: function() {},
            /*suifengtec: has read callback*/
            reading: function() {},
            /*suifengtec: has read callback*/
            done: function() {},
        }
        
        //define plugin
        var plugin = this;

        //define settings
        plugin.settings = {}
 
        //merge defaults and options
        plugin.settings = $.extend({}, defaults, options);
        
        var s = plugin.settings;

        //define element
        var el = $(this);

    	var elOverflow = el.css('overflow');
    	var elOverflowY = el.css('overflow-y');
    
    	var hasOverflow = (elOverflow === 'auto' || elOverflow === 'scroll' || elOverflowY === 'auto' || elOverflowY === 'scroll') ? true : false;
    
    	var windowHeight = $(window).outerHeight();
    
        var heightToScroll = (hasOverflow) ? el[0].scrollHeight : el.height();
        
        var elementToScroll = (hasOverflow) ? el : $(window);
    
    	var progressBar = '<div class="scrollgress"><div class="scrollgress__progress"></div></div>';

    	$('body').prepend(progressBar);
    	$('.scrollgress').css({
    		position: 'fixed',
    		top: '0px',
    		left: '0px',
    		background: 'transparent',
    		width: '100%',
    		height: s.height
    	});
    	$('.scrollgress__progress').css({
    		float: 'left',
    		background: s.color,
    		width: '0%',
    		height: s.height
    	});

    	
    	elementToScroll.scroll(function(e) {
    	
    		var amountScrolled = (hasOverflow) ? el.scrollTop() : $(document).scrollTop();

    		// divide the amount of pixels scrolled by the total height to scroll minus the height of the window
    		// and round the result to two decimal places
    		var percentScrolled = ((amountScrolled / (heightToScroll - windowHeight)) * 100).toFixed(2);
            /*suifengtec: fixing the percentage issue.*/
            percentScrolled = (percentScrolled>100)?100:percentScrolled;
    		
    		/*console.log(e.originalEvent);*/
    		$('.scrollgress__progress').css({
        		width: percentScrolled + '%'
    		})
            /*suifengtec: add a percentage tip for visitors.*/
            .data({'percentage': percentScrolled })
            /*suifengtec: add a percentage tip for visitors.*/
            .attr({'title': percentScrolled + '%'});
            if($.isFunction( s.reading )){
                s.reading.call(this,percentScrolled);
            }
            if(100===percentScrolled&&$.isFunction( s.done )){
                s.done.call(this);
            }
        });
        
         if($.isFunction( s.init_success )){
             s.init_success.call(this);
         }
       

    }

})(jQuery);