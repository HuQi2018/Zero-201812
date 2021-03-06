/**
 * gnmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	
	'use strict';

	// http://stackoverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	function gnMenu( el, options ) {	
		this.el = el;
		this._init();
	}

	gnMenu.prototype = {
		_init : function() {
			this.trigger = this.el.querySelector( 'a.gn-icon-menu' );
			this.menu = this.el.querySelector( 'nav.gn-menu-wrapper' );
			this.isMenuOpen = false;
			this.eventtype = mobilecheck() ? 'touchstart' : 'click';
			this._initEvents();

			var self = this;
			this.bodyClickFn = function() {
				self._closeMenu();
				this.removeEventListener( self.eventtype, self.bodyClickFn );
				this.removeEventListener( 'mouseover', self.bodyClickFn );
			};
		},
		_initEvents : function() {
			var self = this;

			if( !mobilecheck() ) {
				this.trigger.addEventListener( 'mouseover', function(ev) { self._openIconMenu(); } );
				this.trigger.addEventListener( 'mouseout', function(ev) { self._closeIconMenu(); } );
			
				this.menu.addEventListener( 'mouseover', function(ev) {
					self._openMenu(); 
					document.addEventListener( self.eventtype, self.bodyClickFn ); 
					document.addEventListener( 'mouseover', self.bodyClickFn ); 
				} );
			}
			this.trigger.addEventListener( this.eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();
				if( self.isMenuOpen ) {
					self._closeMenu();
					document.removeEventListener( self.eventtype, self.bodyClickFn );
					document.removeEventListener( 'mouseover', self.bodyClickFn );
				}
				else {
					self._openMenu();
					document.addEventListener( self.eventtype, self.bodyClickFn );
					document.addEventListener( 'mouseover', self.bodyClickFn );
				}
			} );
			this.menu.addEventListener( this.eventtype, function(ev) { ev.stopPropagation(); } );
			this.menu.addEventListener( 'mouseover', function(ev) { ev.stopPropagation(); } );
		},
		_openIconMenu : function() {
			classie.add( this.menu, 'gn-open-part' );
		},
		_closeIconMenu : function() {
			classie.remove( this.menu, 'gn-open-part' );
		},
		_openMenu : function() {
			if( this.isMenuOpen ) return;
			classie.add( this.trigger, 'gn-selected' );
			this.isMenuOpen = true;
			classie.add( this.menu, 'gn-open-all' );
			this._closeIconMenu();
		},
		_closeMenu : function() {
			if( !this.isMenuOpen ) return;
			classie.remove( this.trigger, 'gn-selected' );
			this.isMenuOpen = false;
			classie.remove( this.menu, 'gn-open-all' );
			this._closeIconMenu();
		}
	}

	// add to global namespace
	window.gnMenu = gnMenu;

} )( window );

/****????????????*****/
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,??????????????????????????????????????????
     if(r!=null)return  r[2]; return null;
}
function entersearch(){
     //alert(dd);
    var event = window.event || arguments.callee.caller.arguments[0];
    if (event.keyCode == 13)
    {
        keyword = $(".gn-search").val();
        window.location.href = "iframe.html?url=https://sp0.baidu.com/s?wd="+keyword+"&ie=utf-8";
    }
}

/**??????????????????*/
function wx(myurl,id){
    if(myurl !=null && myurl.toString().length>1)
    {
        var share_link=myurl;//??????????????????

        $.ajaxPrefilter( function (options) {
          if (options.crossDomain && jQuery.support.cors) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
          }
        });        
    
        $.get(
            share_link,
            function (response) {
                debugger
                var html = response;
                html=html.replace(/data-src/g, "src"); 
                html=html.replace(/class="video_iframe"/g, 'class="video_iframe" style="width:100%;height:500px;"'); 
                html=html.replace(/preview.html?width=500&amp;height=375&amp;/g, 'preview.html?'); 
                var html_src = 'data:text/html;charset=utf-8,' + html;
                $(id).attr("src" ,html_src);
            }
        );
    }
}


$(function(){
    /**????????????**/
	showScroll();
	function showScroll(){
		$(window).scroll( function() { 
		    scrollValue=$(window).scrollTop();
			scrollValue > 100 ? $('div[id=btn_top]').fadeIn():$('div[id=btn_top]').fadeOut();
		} );
		$('#btn_top').click(function(){	
			var value=scrollValue/8;
// 			console.log(Math.round(value));
			$("html,body").animate({scrollTop:0},Math.round(value));	
		});	
	}
	
	/**?????????**/
// 	$('.str1').liMarquee();
// 	$('.str2').liMarquee({
// 		direction: 'right'	
// 	});
// 	var stringEl = $('.str3').liMarquee();
// 	$('.speedChange').on('click',function(){
// 		var speedChange = $(this);
// 		var dataSpeed = speedChange.data('scrollamount');

// 		stringEl.trigger('mouseenter');
// 		stringEl.data({scrollamount:dataSpeed});
// 		stringEl.trigger('mouseleave');
		
// 		return false;	
// 	});
// 	$('.str4').liMarquee({
// 		drag: false	
// 	});
// 	$('.str5').liMarquee({	
// 		hoverstop: false
// 	});
// 	$('.str6').liMarquee();
// 	$('.btnPause').on('click',function(){
// 		$('.str6').liMarquee('pause');
// 	});
// 	$('.btnPlay').on('click',function(){
// 		$('.str6').liMarquee('play');
// 	})
})