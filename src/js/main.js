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

const setFullpage = () => {
	return new Fullpage('.fp-container', {
		speed: 1500,
		on: {
			beforeChangeSection: (nextSect, index) => {
				const imgParticle = document.querySelector('.img-particle');
				const bg = nextSect.getAttribute('fp-background');
				const currentIndex = Number(nextSect.getAttribute('fp-index'));
				if (imgParticle) {
					imgParticle.style.backgroundColor = bg;

					if (currentIndex !== 0) {
						imgParticle.querySelector('.canvas-wrapper').style.transition = `all 0.5s ease-in`;
						imgParticle.querySelector('.canvas-wrapper').style.opacity = '0';
					} else {
						imgParticle.querySelector('.canvas-wrapper').style.transition = `all 0.5s ease-in`;
						imgParticle.querySelector('.canvas-wrapper').style.opacity = '1'
					}
				}
			},
			afterChangeSection: (currentSect, nextSect) => {
				setHeight('.background-circle', 1);
				setSizeForCharacterImage();
			}
		}
	})
}


document.addEventListener('DOMContentLoaded', () => {
	getSvg();
	Loading().then(() => {
		setHeight('.background-circle', 1);
		setSizeForCharacterImage();
		ImageParticle('./assets/woo.svg', {
			colors: ['#F1667F', '#D5D5D5'],
			duration: 1000,
			on: {
				init: function() {}
			}
		});
	});
	setFullpage();
});

window.addEventListener('resize', () => {
	setHeight('.background-circle', 1);
	setSizeForCharacterImage();
})