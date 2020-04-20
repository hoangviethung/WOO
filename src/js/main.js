import { Loading } from './lib/Loading'
import { Fullpage } from './lib/Fullpage'
import { TextParticle } from './lib/Particle'
import { setHeight, getSVGs } from './util/utilities'
import TypeIt from 'typeit'

const page = document.querySelector('#js-page-verify')
const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

const addClassBody = () => {
	const pageVerify = document.querySelector('#js-page-verify')
	if (pageVerify) {
		const bodyClassName = pageVerify.getAttribute('class')
		document.body.classList.add(bodyClassName)
	}
}

const toggleHeader = () => {
	const toggleMenuButton = document.querySelector('.header__toggle-menu')
	const navListWrapper = document.querySelector('.header__nav-list')
	toggleMenuButton.addEventListener('click', (e) => {
		e.preventDefault()
		toggleMenuButton.classList.toggle('active')
		navListWrapper.classList.toggle('active')
	})
}

const checkColor = () => {
	const dataHeader = document.querySelector('[data-header]')
	const breadcrumb = document.querySelector('.breadcrumb')
	if (dataHeader) {
		if (
			!page.classList.contains('index-page') &&
			!header.classList.contains('changed')
		) {
			header.classList.add(dataHeader.getAttribute('data-header'))
		} else {
			header.classList.remove(dataHeader.getAttribute('data-header'))
		}
		if (breadcrumb) {
			breadcrumb.classList.add(dataHeader.getAttribute('data-header'))
		}
	}
}

const effectHeaderNotInIndex = () => {
	let isHeaderLocked = false

	if (!page.classList.contains('index') && window.innerWidth > 1024) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 0) {
				if (isHeaderLocked == false) {
					header.classList.add('move-up')
					isHeaderLocked = true
					setTimeout(() => {
						header.classList.add('changed')
						header
							.querySelector('.header__logo')
							.classList.add('show')
						header.classList.remove('move-up')
						checkColor()
					}, 300)
				}
			} else {
				header.classList.add('move-up')
				setTimeout(() => {
					header.classList.remove('changed')
					header
						.querySelector('.header__logo')
						.classList.remove('show')
					header.classList.remove('move-up')
					checkColor()
				}, 300)
				isHeaderLocked = false
			}
		})
	}
}

const setHeightForSomeItemHaveAttribute = () => {
	const items = Array.from(document.querySelectorAll('[data-ratio]'))
	for (let i = 0; i < items.length; i++) {
		const ratio = Number(items[i].getAttribute('data-ratio'))
		const itemWidth = items[i].clientWidth
		items[i].style.height = `${itemWidth / ratio}px`
	}
}

const index_particleBackground = () => {
	if (
		document.querySelector('#particle-background') &&
		window.innerWidth > 1024
	) {
		particlesJS('particle-background', {
			particles: {
				number: {
					value: 50,
					density: { enable: true, value_area: 800 },
				},
				color: { value: ['#f1667f', '#dfdfdf'] },
				shape: {
					type: 'circle',
					stroke: { width: 0, color: '#000000' },
				},
				opacity: {
					value: 1,
					random: true,
					anim: {
						enable: true,
						speed: 1.3586413586413588,
						opacity_min: 0.3,
						sync: false,
					},
				},
				size: {
					value: 15,
					random: true,
					anim: {
						enable: false,
						speed: 10,
						size_min: 0.1,
						sync: false,
					},
				},
				line_linked: {
					enable: false,
				},
				move: {
					enable: true,
					speed: 1,
					direction: 'none',
					random: false,
					straight: false,
					out_mode: 'out',
					bounce: false,
					attract: { enable: false, rotateX: 600, rotateY: 1200 },
				},
			},
			interactivity: {
				detect_on: 'window',
				events: {
					onhover: { enable: true, mode: ['repulse'] },
					onclick: { enable: false },
					resize: true,
				},
				modes: {
					grab: { distance: 400, line_linked: { opacity: 1 } },
					bubble: {
						distance: 400,
						size: 40,
						duration: 2,
						opacity: 8,
						speed: 3,
					},
					repulse: { distance: 150, duration: 0.75 },
					push: { particles_nb: 4 },
					remove: { particles_nb: 2 },
				},
			},
			retina_detect: true,
		})
	}
}

const index_textTyping = () => {
	const slg1 = document.querySelector('#slogan-1')
	const slg2 = document.querySelector('#slogan-2')
	if (slg1 && slg2) {
		slg1.innerHTML = ''
		slg2.innerHTML = ''
		slg1.removeAttribute('style')
		slg2.removeAttribute('style')
		const SLOGAN_2 = new TypeIt('#slogan-2', {
			waitUntilVisible: true,
			speed: 100,
			afterComplete: () => {
				SLOGAN_1.reset().go()
				SLOGAN_2.reset()
			},
		})
			.type('master a ma')
			.pause(300)
			.delete(-4, {
				speed: 100,
			})
			.type('the market with')
			.pause(500)
			.type(' creative')
			.pause(2000)

		const SLOGAN_1 = new TypeIt('#slogan-1', {
			waitUntilVisible: true,
			speed: 200,
			cursorChar: '',
			afterComplete: () => {
				SLOGAN_2.go()
			},
		})
			.type('MEDIA')
			.pause(500)
			.go()
	}
}

const index_logoParticle = () => {
	if (document.querySelector('#text-particle')) {
		TextParticle('#text-particle', index_textTyping)
	}
}

const index_fullpage = () => {
	if (document.querySelector('#fullpage') && window.innerWidth > 1024) {
		return new Fullpage('#fullpage', {
			on: {
				afterChangeSlide: function (fullpage, state) {
					// script run when every slide change complete
					setHeight('.letter-m', 1)
					const headerStyle = fullpage.slides[
						fullpage.state.currentIndex
					].getAttribute('data-header')
					header.classList.remove('white', 'black')
					header.classList.add(headerStyle)
					const fpNav = document.querySelector('#fp-navigation')
					fpNav.classList.remove('white', 'black')
					fpNav.classList.add(headerStyle)
				},
				init: function (fullpage) {
					if (fullpage instanceof Fullpage) {
						fullpage.letters = Array.from(
							document.querySelectorAll('.fp-layer-text .letter')
						)
						fullpage.backgrounds = Array.from(
							document.querySelectorAll(
								'.fp-layer-background-color .fp-layer-color'
							)
						)
						for (let i = 0; i < fullpage.slides.length; i++) {
							fullpage.letters[i].setAttribute('fp-index', i)
							fullpage.backgrounds[i].setAttribute('fp-index', i)
							if (i === 0) {
								fullpage.letters[i].classList.add('active')
								fullpage.backgrounds[i].classList.add('active')
							}
						}
					}
				},
			},
		})
	}
}

const popupDownload = () => {
	$('.ri2__item').on('click', function (e) {
		e.preventDefault()
		const documentImageSrc = $(this).find('.item__img>img').attr('src')
		const documentId = $(this).attr('data-id')
		const documentField = $('#popup-download #document-id')
		documentField.val('')
		documentField.val(documentId)
		const img = document.createElement('img')
		$(img).attr('src', documentImageSrc)
		$('#popup-download .popup__image').html($(img))
		$.fancybox.open({
			src: '#popup-download',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
			},
		})
	})
}

const setPaddingBreadcrumb = () => {
	const breadcrumb = document.querySelector('.breadcrumb-wrapper')
	if (breadcrumb) {
		const heightOfHeader = document.querySelector('header').clientHeight
		breadcrumb.style.top = heightOfHeader + 'px'
		breadcrumb.style.position = 'absolute'
	}
}

const checkFooter = () => {
	const mainHeight = main.clientHeight
	const footerHeight = footer.clientHeight
	if (mainHeight + footerHeight < window.innerHeight) {
		footer.style.position = 'fixed'
		footer.style.width = '100%'
		footer.style.bottom = '0'
		footer.style.left = '0'
		footer.style.zIndex = '2'
	} else {
		footer.removeAttribute('style')
	}
}

document.addEventListener('DOMContentLoaded', () => {
	addClassBody()
	toggleHeader()
	checkColor()
	effectHeaderNotInIndex()
	setPaddingBreadcrumb()
	getSVGs('.svg')
	setHeightForSomeItemHaveAttribute()
	index_fullpage()
	index_particleBackground()

	popupDownload()
	// scripts run after loading
	checkFooter()

	const wowOpts = {
		boxClass: 'wow', // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset: 100, // distance to the element when triggering the animation (default is 0)
		mobile: true, // trigger animations on mobile devices (default is true)
		live: true, // act on asynchronously loaded content (default is true)
		callback: function (box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null, // optional scroll container selector, otherwise use window,
		resetAnimation: true,
	}
	if (page.classList.contains('index-page')) {
		if (window.innerWidth <= 1024) {
			new WOW(wowOpts).init()
		}
	} else {
		new WOW(wowOpts).init()
	}
	Loading().then(() => {
		index_logoParticle()
	})
})

window.addEventListener('resize', () => {
	setHeight('.letter-m', 1)
	setHeightForSomeItemHaveAttribute()
	setPaddingBreadcrumb()
	checkFooter()
})
