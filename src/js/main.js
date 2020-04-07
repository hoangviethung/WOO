import {
	Loading
} from './lib/Loading'
import {
	Fullpage
} from './lib/Fullpage'
import {
	TextParticle
} from './lib/Particle'
import TypeIt from "typeit";

const index_particleBackground = () => {
	particlesJS("particle-background", {
		"particles": {
			"number": {
				"value": 80,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 3,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "repulse"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});
}

const index_textTyping = () => {

}

document.addEventListener('DOMContentLoaded', () => {
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
	index_particleBackground();
	TextParticle('#text-particle');
	Loading().then(() => {
		index_textTyping();
	});
})