import { Loading } from './lib/Loading'
import { Fullpage } from './lib/Fullpage'
import { TextParticle } from './lib/Particle'
import TypeIt from 'typeit'

const index_particleBackground = () => {
	particlesJS('particle-background', {
		particles: {
			number: { value: 50, density: { enable: true, value_area: 800 } },
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
				anim: { enable: false, speed: 10, size_min: 0.1, sync: false },
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
				repulse: { distance: 200, duration: 0.4 },
				push: { particles_nb: 4 },
				remove: { particles_nb: 2 },
			},
		},
		retina_detect: true,
	})
}

const index_logoParticle = () => {
	if (document.querySelector('#text-particle')) {
		TextParticle('#text-particle')
	}
}

const index_textTyping = () => {
	if (
		document.querySelector('#slogan-2') &&
		document.querySelector('#slogan-1')
	) {
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

const index_fullpage = () => {
	const fullpage = new Fullpage('#fullpage')
	fullpage.init(function (fp) {
		if (fp instanceof Fullpage) {
			fp.letters = Array.from(
				document.querySelectorAll('.fp-layer-text .letter')
			)
			fp.backgrounds = Array.from(
				document.querySelectorAll(
					'.fp-layer-background-color .fp-layer-color'
				)
			)
			fp.slides.forEach((letter, index) => {
				fp.letters[index].setAttribute('fp-index', index)
				fp.backgrounds[index].setAttribute('fp-index', index)
				if (index === 0) {
					fp.letters[index].classList.add('active')
					fp.backgrounds[index].classList.add('active')
				}
			})
		}
	})
}

document.addEventListener('DOMContentLoaded', () => {
	index_fullpage()
	index_particleBackground()
	index_logoParticle()

	// scripts run after loading
	Loading().then(() => {
		index_textTyping()
	})
})
