import * as PIXI from 'pixi.js'

var TPUtilities = {
	randomise: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	},
	setrequest: function () {
		window.requestAnimationFrame = (function () {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60)
				}
			)
		})()
	},
}

class TextParticle {
	options = {
		text: 'HELLO',
		width: 1200,
		height: 700,
		parent: 'body',
	}

	stage = new PIXI.Container()
	renderer = PIXI.autoDetectRenderer(1920, 1080, this.options.height, {
		view: this.canvas,
		transparent: false,
		antialias: false,
		resolution: 2,
	})

	// Thiết lập cho hạt
	skipCount = 3
	mouseX = 0
	mouseY = 0
	PI_2 = Math.PI * 2
	particles = []
	particlesLength = 0

	// Vận tốc hạt
	viscosity = 0.0009 // Скорость разлета
	minDistSq = 1000

	explode = false

	constructor(selector, options) {
		this.selector = selector
		Object.assign(this.options, options)
		this.canvas = document.createElement('canvas')
		this.canvas.width = this.options.width
		this.canvas.height = this.options.height
		document.querySelector(this.selector).append(this.canvas)
		this.init()
	}

	createParticle() {
		const TP = this
		var particle = {}
		particle.random = Math.random()
		particle.valX = 0
		particle.valY = 0
		particle.vitesse = TPUtilities.randomise(3, 10) / 200 // Điểm dao động
		particle.degree = Math.random() * 2
		particle.rayon = Math.random() * 5 // вибрация точек
		particle.direct =
			Math.random() < 0.5
				? (particle.vitesse = particle.vitesse * -1)
				: true
		particle.r = TPUtilities.randomise(1, 3)
		particle.opacity = Math.random()
		particle.mass = 0.05 + Math.random() * 0.9
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
		particle.a = 0
		/* Картинка текстуры в Base64 */
		particle.pointTexture = new PIXI.Texture.from('/assets/dot.png')
		particle.pixiCircle = new PIXI.Sprite(particle.pointTexture, {
			x: 0,
			y: 0,
			width: 5,
			height: 5,
		})
		particle.pixiCircle.scale.x = TPUtilities.randomise(15, 25) // размер точек
		particle.pixiCircle.scale.y = TPUtilities.randomise(15, 25) // размер точек
		particle.pixiCircle.alpha = particle.random > 0.99 ? 1 : Math.random()
		this.stage.addChild(particle.pixiCircle)
		// создание фильтра

		// Установка исходного положения
		particle.setPos = function (x, y) {
			this.ox = x
			this.oy = y
			this.x = TPUtilities.randomise(-100, TP.width + 100)
			this.y = TPUtilities.randomise(-100, TP.height + 100)
		}

		// функция удаления частиц
		particle.move = function () {
			this.dx = TP.mouseX - this.ox
			this.dy = TP.mouseY - this.oy
			this.dSqr = this.dx * this.dx + this.dy * this.dy

			// если частица находится в области
			if (this.dSqr < TP.minDistSq) {
				this.dx = mouseX - this.x
				this.dy = mouseY - this.y
				this.dSqr = this.dx * this.dx + this.dy * this.dy

				// сила пропорциональна расстоянию
				this.f = this.dSqr / minDistSq
				this.f = this.f < 0 ? 0 : this.f > 1 ? 1 : this.f

				// поиск угла для скорости
				this.a = Math.atan2(this.dy, this.dx)

				// динамика отталкивания
				this.f = -this.f

				// сумма силы
				this.fx += Math.cos(this.a) / this.f
				this.fy += Math.sin(this.a) / this.f
			}

			this.fx += (this.ox - this.x) * TP.viscosity * this.mass
			this.fy += (this.oy - this.y) * TP.viscosity * this.mass

			// интегрирование Эйлера
			this.vx += this.fx / this.mass
			this.vy += this.fy / this.mass

			this.x += this.vx
			this.y += this.vy

			// скорость демпфирования
			this.vx *= 0.95
			this.vy *= 0.95

			// очистка силы
			this.fx = this.fy = 0
			// вычисление квадрата расстояния

			// движение частицы с поворотом
			this.valX = this.x + this.rayon * Math.cos(Math.PI * this.degree)
			this.valY = this.y + this.rayon * Math.sin(Math.PI * this.degree)
			// приращение к следующей ступени
			this.degree += this.vitesse
			this.pixiCircle.position.x = this.valX
			this.pixiCircle.position.y = this.valY - 50 // Корректировка разлета курсора
		}
		return particle
	}

	writeText() {
		var textSample = new PIXI.Text(
			this.options.text,
			{
				fontFamily: 'Arial',
				fontWeight: '700',
				fontSize: 250,
				fill: 0xf16a83,
				align: 'center',
			},
			this.canvas
		)
		textSample.position.x = this.options.width / 2 - textSample.width / 2
		textSample.position.y = this.options.height / 2 - textSample.height / 2

		// Lưu vị trí của các pixel hồng và sử dụng nó để di chuyển các hạt
		let imageData = textSample.context.getImageData(
			0,
			0,
			textSample.width,
			textSample.width
		)
		let data = imageData.data

		for (var i = 0; i < imageData.height; i += this.skipCount) {
			for (var j = 0; j < imageData.width; j += this.skipCount) {
				var color = data[j * imageData.width * 4 + i * 4 - 1]
				if (color === 255) {
					this.particles[
						this.particles.length
					] = this.createParticle()
					this.particles[this.particles.length - 1].setPos(
						i + (this.options.width / 2 - textSample.width / 2),
						j + (this.options.height / 2 - textSample.height - 40)
					)
				}
			}
		}

		this.particlesLength = this.particles.length
		this.renderer.view.onmousemove = function (evt) {
			this.mouseX = evt.clientX
			this.mouseY = evt.clientY
		}

		const step = () => {
			for (var i = 0; i < this.particlesLength; i++) {
				this.particles[i].move()
			}
			this.renderer.render(this.stage)
			window.requestAnimationFrame(step)
		}

		window.requestAnimationFrame(step)
	}

	init() {
		this.writeText()
	}
}

module.exports = {
	TextParticle,
}
