class Fullpage {
	slideLength
	state = {
		currentIndex: 0,
		nextIndex: 0,
		canScroll: true,
	}

	constructor(selector) {
		this.selector = document.querySelector(selector)
		if (this.selector) {
			this.slides = Array.from(
				this.selector.querySelectorAll('.fp-content')
			)
		} else {
			console.log('HTML Fullpage sai kìa')
		}
	}

	init(cb) {
		this.slides.forEach((slide, index) => {
			this.slides[index].setAttribute('fp-index', index)
			if (index === 0) {
				this.slides[index].classList.add('active')
			}
		})
		this.slideLength = this.slides.length
		if (typeof cb == 'function') {
			cb(this)
		}
		// Set event handler
		this.onScroll()
		this.onClick()
	}

	onScroll() {
		document.addEventListener('wheel', (e) => {
			if (this.state.canScroll) {
				this.state.canScroll = false
				if (e.deltaY > 0) {
					if (this.state.nextIndex < this.letters.length - 1) {
						this.state.nextIndex += 1
					}
				} else {
					if (this.state.nextIndex > 0) {
						this.state.nextIndex -= 1
					}
				}
				this.changeSlide()
				setTimeout(() => {
					this.state.canScroll = true
				}, 2000)
			}
		})
	}
	onClick() {}

	changeSlide(cb) {
		const _this = this
		if (this.state.currentIndex != this.state.nextIndex) {
			this.slides[this.state.nextIndex].classList.add('changing')
			this.slides[this.state.currentIndex].classList.remove('active')
			this.letters[this.state.currentIndex].classList.remove('active')
			this.backgrounds[this.state.currentIndex].classList.remove('active')
			setTimeout(() => {
				_this.slides[_this.state.nextIndex].classList.remove('changing')
				_this.slides[_this.state.nextIndex].classList.add('active')
				_this.letters[_this.state.nextIndex].classList.add('active')
				_this.backgrounds[_this.state.nextIndex].classList.add('active')
				_this.state.currentIndex = _this.state.nextIndex
			}, 500)
		}
	}
}

module.exports = {
	Fullpage,
}
