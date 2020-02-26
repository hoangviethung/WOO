module.exports = function(imgUrl, opts) {

	const imageParticleContainer = document.querySelector('.img-particle');
	const canvasWrapper = imageParticleContainer.querySelector('.canvas-wrapper');
	const colors = opts.colors;
	const duration = opts.duration;
	const init = opts.on.init;

	const getImage = (afterImageLoaded) => {
		const img = new Image(580, 265);
		img.src = imgUrl;
		if (typeof(afterImageLoaded) == 'function') {
			img.addEventListener('load', (e) => {
				afterImageLoaded(img);
			})
		}
		if (typeof(init) == 'function') {
			init()
		}
	}

	const setSizeImageParticleContainer = selector => {
		selector.style.width = window.innerWidth + 'px';
		selector.style.height = window.innerHeight + 'px';
		window.addEventListener('resize', () => {
			selector.style.width = window.innerWidth + 'px';
			selector.style.height = window.innerHeight + 'px';
		})
	}

	const splitImageIntoPieces = (img) => {
		const columnCount = 20;
		const sizeOfPiece = img.width / columnCount;
		const rowCount = Math.ceil(img.height / sizeOfPiece);
		const pieces = [];
		const offsetTop = (window.innerHeight - canvasWrapper.clientHeight) / 2;
		const offsetLeft = (window.innerWidth - canvasWrapper.clientWidth) / 2;
		let counter = 0;

		for (let i = 0; i < rowCount; i++) {
			for (let j = 0; j < columnCount; j++) {
				const canvas = document.createElement('canvas');
				counter += 1;

				canvas.width = sizeOfPiece;
				canvas.height = sizeOfPiece;

				canvas.style.position = 'absolute';
				canvas.style.top = Math.floor(Math.random() * (window.innerHeight - 40) * 100) / 100 + 20 + 'px';
				canvas.style.left = Math.floor(Math.random() * (window.innerWidth - 40) * 100) / 100 + 20 + 'px';
				canvas.style.borderRadius = '50%';
				canvas.style.backgroundColor = colors[Math.floor(Math.random() * 3)];

				if (counter % 3 === 0 || counter % 2 === 0) {
					canvas.style.opacity = 0;
				}

				canvasWrapper.appendChild(canvas);
				pieces.push({
					canvas: canvas,
					position: {
						x: offsetLeft + (j * sizeOfPiece) - 1,
						y: offsetTop + (i * sizeOfPiece) - 1
					}
				})
			}
		}

		setTimeout(() => {
			let counter = 0;
			for (let i = 0; i < rowCount; i++) {
				for (let j = 0; j < columnCount; j++) {

					const canvas = pieces[columnCount * i + j].canvas;
					const ctx = canvas.getContext('2d');
					counter += 1;

					canvas.style.transition = `all ${duration/1000}s ease-in-out`;
					canvas.style.borderRadius = '0%';
					canvas.style.backgroundColor = 'transparent';
					canvas.style.top = pieces[columnCount * i + j].position.y + 'px'
					canvas.style.left = pieces[columnCount * i + j].position.x + 'px'

					if (counter % 3 === 0 || counter % 2 === 0) {
						canvas.style.opacity = 1;
					}
					setTimeout(() => {
						ctx.clearRect(0, 0, sizeOfPiece, sizeOfPiece);
						ctx.drawImage(img, sizeOfPiece * j, sizeOfPiece * i, sizeOfPiece, sizeOfPiece, 0, 0, sizeOfPiece, sizeOfPiece);
					}, 250);
				}
			}
		}, 250);


		window.addEventListener('resize', () => {
			const offsetTop = (window.innerHeight - canvasWrapper.clientHeight) / 2;
			const offsetLeft = (window.innerWidth - canvasWrapper.clientWidth) / 2;
			let counter = 0;
			for (let i = 0; i < rowCount; i++) {
				for (let j = 0; j < columnCount; j++) {
					const canvas = pieces[columnCount * i + j].canvas;
					counter += 1;

					canvas.style.transition = 'none';
					canvas.style.top = offsetTop + (i * sizeOfPiece) - 1 + 'px';
					canvas.style.left = offsetLeft + (j * sizeOfPiece) - 1 + 'px';
				}
			}
		})
	}

	setSizeImageParticleContainer(imageParticleContainer);

	if (canvasWrapper) {
		getImage(img => {
			canvasWrapper.style.width = img.width + 'px';
			canvasWrapper.style.height = img.height + 'px';

			splitImageIntoPieces(img);
		}, )
	}
}