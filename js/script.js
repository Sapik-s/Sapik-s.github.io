$(document).ready(function(){
	// Обёртка сликов ( $('.slick__wrapper') )
	$('.slick__wrapper').slick({
		// Бесконечно будет крутиться или нет
		infinite: true,
		// Скорость
		speed: 1000,
		// То сколько слайдов будет показываться
		slidesToShow: 1,
		// То, сколько слайдов будет прокручиваться
		slidesToScroll: 1,
		// Стрелки
		prevArrow: '<button type="button" class="slick-prev"><img src="../img/slick/slick_left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="../img/slick/slick_right.png"></button>',
	});

	// Ошибки для формы
	function valideForms(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Пожалуйста введите {0} символа")
				},
				phone: "Пожалуйста введи свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты, name@domain.com"
				}
			}
		});
	};

	// Ошибки, к оторые применятся к формам, установить в html id
	valideForms('#form');
	valideForms('#application');
	valideForms('#order');


	// Табы
	// Класс ul у вкладок по которым будем переключаться $('ul.catalog__navigation-tab-wrapper')
	// При клике на класс будет активная вкладка .on('click', 'li:not(.catalog__navigation-tab-wrapper_active)
	// Вписывать класс Li li:not(.catalog__navigation-tab-wrapper_active)'
	$('ul.catalog__navigation-tab-wrapper').on('click', 'li:not(.catalog__navigation-tab_active)', function() {
		$(this)
		// При нажатии на не активный таб, то он становится активным .addClass('catalog__navigation-tab-wrapper_active')
		// У не активных табов убирает класс активности .removeClass('catalog__navigation-tab-wrapper_active')
		  .addClass('catalog__navigation-tab_active').siblings().removeClass('catalog__navigation-tab_active')
		//   Общая обёртка всего, вкладок и табов ( .closest('div.container') )
		// Обёртка конкретный табов по катериям, для триатлона или для беги и подобное... ( .find('div.catalog__tabs') )
		// Тоже самое что и сверху, только добавляем класс активности ( .removeClass('catalog__tabs_active') ) ----> .eq($(this).index()).addClass('catalog__tabs_active');
		  .closest('div.container').find('div.catalog__tabs').removeClass('catalog__tabs_active').eq($(this).index()).addClass('catalog__tabs_active');
	 });


	

	function toggleSlide(item) {
		// Кнопка подробнее, при нажатии будет появляться текст
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				// Класс той секции при которой по нажатию на кнопку подробнее будет убираться и ставиться другое ( $('catalog__main-visible-tabs') ) -----> добавляем класс активности в HTML .toggleClass('catalog__main-visible-tabs_active')
				$('.catalog__main-visible-tabs').eq(i).toggleClass('catalog__main-visible-tabs_active');
				// Класс обёртки второй секции на который будет меняться при нажати на кнопку подробнее ( $('.catalog__more-wrapper') )
				// Просто добавляем в js класс активности, не нужно добавлять его в HTML ( .toggleClass('catalog__more-wrapper_active') )
				$('.catalog__more-wrapper').eq(i).toggleClass('catalog__more-wrapper_active');
			})
		});

	};

	// Кнопка подробнее
	toggleSlide('.catalog__more');
	// Кнопка Назад
	toggleSlide('.catalog__back');

	// Модальные окна
	// Указать в html data-modal у нужных кнопок и указать класс ( $('[data-modal=application]') )
	$('[data-modal=application]').on('click', function() {
		// Затемненный задний фон, его класс ( $('.modal-forms__overlay, )
		// Кнопка при нажатии на которую будет появляться модальное окно ( #application').fadeIn(); )
		$('.modal-forms__overlay, #application').fadeIn('slow');
	});

	// Класс крестика ( $('.modal-forms__close') )
	$('.modal-forms__close').on('click', function() {
		// Будет закрываться то что не нужно ( $('.modal-forms__overlay, #application, #order, #thanks') )
		$('.modal-forms__overlay, #application, #order, #thanks').fadeOut('slow');
	});

	// Чтоб при нажатии на кнопку в каталоге, в форму подставлялось название товара который выбрали ( $('.button-tabs'). )
	$('.button-tabs').each(function(i) {
		$(this).on('click', function() {
			// Само модальное окно $('#order
			// То что надо поменять на другое, заголовок в модальном окне .modal-forms__subtitle')
			// Заголовок который надо подставить .text($('.catalog__title')
			$('#order .modal-forms__subtitle').text($('.catalog__title').eq(i).text());
			// Команда которая будет показывать модальное окно $('.modal-forms__overlay, #order').fadeIn('slow');
			// Буду следить за всеми кнопками с классом ( $('.button-tabs') )
			$('.modal-forms__overlay, #order').fadeIn('slow');
		})
	});

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	// Отправка писем на почту
	// Обращение ко всем формам $('form').submit(function(e)
	$('form').submit(function(e) {
		// Отменяем стандартное поведение браузера e.preventDefault();
		e.preventDefault();
		$.ajax({
			// Указывем что будем отдавать данные type: "POST"
			type: "POST",
			// То, куда мы будем отправлять наш запрос url: "repository/Heart_Rate_Monitor/mailer"
			url: "repository/Heart_Rate_Monitor/mailer",
			// Данные которые хочу отправить на сервер data: $(this).serialize()
			data: $(this).serialize()
		}).done(function() {
			// Находим то, что внутри нашей формы $(this).find("input")
			// Очищает формы после отправки .val("")
			$(this).find("input").val("");
			// Закрываем ненужные формы, для того чтоб потом высветилась форма благодарнсоти $('#application, #order').fadeOut();
			$('#application, #order').fadeOut();
			// Появление затемненного экрана и окна благодарности, с медленной скоростью $('.modal-forms__overlay, #thanks').fadeIn('slow');
			$('.modal-forms__overlay, #thanks').fadeIn('slow');
			// Чтоб все формы очистились в конце $('form').trigger('reset');
			$('form').trigger('reset');
		});
		return false;
	});


	// Скрипт для стрелки вверх
	$(window).scroll(function() {
		// Пролистывая 1600 пикселей появится стрелка
		if ($(this).scrollTop() > 1600) {
			// Указать класс ссылки, внутри которой находится изображение со стрелкой
			$('.up').fadeIn();
		} else {
			// Указать класс ссылки, внутри которой находится изображение со стрелкой
			$('.up').fadeOut();
		}
	});

	// Плавный скролл наверх
	$("a[href^='#']").click(function(){
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	// Для анимации
	new WOW().init();
});