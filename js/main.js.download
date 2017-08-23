$(function(){


})

$(function(){
	var modelInit = false;
	var popupSwitcher = $('._3d__overlay, ._3d__popup-toggler, ._3d__nav-el');
	var cont = $('._3d__content.popup__content');

	popupSwitcher.click(function(e){
		if ($('#pano').length) $('#pano').remove();
		cont.append('<div id="flashContent"></div>');

		if (!modelInit)
		{
			var flashvars = {};
			var params = {};
			params.quality = "high";
			params.bgcolor = "#ffffff";
			params.allowscriptaccess = "sameDomain";
			params.allowfullscreen = "true";
			params.base=".";
			var attributes = {};
			attributes.id = "pano";
			attributes.name = "pano";
			attributes.align = "middle";
			swfobject.embedSWF(
				$(this).data('swf'), "flashContent",
				"720", "520",
				"9.0.0", "expressInstall.swf",
				flashvars, params, attributes);
			//modelInit = true;
		}

		var index = $(this).index();

		$('._3d__nav-el_active').removeClass('_3d__nav-el_active');
		$('._3d__nav-el').eq(index).addClass('_3d__nav-el_active');


		if (popupSwitcher.hasClass('_3d__nav-el')){

		}
	})
})

/* gallery */

$(function(){


	// cache container
	var $container = $('.gallery__photos-list');
	// initialize isotope
	$container.isotope({
		itemSelector : '.gallery__photos-item'
	});

	// filter items when filter link is clicked
	$('.gallery__tags-item').click(function(){
		var selector = '.' + $(this).attr('data-filter');
		$container.isotope({ filter: selector });
		return false;
	});


	//var $item = $('.gallery__photos');
	var $toggler = $('.gallery__tags-item');
	//var itemSelectedClass = 'gallery__photos_selected';
	var togglerSelectedClass = 'gallery__tags-item_selected';

	var chooseItem = function(index){
		//$item.removeClass(itemSelectedClass).eq(index).addClass(itemSelectedClass);
		$toggler.removeClass(togglerSelectedClass).eq(index).addClass(togglerSelectedClass);
	}

	var init = function(){
		chooseItem(0);
	}();

	$toggler.click(function(){
		var index = $(this).index();
		chooseItem(index);
	})

	$('.gallery__switcher').click(function(){
		setTimeout(function(){
			$container.isotope(
				'reLayout', function(){

				}
			);
		}, 500)
	})

})

/* switcher */

$(function(){

	var $switcher = $('.switcher');
	var $swItems = $switcher.find('.switcher__item');
	var $swImg = $switcher.find('.switcher__img');
	var $swToggler = $switcher.find('div');
	var swPos = 'right';
	var swAnimateTime = 400;
	var swActiveClass = 'switcher__item_selected';
	var $swCont = $switcher.closest('.hasSwitcher');
	var $swRel = $swCont.find('.switcher__rel');


	var swSwitch = function(obj, callback){

		if (!obj){
			var obj = $swImg;
			//console.log('fade');
		}

		if (obj.closest('.ceiling__switcher').length){
			return false;
		}


		$swItems = obj.closest('.switcher').find('.switcher__item');

		if (swPos == 'left'){

			obj.animate({
				'background-position-x': '0'
			}, swAnimateTime, function(){
				$swItems.removeClass(swActiveClass).eq(1).addClass(swActiveClass);
				swPos = 'right';
				if (callback){
					callback();
				}

				obj.closest('.hasSwitcher').find('.switcher__rel').eq(0).hide();
				obj.closest('.hasSwitcher').find('.switcher__rel').eq(1).show();
			})

		} else {
			if (swPos == 'right'){

				obj.animate({
					'background-position-x': '-48'
				}, swAnimateTime, function(){
					$swItems.removeClass(swActiveClass).eq(0).addClass(swActiveClass);
					swPos = 'left';
					if (callback){
						callback();
					}

					obj.closest('.hasSwitcher').find('.switcher__rel').eq(1).hide();
					obj.closest('.hasSwitcher').find('.switcher__rel').eq(0).show();
				})

			} else {

				return false;
			}
		}


	}

	var init = function(obj){
		if (!obj){
			var obj = $swImg;
		}

		if (obj.closest('.ceiling__switcher').length){
			return false;
		}


		$swItems = obj.closest('.switcher').find('.switcher__item');
		$swItems.eq(0).addClass('switcher__item_selected');
		swSwitch(obj);
	};

	$('.switcher__img').each(function(){
		init($(this));
	})

	$swToggler.click(function(){
		var obj = $(this).closest('.switcher').find('.switcher__img');

		if (obj.hasClass(swActiveClass)){
			return false;
		}

		swSwitch(obj, function(){

		});
	})
})

/* menu fixed top */

$(function(){

	$(window).scroll(function(e){

		var menu = $('.menu');
		var empty = $('.menu__empty');
		var offsetTop = $(this).scrollTop();
		var point = 113;

		if (offsetTop > point){
			menu.addClass('menu_fixed');
			empty.show();
		} else {
			menu.removeClass('menu_fixed');
			empty.hide();
		}
	})
})

$(document).ready(function() {


	$(document).ready(function() {

		$('.iosSlider').iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
			infiniteSlider: true,
			snapSlideCenter: true
		});

	});

});
/* tabs */

$(function(){
	var $tabControls = $('.products__right_hasMenu .products__menu-item');
	var $tabItems = $('.products__right_hasMenu .products__item');
	var tabControlsActiveClass = 'products__menu-item_selected';
	var tabItemsActiveClass = 'products__item_selected';

	var init = function(){
		$tabControls.eq(0).addClass(tabControlsActiveClass);
		$tabItems.eq(0).addClass(tabItemsActiveClass);
	}();

	$tabControls.click(function(e){
		e.preventDefault();
		var $that = $(this);
		var index = $that.index();

		$tabControls.removeClass(tabControlsActiveClass).eq(index).addClass(tabControlsActiveClass);
		$tabItems.removeClass(tabItemsActiveClass).eq(index).addClass(tabItemsActiveClass);

	})
})

/* calc */

function calcHandler($calcCont){

	var $calcResultCont = $calcCont.find('.calc__result-value');
	var $calcInputs = $calcCont.find('.calc__form-input');
	var $calcSquare = $calcCont.find('.calc__form-input_square');
	var $calcAngles = $calcCont.find('.calc__form-input_angles');
	var $calcLights = $calcCont.find('.calc__form-input_lights');

	var result = 0;

	var tt;

	var putValue = function(result){
		var k = Math.floor(result / 1000);
		var d = Number(result - k * 1000);
		//console.log(k, d, result);
		d = (d < 100) ? (d < 10 ? '00' + d : '0' + d) : d;
		if (k == 0){
			k = '';
		}
		$calcResultCont.text(k + ' ' + d + ' руб.');
	}

	var calculateSum = function(){

		//console.log($calcSquare.attr('class'));
		$calcSquare.addClass('s' + Math.random());
		//console.log($calcSquare.attr('value'));
		//console.log($calcSquare.val());

		var calcSquareValue = Number($calcSquare.val());
		var calcAnglesValue = Number($calcAngles.val());
		var calcLightsValue = Number($calcLights.val());

		if (!calcSquareValue){

			return false;
		}

		result = Math.round(calcSquareValue * 650 + calcAnglesValue * 100 + calcLightsValue * 600);
		putValue(result);
	}


	$calcCont.on('keyup', '.calc__form-input', function(){
		calculateSum();
	})
}

/* fancybox */

$(function(){
	$('.fancyboxed a').fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		tpl: {
			closeBtn : '<div class="popup__close-btn popup__close-btn_gallery"></div>'
		}
	});

	$('.popup-toggler').fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		padding: 0,
		tpl: {
			wrap     : '<div class="fancybox-wrap fancybox-wrap_full" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner fancybox-inner_full"></div></div></div></div>',
			closeBtn : '<div class="popup__close-btn"></div>'

		}
	})

	$('.calc-popup-toggler').fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		padding: 0,
		tpl: {
			wrap     : '<div class="fancybox-wrap fancybox-wrap_full" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner fancybox-inner_full"></div></div></div></div>',
			closeBtn : '<div class="popup__close-btn"></div>'
		},
		afterShow: function(){
			var $cont =  $('.calc__content_popup');
			calcHandler($cont);
		}
	})
})

$(function(){
	var topButton = $('.footer__button-single_beginning');

	topButton.click(function(){
		$('html, body').animate({
			scrollTop: 0
		}, 1500, function(){

		})
	})
})

$(function(){
	var $cont =  $('.calc__content');
	calcHandler($cont);
})

$(function(){
	var selectA = $('.ceiling__sidebar-selectA');
	var selectB = $('.ceiling__sidebar-selectB');
	var cont = $('.ceiling__sidebar-switcher');
	var content = $('.ceiling__content');
	var list = $('.ceiling__sidebar-list');
	var ceilingNum = 0;
	var roomNum = 0;
	var suffix = 'glace';
	var marbie = false;

	selectA.customSelect();
	selectB.customSelect();

	$('.ceiling__sidebar-link').click(function(e){

		e.preventDefault();

		var popupImg = $('.ceiling__img');

		if (!marbie){


			var that = $(this);

			//var colorCont = that.closest('.ceiling__sidebar-item');

			var color = that.css('background-color');
			//console.log(color);
			//popupImg.css('background-color', color);

			popupImg.animate({
				backgroundColor: color
			}, 400)

		} else {
			var that = $(this);
			var color = that.data('color');

			popupImg.removeClass('color_1 color_2 color_3 color_4 color_5 color_6');
			popupImg.addClass('color_' + color);
		}
	})

	selectB.change(function(){
		//console.log(cont.find('.selectBox-label').text());
		ceilingNum = ($(this).val() != 0) ? $(this).val() : 1;
		//console.log($(this).val())

		/*if (ceilingType == '2')
			ceilingNum = 1;
		else if (ceilingType == '1')
			ceilingNum = 0;
		else ceilingNum = 0;*/

		if (ceilingNum == '10'){
			marbie = true;
		} else {
			marbie = false;
		}

		showCeiling(ceilingNum - 1);
		console.log(marbie);
	})

	selectA.change(function(){
		//console.log(cont.find('.selectBox-label').text());
		roomNum = ($(this).val() != 0) ? $(this).val() : 1;
		//console.log($(this).val())

		/*if (ceilingType == '2')
		 ceilingNum = 1;
		 else if (ceilingType == '1')
		 ceilingNum = 0;
		 else ceilingNum = 0;*/

		showRoom(roomNum);
	})

	var showRoom = function(num){
		//suffix = list.find(':visible').data('suffix');
		var $img = $('.ceiling__img');

		$img.removeClass('room_1').removeClass('room_2').removeClass('room_3');
		$img.addClass('room_' + num);
	}

	var showCeiling = function(num){
		list.hide().eq(num).css('display', 'inline-block').find('.ceiling__sidebar-item:first-child .ceiling__sidebar-link').click();
		var suffix = list.eq(num).data('suffix');
		//console.log(num, suffix);
		var numb = 'ceiling__content_' + suffix;

		content.removeAttr('class').addClass('ceiling__content').addClass(numb).addClass('popup__content');
	}

})

/* temp */

$(function(){
	var $obj = $('.comments__smiles-item');
	var $icons = $('.comments__icon');
	var $input = $('.comments__hidden');

	$icons.click(function(){
		$obj.removeClass('active');
		var tmp = $('.' + $(this).data('icon'));
		tmp.addClass('active');
		$input.val(tmp.index());
	})

	$obj.click(function(){
		$obj.removeClass('active');
		$(this).addClass('active');
		$input.val($(this).index());
	})


})

$(function(){
	var $items = $('.comments__item');
	var $texts = $('.comments__text');
	var count = $items.size();
	var $btn = $('.comments__button-single_more');
	var current = 1;
	if (count < 3){
		return false;
	}

	var returnTrue = function(n){
		if (n >= count){
			return n - count;
		} else {
			if (n < 0){
				return n + count;
			} else {
				return n;
			}
		}
	}

	var clearClasses = function(){
		$items.removeClass('comments__item_selected').removeClass('comments__item_prev').removeClass('comments__item_next').removeClass('comments__item_hiding');
	}

	var switchComment = function(n){
		clearClasses();
		$items.eq(n).addClass('comments__item_selected');
		var prev = returnTrue(n - 1);
		$items.eq(prev).addClass('comments__item_prev');
		var next = returnTrue(n + 1);
		$items.eq(next).addClass('comments__item_next');

		var hiding = returnTrue(n + 2);
		$items.eq(hiding).addClass('comments__item_hiding');


		$texts.removeClass('comments__text_selected').eq(n).addClass('comments__text_selected');
	}

	var init = function(){
		switchComment(current);
	}

	$btn.click(function(){
		current = returnTrue(current + 1);
		switchComment(current);
	})

	$items.click(function(e){
		e.preventDefault();

		var target = $(this).index();
		switchComment(target);

		current = target;
	})




	init();

})

$(function(){
	var input = $('.callback__form-time');
	var toggler = $('#callback_time');
	var isBlocked = true;

	var tt = setInterval(function(){
		if ($('#callback_time:checked').length){
			input.removeAttr('disabled');
			isBlocked = false;
		} else {
			input.attr('disabled', 'disabled');
			isBlocked = true;
		}
	}, 200)

})

$(function(){

	var $link = $('.anchor-link');
	var $anchor = $('.anchor');
	var anchorArr = [];
	var currentPos = 0;
	var animating = false;

	$link.click(function(e){
		e.preventDefault();
		if (animating)
			return false;

		if ($(this).closest('li').hasClass('menu__item_selected')){
			return false;
		}

		var $that = $(this);
		var link = $that.data('link');
		var $l = $('.' + link);

		if ($l.length){
			var offset = $l.offset().top;
			console.log(offset.top);
			animating = true;
			$('html, body').animate({
				scrollTop: offset
			}, 1500, function(){
				animating = false;
			})
		}
	})



	var init = function(){
		anchorArr = [];
		$anchor.each(function(){

			var $wrapper = $(this).closest('.section-wrap');

			var $link = $('.anchor-link[data-link=' + $(this).data('name') + ']').closest('li');
			var obj = {
				'posBegin' : $wrapper.offset().top,
				'posEnd' : $wrapper.offset().top + $wrapper.height(),
				'linkObj' : $link,
				'linkIndex' : $link.index()
			}

			//console.log(obj.posBegin, obj.posEnd, obj.linkIndex);

			anchorArr.push(obj);
		})

		//console.log(anchorArr);
		define();
	}

	var mark = function(index){
		$('.menu__item_selected').removeClass('menu__item_selected');
		$('.anchor-link').eq(index).closest('li').addClass('menu__item_selected');
	}

	var defineObject = function(){
		var scrollTop = $(document).scrollTop();
		currentPos = scrollTop + 300;

		for (var index = 0; index < anchorArr.length; ++index) {
			//console.log(currentPos, anchorArr[index]);
			if ((currentPos > anchorArr[index].posBegin) && (currentPos < anchorArr[index].posEnd)){
				return anchorArr[index].linkIndex;
			}
		}

		return false;
	}

	var define = function(){

		var index = defineObject();
		//console.log(currentPos);

		if (currentPos == $(document).height() - 300){
			mark(anchorArr.length - 1);
			return false;
		}

		if (currentPos == 300){
			mark(0);
			return false;
		}

		if (index){
			mark(index);
		}
	}

	init();

	$(window).scroll(function(){
		define();
	})

	$(window).load(function(){
		init();
	})

	$(window).resize(function(){
		init();
	})



})

$(function(){
	var $fh = $('.fluidHeight');

	$fh.height($fh.width() * 0.294117647);

	$(window).resize(function(){
		$fh.height($fh.width() * 0.294117647);
	})
})

$(function(){
	var $toggler = $('.products__nav-item');
	var $content = $('.products__right');

	$toggler.click(function(){
		var index = $(this).index();
		$content.removeClass('products__right_selected').eq(index).addClass('products__right_selected');
		$toggler.removeClass('products__nav-item_selected').eq(index).addClass('products__nav-item_selected');
	})
})

$(function(){
	var $button = $('.feedback__button-cont .button-single');

	$button.click(function(){
		var $that = $(this);
		var $form = $(this).closest('.form__cont').find('form');

		$.ajax({
			type: "POST",
			url: "/inc/s.php",
			data: {
				id : $form.data('id'),
				query : $form.serialize()
				//file : $form.
			},
			success: function(data){
				console.log(data);
				if (data.status == 'success'){
					var parent = $that.closest('.feedback__button-cont');
					parent.html(data.message);
				} else {
					alert(data.message);
				}


			},
			dataType: 'json'
		});

	})
})