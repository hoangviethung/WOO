import { randomise } from '../util/utilities'

export function TextParticle(selector, cb) {
	let height =
		window.innerWidth >= 768 ? window.innerHeight : window.innerHeight / 2
	if (window.innerWidth >= 768) {
		PIXI.Loader.shared
			.add('woo', './assets/woo-image.png')
			.add('dot', './assets/dot.png')
			.load(drawImage)
	} else {
		PIXI.Loader.shared
			.add('woo', './assets/woo-image-mobile.png')
			.add('dot', './assets/dot.png')
			.load(drawImage)
	}
	const text = document.querySelector('.ch__slogan')
	const textHeight = text.clientHeight

	let app = new PIXI.Application({
		width: 1920,
		height: height,
		transparent: true,
		antialias: true,
		resolution: 1,
	})

	document.querySelector(selector).appendChild(app.view)

	let stage = new PIXI.Container()

	// Thiết lập cho hạt
	let mouseX = 0
	let mouseY = 0
	let particles = []
	let particlesLength = 0

	// Vận tốc hạt
	let VIS_COSITY = 0.0009
	let MIN_DIST_SQR = 1000
	let skipCount = app.renderer instanceof PIXI.Renderer ? 3 : 9

	function createParticle() {
		var particle = {}
		particle.random = Math.random()
		particle.valX = 0
		particle.valY = 0
		particle.vitesse = randomise(3, 10) / 300
		particle.degree = Math.random() * 2
		particle.rayon = randomise(2, 4)
		particle.direct =
			Math.random() < 0.5
				? (particle.vitesse = particle.vitesse * -1)
				: true
		particle.r = randomise(1, 3)
		particle.opacity = Math.random()
		particle.mass = 19.05 + Math.random() * 0.95
		particle.x = 10
		particle.y = 10
		particle.fx = 0
		particle.fy = 0
		particle.vx = 0
		particle.vy = 0
		particle.ox = 0
		particle.oy = 0
		particle.dx = 0
		particle.dy = 0
		particle.dSq = 0
		particle.f = 0
		particle.a = 1

		particle.pointTexture = PIXI.Loader.shared.resources.dot.texture
		particle.pixiCircle = new PIXI.Sprite(particle.pointTexture, {
			x: 0,
			y: 0,
			width: 10,
			height: 10,
			transparent: true,
		})
		particle.pixiCircle.scale.x = particle.pixiCircle.scale.y =
			Math.random() * 0.25
		// particle.pixiCircle.scale.y = Math.random() * 0.5
		// particle.pixiCircle.scale.x = 0.16
		// particle.pixiCircle.scale.y = 0.16
		// particle.pixiCircle.alpha = particle.random > .99 ? 1 : 0.8;
		particle.pixiCircle.alpha = 1
		stage.addChild(particle.pixiCircle)

		particle.initPosition = function (x, y) {
			this.ox = x
			this.oy = y
			this.x = randomise(-100, app.view.width + 100)
			this.y = randomise(-100, app.view.height + 100)
		}

		particle.move = function () {
			this.dx = mouseX - this.ox
			this.dy = mouseY - this.oy
			this.dSqr = this.dx * this.dx + this.dy * this.dy

			// Nếu hạt nằm trong vùng chuột rê tới
			if (this.dSqr < MIN_DIST_SQR) {
				this.dx = mouseX - this.x
				this.dy = mouseY - this.y
				this.dSqr = this.dx * this.dx + this.dy * this.dy

				this.f = this.dSqr / MIN_DIST_SQR
				this.f = this.f < 0 ? 0 : this.f > 1 ? 1 : this.f

				this.a = Math.atan2(
					this.dy / this.dy > 0 ? this.dy : -this.dy,
					this.dx / this.dx > 0 ? this.dx : -this.dx
				)

				this.f = -2 * this.f

				this.fx += Math.cos(this.a) / this.f
				this.fy += Math.sin(this.a) / this.f
			}

			this.fx += (this.ox - this.x) * VIS_COSITY * this.mass
			this.fy += (this.oy - this.y) * VIS_COSITY * this.mass

			this.vx += this.fx / this.mass
			this.vy += this.fy / this.mass

			this.x += this.vx
			this.y += this.vy

			this.vx *= 0.95
			this.vy *= 0.95

			this.fx = this.fy = 0

			this.valX = this.x + this.rayon * Math.cos(Math.PI * this.degree)
			this.valY = this.y + this.rayon * Math.sin(Math.PI * this.degree)

			this.degree += this.vitesse
			this.pixiCircle.position.x = this.valX
			this.pixiCircle.position.y = this.valY
		}
		return particle
	}

	function drawImage() {
		const img = new PIXI.Sprite(PIXI.Loader.shared.resources.woo.texture)
		const ctx = app.renderer.plugins.extract.canvas(img).getContext('2d')
		const imageData = ctx.getImageData(0, 0, img.width, img.height)
		const data = imageData.data

		for (var i = 0; i < imageData.width; i += skipCount) {
			for (var j = 0; j < imageData.height; j += skipCount) {
				var color = data[j * imageData.width * 4 + i * 4 - 1]
				if (color > 200) {
					particles[particles.length] = createParticle()
					particles[particles.length - 1].initPosition(
						i + (app.view.width / 2 - imageData.width / 2),
						j +
							(app.view.height / 2 - imageData.height / 2) -
							imageData.height / 2 -
							textHeight / 2
					)
				}
			}
		}

		particlesLength = particles.length
		app.view.onmousemove = function (evt) {
			mouseX = (1920 - window.innerWidth) / 2 + evt.clientX
			mouseY = evt.clientY - textHeight / 2
		}
	}

	function step() {
		for (var i = 0; i < particlesLength; i++) {
			particles[i].move()
		}
		app.renderer.render(stage)
		window.requestAnimationFrame(step)
	}
	if (typeof cb == 'function') {
		setTimeout(() => {
			cb()
		}, 2000)
	}
	window.requestAnimationFrame(step)
}
