$(() => {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(() => {
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: (el) => el.classList.add('loaded')
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')



	// Кнопка 'Вверх'
	$('body').on('click', '.buttonUp button', function(e) {
		e.preventDefault()

		$('body, html').stop(false, false).animate({
			scrollTop: 0
		}, 1000)
	})


	// Скрол к пунктам меню
	$(".scroll").on("click", function(e){
		e.preventDefault();
		let id = $(this).attr("href");

		$("html, body").animate({
				scrollTop: $(id).offset().top + 20
			}, {
				duration: 1500,
				easing: "swing"
		});
	});


	// Fancybox
	// Fancybox.defaults.autoFocus = false
	// Fancybox.defaults.dragToClose = false
	// Fancybox.defaults.l10n = {
	// 	CLOSE: "Закрыть",
	// 	NEXT: "Следующий",
	// 	PREV: "Предыдущий",
	// 	MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	// }



	Fancybox.defaults.template = {
		closeButton: "<img src='images/close.svg'>",
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Моб. версия
	fiestResize = false

	if ($(window).width() < 360) {
		$('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

		fiestResize = true
	}


	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header .menu').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})



$(window).resize(() => {
	// Моб. версия
	if (!fiestResize) {
		$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
		if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

		fiestResize = true
	} else {
		fiestResize = false
	}
})



// Вспомогательные функции
const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}