/**
 * @author: Suissa
 * @name: Absolute Center
 * @date: 2007-10-09
 */
jQuery.fn.center = function() {
    return this.each(function(){
    		var el = $(this);
    		var h = el.height();
    		var w = el.width();
    		var w_box = $(window).width();
    		var h_box = $(window).height();	
    		var w_total = (w_box - w)/2; //400
    		var h_total = (h_box - h)/2;
    		var css = {"position": 'absolute', "left": w_total+"px", "top":
h_total+"px"};
    		el.css(css);
    });
};


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.removeNative = function() {
    this.each(function(i,e){
    
        if( e.parentNode ){
            e.parentNode.removeChild(e);
        }
    });
};

