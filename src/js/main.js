import Cookie from "./lib/Cookie";
import Loading from "./lib/Loading";
import getSvg from "./lib/GetSVG";
import Fullpage from "./lib/Fullpage";
import ImageParticle from "./lib/ImageParticle";

const setSizeForCharacterImage = () => {
	const wRatio = 656 / 520;
	const oRatio = 1;
	const mRatio = 655 / 499;
	const wCharacters = Array.from(document.querySelectorAll('.character-w'));
	const oCharacters = Array.from(document.querySelectorAll('.character-o'));
	const mCharacters = Array.from(document.querySelectorAll('.character-m'));

	wCharacters.forEach(char => {
		const charWidth = char.clientWidth;
		char.style.height = `${charWidth/wRatio}px`;
	})
	oCharacters.forEach(char => {
		const charWidth = char.clientWidth;
		char.style.height = `${charWidth/oRatio}px`;
	})
	mCharacters.forEach(char => {
		const charWidth = char.clientWidth;
		char.style.height = `${charWidth/mRatio}px`;
	})
}

const setHeight = (selector, ratio) => {
	Array.from(document.querySelectorAll(selector)).forEach(item => {
		const itemWidth = item.clientWidth;
		item.style.height = itemWidth + 'px';
	})
}

const toggleHeader = () => {
	const toggleMenuButton = document.querySelector('.toggle-menu');
	const navListWrapper = document.querySelector('.main-nav .nav-list');
	toggleMenuButton.addEventListener('click', (e) => {
		e.preventDefault();
		toggleMenuButton.classList.toggle('active');
		navListWrapper.classList.toggle('active');
	})
}

const setFullpage = () => {
	return new Fullpage('.fp-container', {
		speed: 1500,
		on: {
			beforeChangeSection: (nextSect) => {
				const header = document.querySelector('header');
				const bg = nextSect.getAttribute('fp-background');
				const imgParticle = document.querySelector('.img-particle');
				const currentIndex = Number(nextSect.getAttribute('fp-index'));
				imgParticle.style.backgroundImage = bg;
				if (currentIndex === 0) {
					imgParticle.style.backgroundColor = bg;
					imgParticle.style.backgroundImage = 'none';
				}

				if (imgParticle) {
					if (currentIndex !== 0) {
						imgParticle.querySelector('.canvas-wrapper').style.transition = `all 0.5s ease-in`;
						imgParticle.querySelector('.canvas-wrapper').style.opacity = '0';
					} else {
						imgParticle.querySelector('.canvas-wrapper').style.transition = `all 0.5s ease-in`;
						imgParticle.querySelector('.canvas-wrapper').style.opacity = '1'
					}
				}

				const index = Number(nextSect.getAttribute('fp-index'));

				if (index % 2 === 0) {
					header.classList.remove('even')
					header.classList.add('odd')
				} else {
					header.classList.add('even')
					header.classList.remove('odd')
				}
			},
			afterChangeSection: (nextSect) => {
				setHeight('.background-circle', 1);
				setSizeForCharacterImage();
			},
			init: (e) => {}
		}
	})
}

const backgroundParticle = () => {
	particlesJS("particles-js", {
		"particles": {
			"number": {
				"value": 25,
				"density": {
					"enable": true,
					"value_area": 500
				}
			},
			"color": {
				"value": ["#F1667F", "#D5D5D5"]
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000"
				},
				"polygon": {
					"nb_sides": 2
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 1,
				"random": true,
				"anim": {
					"enable": true,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 20,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 10,
					"size_min": 10,
					"sync": false
				}
			},
			"line_linked": {
				"enable": false,
				"distance": 200,
				"color": "#ffffff",
				"opacity": 1,
				"width": 2
			},
			"move": {
				"enable": true,
				"speed": 2,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "window",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "repulse"
				},
				"onclick": {
					"enable": false,
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
					"distance": 100
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true,
		"config_demo": {
			"hide_card": false,
			"background_color": "#ffffff00",
			"background_image": "",
			"background_position": "50% 50%",
			"background_repeat": "no-repeat",
			"background_size": "cover"
		}
	});
}


document.addEventListener('DOMContentLoaded', () => {
	const particleJs = document.getElementById('particles-js');
	particleJs.style.transition = 'all linear 1s';
	particleJs.style.opacity = 0;
	ImageParticle();
	toggleHeader();
	setSizeForCharacterImage();

	Loading().then(() => {
		particleJs.style.opacity = 1;
		backgroundParticle();
	})
	getSvg();

	if (window.innerWidth > 1024) {
		setHeight('.background-circle', 1);
		setFullpage();
	}
});

window.addEventListener('resize', () => {
	setHeight('.background-circle', 1);
	if (window.innerWidth > 1024) {
		setSizeForCharacterImage();
	}
})