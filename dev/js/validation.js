$(document).ready(function () {
	//  Отправка форм
// initialize tooltipster on text input elements
	$('input:not("[type=submit], [type=hidden], [type=file]")').tooltipster({
		trigger: 'none', // чтобы при ховере и клике не вылетало окошко с ошибкой ставим none. Либо hover/click по надобности
		position: 'bottom',
		theme: 'tooltipster-shadow',
		functionPosition: function (instance, helper, position) {
			position.coord.top -= 10;
			return position;
		}
	});
	$('form').tooltipster({
		trigger: 'none',
		position: 'top',
		animation: 'grow',
		theme: 'tooltipster-shadow'
	});
	$('input[type=file]').tooltipster({
		trigger: 'none', // чтобы при ховере и клике не вылетало окошко с ошибкой ставим none. Либо hover/click по надобности
		position: 'bottom',
		theme: 'tooltipster-shadow',
		functionPosition: function (instance, helper, position) {
			position.coord.top -= 10;
			return position;
		}
	});
	$('textarea').tooltipster({
		trigger: 'none', // чтобы при ховере и клике не вылетало окошко с ошибкой ставим none. Либо hover/click по надобности
		position: 'bottom',
		theme: 'tooltipster-shadow',
		functionPosition: function (instance, helper, position) {
			position.coord.top -= 10;
			return position;
		}
	});
// Добавляем методы для validator
	$.validator.addMethod("extension", function (value, element, param, size) {
		param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|gif|txt|pdf|docx|doc|xlsx";
		return this.optional(element) || value.match(new RegExp("\\.(" + param + ")$", "i"));
	}, $.validator.format("Выберите файл с правильным расширением."));

	$.validator.addMethod('filesize', function (value, element, param) {
		return this.optional(element) || ((element.files[0].size / 1024).toFixed(0) <= param)
	}, 'Размер файла не должен превышать 10 мегабайт');

	$.validator.addMethod('customphone', function (value, element) {
		return this.optional(element) || /^(\+|d+)*\d[\d\(\)\-]{4,14}\d$/.test(value);
	}, "Введите телефон в правильном формате");

	$.validator.addMethod('customemail', function (value, element) {
		return this.optional(element) || /^(([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+\.)*([a-zA-Z0-9\-]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/.test(value);
	}, "Введите правильный Email");

	$.validator.addMethod('customphonemask', function (value, element) {
		return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
	}, "Введите телефон согласно маске");
	$.each($("form"), function () {
		$(this).validate({
			submit: true,
			errorPlacement: function (error, element) {
				var ele = $(element),
					err = $(error),
					msg = err.text();
				if (msg != null && msg !== "") {
					ele.tooltipster('content', msg);
					ele.tooltipster('show'); //open only if the error message is not blank. By default jquery-validate will return a label with no actual text in it so we have to check the innerHTML.
					$(element).siblings('i').hide('fade');
				}
			},
			success: function (label, element) {
				$(element).tooltipster('hide');
				$(element).tooltipster('close');
				$(element).siblings('i').show('fade');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass(errorClass).addClass(validClass).tooltipster('close');
			},
			rules: {
				name: {
					required: true,
				},
				textarea: {
					required: false, // не валидируется
				},
				email: {
					required: true,
					customemail: "customemail"
				},
				phone: {
					required: true,
					customphone: "customphone"
				},
				phone_mask: {
					required: true,
					customphonemask: "customphonemask"
				},
				field: {
					required: true,
					extension: "txt|pdf|docx|doc|xlsx|gif|png|jpeg|jpe|jpg",
					filesize: 10000
				}
			},
			messages: {
				name: {
					required: "Заполните поле"
				},
				textarea: {
					required: "Заполните поле"
				},
				email: {
					required: "Введите свой email"
				},
				phone: {
					required: "Введите свой телефон"
				},
				phone_mask: {
					required: "Введите свой телефон"
				},
				field: {
					required: "Выберите файл"
				}
			},
			submitHandler: function (form) {
			}
		});
	});
	$("form:not('#form-file')").submit(function () {
		if ($(this).valid()) {
			let self = $(this);
			let data = self.serialize();
			$.ajax({
				type: "POST",
				url: "./mail.php",
				data: data,
				dataType: "json",
				beforeSend: function () { // событие до отправки
					self.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
				},
				success: function (data) {
					if (data['form_type'] == 'modal') {
						$('.white-popup form').hide();
						$('.white-popup .mfp-close').hide();
						self.trigger('reset');
						$('.white-popup .success_mail').addClass('active');
						setTimeout(function () {
							$.magnificPopup.close();
						}, 2500);
						setTimeout(function () {
							$('.white-popup form').show();
							$('.white-popup .mfp-close').show();
							$('.white-popup .input-wrap i').hide();
							$('.white-popup .success_mail').removeClass('active');
							self.find('input[type="submit"]').attr('disabled', false);
						}, 3500);
					}
					if (data['form_type'] == 'normal') { //надо писать в обычных формах <input type="hidden" name="form_type" value="normal">
						self.trigger('reset');
						$.magnificPopup.open({
							items: {
								src: $('#popup-success')
							},
							type: 'inline'
						});
						setTimeout(function () {
							$.magnificPopup.close();
							$('form .input-wrap i').hide();
							self.find('input[type="submit"]').attr('disabled', false);
						}, 3000);
					}
				}
			});
		}
		return false;
	});

//  Отправка форм с файлом вносим input[type=file]
	let files;
	$('input[type=file][name=field]').change(function () {
		files = this.files;
	});
//  Отправка форм с файлом submit
	$("#form-file").on('submit', function (e) { // перехватываем все при событии отправки
		if ($(this).valid()) {
			let $data = new FormData(),
				form = $(this),
				$inputs = $("#form-file").find('input[type=hidden]'),
				$phone = $("#form-file").find('input[name=phone]'),
				$phoneMask = $("#form-file").find('input[name=phone_mask]'),
				$email = $("#form-file").find('input[name=email]'),
				$name = $("#form-file").find('input[name=name]'),
				$textarea = $("#form-file").find('textarea');

			$.each(files, function (key, value) {

				$data.append(key, value);
			});

			$.each($inputs, function (key, value) {
				$data.append($(this).attr('name'), $(this).val());
			});

			//добавление основных тестовых полей вместо serialize
			$data.append($textarea.attr('name'), $textarea.val());
			$data.append($phone.attr('name'), $phone.val());
			$data.append($phoneMask.attr('name'), $phoneMask.val());
			$data.append($email.attr('name'), $email.val());
			$data.append($name.attr('name'), $name.val());

			$.ajax({
				url: './mail.php',
				type: 'POST',
				contentType: false,
				processData: false,
				dataType: 'json',
				data: $data,
				beforeSend: function (loading) {
					$('input[type=file]').tooltipster('content', "Файл загружается");
					$('input[type=file]').tooltipster('show');
				},
				success: function (data) {
					if (data['form_type'] == 'normal') { //надо писать в обычных формах <input type="hidden" name="form_type" value="normal">
						$('input[type=file]').tooltipster('content', "Файл загружен!");
						$('input[type=file]').tooltipster('show');
						form.tooltipster('content', "Письмо отправлено!");
						form.tooltipster('show');
						setTimeout(function () {
							form.trigger('reset');
							form.find('i').hide();
							files = undefined;
							$('input[type=file]').tooltipster('hide');
						}, 2000);
						setTimeout(function () {
							form.tooltipster('hide');
						}, 3500);
						// Вариант с показом модального окна с success
						// $('input[type=file]').tooltipster('content', "Файл загружен!");
						// $('input[type=file]').tooltipster('show');
						// self.trigger('reset');
						// $.magnificPopup.open({
						// 	items: {
						// 		src: $('#popup-success')
						// 	},
						// 	type: 'inline'
						// });
						// //$("body").css({ "overflow": "hidden", "padding-right": "17px" });
						// setTimeout(function () {
						// 	$.magnificPopup.close();
						// 	$('form').find('i').hide();
						// 	files = undefined;
						// 	self.find('input[type="submit"]').attr('disabled', false);
						// 	//$("body").css({ "overflow": "inherit", "padding-right": "0" });
						// }, 3000);
					}

				}
			});
		}
		return false;
	});
});
