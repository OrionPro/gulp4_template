// функция throttle
function throttle(func, ms) {

	var isThrottled = false,
		savedArgs,
		savedThis;

	function wrapper() {

		if (isThrottled) { // (2)В этом состоянии все новые вызовы запоминаются в замыкании через savedArgs/savedThis. Обратим внимание, что и контекст вызова и аргументы для нас одинаково важны и запоминаются одновременно. Только зная и то и другое, можно воспроизвести вызов правильно.
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments); // (1)Декоратор throttle возвращает функцию-обёртку wrapper, которая при первом вызове запускает func и переходит в состояние «паузы» (isThrottled = true).

		isThrottled = true;

		setTimeout(function () {
			isThrottled = false; // (3)Далее, когда пройдёт таймаут ms миллисекунд – пауза будет снята, а wrapper – запущен с последними аргументами и контекстом (если во время паузы были вызовы).
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}
// табы tabs
// для parents в чистом js
// matches это для IE ибо в parents применяется проверка
;(function(e) {
	var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
	!matches ? (e.matches = e.matchesSelector = function matches(selector) {
		var matches = document.querySelectorAll(selector);
		const th = this;
		return Array.prototype.some.call(matches, function(e) {
			return e === th;
		});
	}) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);

Element.prototype.parents = function(selector) {
	let elements = [];
	let elem = this;
	const ishaveselector = selector !== undefined;

	while ((elem = elem.parentElement) !== null) {
		if (elem.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}

		if (!ishaveselector || elem.matches(selector)) {
			elements.push(elem);
		}
	}

	return elements;
};

function tabs(obj) {
	const buttons = document.querySelectorAll(obj.btn);

	let func = function (e) {
		"use strict";
		e.preventDefault();
		// AllWrap - общий родитель, его можно упустить в инициализации, если придерживаться стандартной разметки, когда обёртка кнопок (ссылок) таба и есть общий родитель(т.е. .parentNode.parentNode у кнопки находит сразу общего родителя)
		const thisAllWrap = obj.AllWrap ? this.parents(obj.AllWrap)[0] : this.parentNode.parentNode;
		const thisButtons = this.parentNode.parentNode.querySelectorAll(obj.btn);
		const thisBodyTabs = thisAllWrap.querySelectorAll(obj.tabsBody);

		for (let i = thisButtons.length; i--;) {
			thisButtons[i].classList.remove(obj.classBtn);
			thisBodyTabs[i].classList.remove(obj.classBody);
		}
		this.classList.add(obj.classBtn);
		let item = [].indexOf.call(thisButtons, this);
		thisBodyTabs[item].classList.add(obj.classBody)
	};

	[].forEach.call(buttons, item => item.addEventListener('click', func));
}
// ограничение символов
function limitSymbol(obj){
	$.each($(obj.elem), function () {
		const self = $(this).text();
		let str = self.slice(0, obj.maxSymbol); //например макс 100 символов
		const a = str.split(' ');
		a.splice(a.length - 1, 1);
		str = a.join(' ');
		if ($(this).text().length >= obj.maxSymbol + 10) {
			$(this).addClass(obj.activeClass); // добавляем активный класс по надобности
			$(this).html(str + ' ...');
		}
	});
}
// Определения браузера
function get_name_browser() {
	// получаем данные userAgent
	const ua = navigator.userAgent;
	// с помощью регулярок проверяем наличие текста,
	// соответствующие тому или иному браузеру
	if (ua.search(/Edge/) > 0) return 'Edge';
	if (ua.search(/Chrome/) > 0) return 'Google Chrome';
	if (ua.search(/Firefox/) > 0) return 'Firefox';
	if (ua.search(/Opera/) > 0) return 'Opera';
	if (ua.search(/Safari/) > 0) return 'Safari';
	if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
	if (ua.search(/Trident/) > 0) return 'Trident';
	// условий может быть и больше.
	// сейчас сделаны проверки только
	// для популярных браузеров
	return 'Не определен';
}
// решаем вопрос с min-height 100% у safari до версии 11
function heightItemSafari(obj) {
	let heightItem =  $(obj.itemHeight).outerHeight();
	$(obj.item).css("min-height", heightItem );
}
// Создаём цикл для инициализации mCustomScrollbar в нужных select
// function customScrollbar() {
// 	$(document).find('.select .select__drop').each(function () {
// 		// var log = '';
// 		// var height = $(this).height();
// 		// log += 'Высота элементов: ' + height;
// 		// console.log(log);
// 		if ($(this).height() >= 190) {
// 			$(this).mCustomScrollbar({
// 				theme: "my-theme"
// 			});
// 		}
// 	});
// }
// селекты с статическим текстом
function selectStaticTxt() {
	$(".select.select__static_txt").each(function () {
		const widthSpan = $(this).find("span.select__static-txt").width();
		$(this).find('.select__link').css('paddingLeft', widthSpan + 20);
	});
}

$(document).ready(function () {
	// вызов
	selectStaticTxt();
	// пример limitSymbol
	limitSymbol({
		elem: '.tabs-all-items-wrap .tabs-wrap p',
		maxSymbol: 150,
		activeClass: 'trim'
	});
	// инициализация svg4everybody ,смотреть в описании к шаблону или видео
	svg4everybody({});
	// вводим только цифры
	$("input.only-num").on('keydown', function ({keyCode,ctrlKey} = e) {

		// Разрешаем нажатие клавиш backspace, Del, Tab и Esc
		if (keyCode == 46 || keyCode == 8 || keyCode == 9 || keyCode == 27 ||
			// Разрешаем выделение: Ctrl+A
			(keyCode == 65 && ctrlKey === true) ||
			// Разрешаем клавиши навигации: Home, End, Left, Right
			(keyCode >= 35 && keyCode <= 39)) {
			return;
		}
		else {
			// Запрещаем всё, кроме клавиш цифр на основной клавиатуре, а также Num-клавиатуре
			if ((keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105)) {
				event.preventDefault();
			}
		}
	});
	// при клике делаем некликбельным
	$('label.click-disabled').on('click', function () {
		var self = $(this);
		setTimeout(function () {
			self.find('input').attr('disabled', true);
		}, 50);
	});

	$("body").addClass("ink-transition");

	//sticky
	// не забываем, что нужно делать прилипающим сам элемент, а не его обёртку
	var sticky = new Sticky('.sticky');
	// пример анимации через библиотечку animat (но лучше анимировать через GSAP)
	//$('.our-advantages h2').animated("fadeInUp");

	// инициализация tooltipster
	if (window.matchMedia("(min-width: 992px)").matches) {
		$(".header__modal a").tooltipster({
			plugins: ['follower'],
			theme: 'tooltipster-shadow'
		});
		$(".header__logo a").tooltipster({
			theme: 'tooltipster-light'
		});
	}
	//  Активация слайдера
	$(".owl-carousel").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		nav: true
	});
	// инициализация swiper слайдера
	const swiper = new Swiper('.swiper-container', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	// инициализация select2
	$(".select2").select2({
		//minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		placeholder: "Выберите язык",
		width: '100%'
	});
	$(".select2-tags").select2({
		tags: true,
		placeholder: "Выберите один или несколько тегов",
		width: '100%'
	});
	// Инициализация маски в input
	$(".mask").mask("+38(999) 999-99-99");
	// если использем customScrollbar инициализируем
	//customScrollbar();
	// вызов tabs
	tabs({
		btn:'.tabs-items-wrap > .tabs-item',
		tabsBody:'.tabs-wrap',
		classBody:'active',
		classBtn: 'active'
	});
	tabs({
		btn:'.tabs-items-wrap-inner > .tabs-item',
		tabsBody:'.tabs-wrap-inner',
		classBody: 'active',
		classBtn:'active'
	});
	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Firefox") {
		// $(".from_what_is_seo .from_what_is_seo_bot_decor svg").css("bottom", "-217px");
		// $(".website_promotion .website_promotion_decor").css("bottom", "-177px");
		// $(".cost_of_online_store .cost_of_online_store_links_item").css("margin-right", "72px");
	}

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Edge") {
		$('.check i, .radio i').css("margin-top", "2px")
	}
	if (get_name_browser() == "Google Chrome") {
		console.log("Google Chrome");

	}
	if (get_name_browser() == "Safari") {
		console.log("Safari");
		// heightItemSafari({
		// 	itemHeight: '.info-blocks__item-txt-block',
		// 	item:  '.info-blocks__btn'
		// });
	}
	// для инициализации tooltips
	// $( document ).tooltip({
	//   track: true
	// });

	// скролл по ссылке с атрибутом href
	// $(".header_nav a[href*='#']").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $(anchor.attr('href')).offset().top
	//     }, 500);
	//     return false;
	// });

	// Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
	// $(".scroll_to").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $("#" + anchor.data('scroll')).offset().top
	//     }, 500);
	//     return false;
	// });

	//  Активация слайдера
	// $(".owl-carousel").owlCarousel({
	//     loop: true,
	//     items: 1,
	//     dots: true
	// });

	// Кастомные кнопки управления слайдером
	// var owl = $('.owl-carousel');
	// owl.owlCarousel();
	// // Go to the next item
	// $('.customNextBtn').click(function() {
	//     owl.trigger('next.owl.carousel', [700]);
	// });
	// // Go to the previous item
	// $('.customPrevBtn').click(function() {
	//     // With optional speed parameter
	//     // Parameters has to be in square bracket '[]'
	//     owl.trigger('prev.owl.carousel', [700]);
	// });
});

$(window).on('resize', throttle(function () {
	// здесь затормаживаем функции
}, 150));

$(window).resize(function () {

});

$(window).scroll(function () {

});

// setTimeout(function () {
// 	$(".loader_inner").fadeOut();
// 	$(".loader").fadeOut("fast");
// },100);