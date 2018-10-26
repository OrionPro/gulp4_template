
$(document).ready(function () {
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

	// Вешаем обработочик на свою кнопку close
	$(document).on("click", ".mfp-close", function () {
		let magnificPopup = $.magnificPopup.instance;
		magnificPopup.close();
	});
// 	// Открываем модальное окно
	$(".open-popup-link").click(function () {
		let id = $(this).attr('href');
		let idBtn = $(this).data('mfp-src');
		let txt = $(this).data('info');
		// var title =  $(this).data('title'); // для изменения title в модалке
		if(id) {
			if(txt){
				$(`.popup${id} input[name=form_name]`).val(txt);
			}
		} else if(idBtn) {
			if(txt){
				$(`.popup${idBtn} input[name=form_name]`).val(txt);
			}
		}
		// $(`.popup${id} .modal-title`).html(title); // прописать в ссылку data-title="нужный title"
		if (window.matchMedia("(min-width: 992px)").matches) {
			if (get_name_browser() == "Google Chrome") {
				$("html").addClass("modal");
			}
		}
	});
	$(document).on('click', '.open-popup-link', function () {
		$(this).magnificPopup({
			type: 'inline',
			removalDelay: 200,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = this.st.el.attr('data-effect');
					$('input:not("[type=submit], [type=hidden], .select2-search__field")').removeClass('tooltipster-show').tooltipster('close');
				},
				close: function () {
					$('.white-popup .input-wrap > i').hide();
					if (get_name_browser() == "Google Chrome") {
						$("html").removeClass("modal");
					}
					$('input:not("[type=submit], [type=hidden], .select2-search__field")').removeClass('tooltipster-show').tooltipster('close');
					// Это код закрытия эффекта красивого при открытии и закрытии модалки
					$(".cd-transition-layer").addClass("closing"), $("#popup").removeClass("visible"), $(".cd-transition-layer").children().one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function () {
						$(".cd-transition-layer").removeClass("closing opening visible"), $(".cd-transition-layer").children().off("webkitAnimationEnd oanimationend msAnimationEnd animationend")
					})
				},
				open: function () {
					//customScrollbar();
					$(".mfp-close-btn-in .mfp-close").tooltipster({
						theme: 'tooltipster-light'
					});
				}
			},
			closeOnBgClick: true,
			closeOnContentClick: false,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i><i class="fas fa-times"></i></i></button>',
			tClose: 'Закрыть (Esc)',
		}).magnificPopup('open');
	});
})
;
