import gsap from "gsap";

module.exports = class Fullpage {
	canScroll = true;
	currentIndex = 0;
	opts = {
		speed: 1000,
		section: '.fp-section'
	};
	on = {
		afterChangeSection: (e) => {},
		beforeChangeSection: (e) => {},
	}

	constructor(selector, opts) {
		Object.keys(opts).map(key => {
			this.opts[key] = opts[key]
		});
		this.$el = document.querySelector(selector);
		this.$section = Array.from(this.$el.querySelectorAll(this.opts.section));
		Object.assign(this.opts, opts)
		// Initialize
		this.init();
	}

	renderHTML() {
		this.$section.forEach((section, index) => {
			section.setAttribute('fp-index', index);
			if (index === 0) {
				this.currentIndex = index;
				section.setAttribute('fp-active', true);
				section.classList.add('active');
			} else {
				section.setAttribute('fp-active', false);
			}
		})
	}

	checkDirectionMouseScroll() {
		document.addEventListener('wheel', e => {
			const loading = document.getElementById('loading-container');

			if (!loading) {

				let scrollDirection;

				if (this.canScroll) {

					this.canScroll = false;

					if (e.deltaY > 0) {
						scrollDirection = 'down';
					} else {
						scrollDirection = 'up';
					}

					this.checkNextSectionAndDirection(scrollDirection);

					setTimeout(() => {
						this.canScroll = true;
					}, this.opts.speed + 500);
				}
			}
		});
	}

	checkNextSectionAndDirection(scrollDirection) {
		const direction = scrollDirection;
		let currentSection = this.$el.querySelector('[fp-active="true"]');
		let nextSection;

		if (direction == 'up') {
			nextSection = currentSection.previousElementSibling;
		} else {
			nextSection = currentSection.nextElementSibling;
		}

		if (nextSection) {
			this.changeSlideEffect(currentSection, nextSection, direction, this.opts.on.beforeChangeSection, this.opts.on.afterChangeSection)
		}
	}

	changeSlideEffect(currentSect, nextSect, direction, beforeChangeSection, afterChangeSection) {
		if (beforeChangeSection) {
			beforeChangeSection(nextSect, this.currentIndex);
		}
		nextSect.classList.add('scrolling');
		gsap.fromTo(currentSect, {
			x: '0%',
		}, {
			duration: this.opts.speed / 1000,
			x: () => {
				if (direction == 'down') {
					return '-100%';
				} else {
					return '100%'
				}
			},
			onComplete: () => {
				currentSect.classList.remove('active');
				currentSect.removeAttribute('style');
			}
		})
		gsap.fromTo(nextSect, {
			x: () => {
				if (direction == 'down') {
					return '100%';
				} else {
					return '-100%'
				}
			},
		}, {
			duration: this.opts.speed / 1000,
			x: '0%',
			onComplete: () => {
				nextSect.classList.remove('scrolling');
				nextSect.classList.add('active');
				this.$section.forEach(section => {
					section.setAttribute('fp-active', false)
				})
				nextSect.setAttribute('fp-active', true)
				this.currentIndex = Number(nextSect.getAttribute('fp-index'));
				if (afterChangeSection) {
					afterChangeSection(nextSect, this.currentIndex);
				}
			}
		})
	}

	init() {
		this.renderHTML();
		this.checkDirectionMouseScroll();
	}
}