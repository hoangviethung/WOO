class Fullpage {
	slideLength
	state = {
		currentIndex: 0,
		nextIndex: 0,
		canScroll: true,
	}
	opts = {}

	constructor(selector, opts) {
		this.selector = document.querySelector(selector)
		this.prevEl = document.querySelector('#fp-prev')
		this.nextEl = document.querySelector('#fp-next')
		this.opts = [].concat(opts)[0]

		if (this.selector) {
			this.slides = Array.from(
				this.selector.querySelectorAll('.fp-content')
			)
			this.init()
		} else {
			console.log('HTML Fullpage sai kìa')
		}
	}

	init() {
		for (let i = 0; i < this.slides.length; i++) {
			this.slides[i].setAttribute('fp-index', i)
			if (i === 0) {
				this.slides[i].classList.add('active')
			}
		}

		this.slideLength = this.slides.length

		if (typeof this.opts.on.init == 'function') {
			this.opts.on.init(this)
		}

		if (this.state.currentIndex >= this.slideLength - 1) {
			this.nextEl.classList.add('disabled')
		} else {
			this.nextEl.classList.remove('disabled')
		}

		if (this.state.currentIndex <= 0) {
			this.prevEl.classList.add('disabled')
		} else {
			this.prevEl.classList.remove('disabled')
		}
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

	onClick() {
		this.prevEl.addEventListener('click', () => {
			if (this.state.canScroll) {
				this.state.canScroll = false
				if (this.state.nextIndex > 0) {
					this.state.nextIndex -= 1
				}
				this.changeSlide()
				setTimeout(() => {
					this.state.canScroll = true
				}, 2000)
			}
		})
		this.nextEl.addEventListener('click', () => {
			if (this.state.canScroll) {
				this.state.canScroll = false
				if (this.state.nextIndex < this.letters.length - 1) {
					this.state.nextIndex += 1
				}
				this.changeSlide()
				setTimeout(() => {
					this.state.canScroll = true
				}, 2000)
			}
		})
	}

	changeSlide() {
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

				if (_this.state.currentIndex >= this.slideLength - 1) {
					_this.nextEl.classList.add('disabled')
				} else {
					_this.nextEl.classList.remove('disabled')
				}

				if (_this.state.currentIndex <= 0) {
					_this.prevEl.classList.add('disabled')
				} else {
					_this.prevEl.classList.remove('disabled')
				}

				if (typeof _this.opts.on.afterChangeSlide == 'function') {
					_this.opts.on.afterChangeSlide(_this, _this.state)
				}
			}, 500)
		}
	}
}

module.exports = {
	Fullpage,
}
