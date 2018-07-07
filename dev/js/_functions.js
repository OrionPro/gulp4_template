// подключение functions.js

$(function () {
	//SVG Fallback
	// if(!Modernizr.svg) {
	//  $("img[src*='svg']").attr("src", function() {
	//      return $(this).attr("src").replace(".svg", ".png");
	//  });
	// };
});
//изменяется - для плавной обратной анимации animate.css*/
// $(window).scroll(function () {
// 	// для правильной работы надо прописать в блок которому присваивается анимация атрибут data-anim="fadeInLeft" с названием анимации
// 	$('.animated').each(function () {
// 		var imagePos = $(this).offset().top;
// 		var imageHght = $(this).outerHeight();
// 		var topOfWindow = $(window).scrollTop() + 40;
// 		var heightOfWindow = $(window).height();
// 		var animName = $(this).data('anim');
// 		if (!$(this).data('atop')) {
// 			var animTop = 0.9;
// 		} else {
// 			var animTop = $(this).data('atop');
// 		}
// 		if (imagePos < topOfWindow + heightOfWindow * animTop && imagePos + imageHght > topOfWindow) {
// 			$(this).css('visibility', 'visible').addClass(animName);
//
// 		} else if (imagePos + imageHght < topOfWindow || imagePos > topOfWindow + heightOfWindow) {
// 			$(this).css('visibility', 'hidden').removeClass(animName);
// 		}
// 	});
// });

// Initialize Slidebars
(function ($) {
	// Initialize Slidebars
	var controller = new slidebars();
	controller.init();

	// Toggle Slidebars
	$('#nav-button-label').on('click', function (event) {
		// Stop default action and bubbling
		event.stopPropagation();
		event.preventDefault();
		// Toggle the Slidebar with id 'id-1'
		controller.toggle('id-1');
		$("html,body").toggleClass("slidebars");
	});

	// Close Slidebar links
	$('[off-canvas] a').on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();

		var url = $(this).attr('href'),
			target = $(this).attr('target') ? $(this).attr('target') : '_self';

		$("#nav-button-label").removeClass("nav-on");
		$("#nav-button-label .nav-line").removeClass("active");
		$("html,body").removeClass("slidebars");
		controller.close(function () {
			window.open(url, target);
		});
	});

	// Add close class to canvas container when Slidebar is opened
	$(controller.events).on('opening', function (event) {
		$('[canvas]').addClass('js-close-any');
	});
	// Add close class to canvas container when Slidebar is opened
	$(controller.events).on('closing', function (event) {
		$('[canvas]').removeClass('js-close-any');
	});
	// Close any
	$(document).on('click', '.js-close-any', function (event) {
		if (controller.getActiveSlidebar()) {
			event.preventDefault();
			event.stopPropagation();
			$("#nav-button-label").removeClass("nav-on");
			$("#nav-button-label .nav-line").removeClass("active");
			$("html,body").removeClass("slidebars");
			controller.close();

		}
	});
})($);

$(document).ready(function () {
	var md = new MobileDetect(window.navigator.userAgent);

	if (md.userAgent() == "Safari" && md.mobile() == "iPhone" || md.mobile() == "iPad") {
		$("html,body").css("overflow", "hidden !important");
	}


	// Select в модальном окне
	$(document).click(function (event) {
		if ($(event.target).closest(".select").length)
			return;
		$('.slct').removeClass('active');
		$('.slct_arrow').removeClass('active');
		$('.slct').parent().find('.drop').slideUp("fast");
		event.stopPropagation();
	});
	$('.slct_arrow').on('click', function () {
		$(this).siblings('.slct').trigger('click');
	});
	$('.slct').click(function () {
		/* Заносим выпадающий список в переменную */
		const dropBlock = $(this).parent().find('.drop');
		//  закрываем все открытые
		$('.slct').removeClass('active').parent().find('.drop').slideUp("fast");
		$('.slct').siblings('.slct_arrow').removeClass('active');
		/* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
		if (dropBlock.is(':hidden')) {
			dropBlock.slideDown();

			/* Выделяем ссылку открывающую select */
			$(this).addClass('active');
			$(this).siblings(".slct_arrow").addClass('active');


			/* Работаем с событием клика по элементам выпадающего списка */
			$('.drop').find('li').off("click").click(function () {

				/* Заносим в переменную HTML код элемента
				 списка по которому кликнули */
				const selectAllResult = $(this).html();
				const selectText = $(this).find('span').text();

				/* Передаем значение переменной selectAllResult в ссылку которая
				 открывает наш выпадающий список и удаляем активность */
				$(this).parents(".select").find(".slct").removeClass('active').html(selectAllResult);

				/* Находим наш скрытый инпут и передаем в него
				 значение из переменной selectText */
				$(this).parents(".select").find('input').val(selectText);

				$(".slct_arrow").removeClass('active');

				/* Скрываем выпадающий блок */
				dropBlock.slideUp();
			});

			/* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
		} else {
			$(this).removeClass('active');
			$(".slct_arrow").removeClass('active');
			dropBlock.slideUp();
		}

		/* Предотвращаем обычное поведение ссылки при клике */
		return false;
	});
	// отслеживаем изменение инпута file
	$('input[type=file]').change(function() {
		// Если файл прикрепили то заносим значение value в переменную
		var fileResult = $(this).val();
		// И дальше передаем значение в инпут который под загрузчиком
		$(this).parent().find('.fileLoad').find('input').val(fileResult);
	});

	/* Добавляем новый класс кнопке если инпут файл получил фокус */
	$('input[type=file]').hover(function() {
		$(this).parent().find('button').addClass('button-hover');
	}, function() {
		$(this).parent().find('button').removeClass('button-hover');
	});
	//обработчик кнопки на нажатие btn_mnu
	$("#nav-button-label").click(function (e) {
		e.preventDefault();
		$(this).toggleClass('nav-on'); // добавляет класс для анимации самой кнопки
		$(this).next().slideToggle(); // открывает меню main_nav_block, которое было скрыто
		$(this).find('.nav-line').toggleClass('active');
		$(".mnu_dropdown").toggleClass("active");
	});
	// Скрыть элемент при клике за его пределами бутерброд и его выпадающее меню
	$(document).click(function (event) {
		if ($(event.target).closest("#nav-button-label").length)
			return;
		if ($(event.target).closest("[off-canvas]").length)
			return;
		$("#nav-button-label").removeClass("nav-on");
		$("#nav-button-label .nav-line").removeClass("active");

		event.stopPropagation();

	});
});
