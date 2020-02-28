// module.exports = function(imgUrl, opts) {

// 	const imageParticleContainer = document.querySelector('.img-particle');
// 	const canvasWrapper = imageParticleContainer.querySelector('#canvas-wrapper');
// 	const colors = opts.colors;
// 	const sizes = opts.sizes;
// 	const duration = opts.duration;
// 	const init = opts.on.init;

// 	const getImage = (afterImageLoaded) => {
// 		const img = new Image(648, 405);
// 		img.src = imgUrl;
// 		if (typeof(afterImageLoaded) == 'function') {
// 			img.addEventListener('load', (e) => {
// 				afterImageLoaded(img);
// 			})
// 		}
// 		if (typeof(init) == 'function') {
// 			init()
// 		}
// 	}

// 	const setSizeImageParticleContainer = selector => {
// 		selector.style.width = window.innerWidth + 'px';
// 		selector.style.height = window.innerHeight + 'px';
// 		window.addEventListener('resize', () => {
// 			selector.style.width = window.innerWidth + 'px';
// 			selector.style.height = window.innerHeight + 'px';
// 		})
// 	}

// 	const splitImageIntoPieces = (img) => {
// 		const columnCount = 18;
// 		const sizeOfPiece = img.width / columnCount;
// 		const rowCount = Math.ceil(img.height / sizeOfPiece);
// 		const pieces = [];
// 		const offsetTop = (window.innerHeight - canvasWrapper.clientHeight) / 2;
// 		const offsetLeft = (window.innerWidth - canvasWrapper.clientWidth) / 2;
// 		let counter = 0;

// 		for (let i = 0; i < rowCount; i++) {
// 			for (let j = 0; j < columnCount; j++) {
// 				const canvas = document.createElement('canvas');
// 				counter += 1;

// 				canvas.style.position = 'absolute';
// 				canvas.style.top = Math.floor(Math.random() * (window.innerHeight - 40) * 100) / 100 + 20 + 'px';
// 				canvas.style.left = Math.floor(Math.random() * (window.innerWidth - 40) * 100) / 100 + 20 + 'px';
// 				canvas.style.borderRadius = '50%';
// 				const size = sizes[Math.floor(Math.random() * 3)];

// 				canvas.width = sizeOfPiece;
// 				canvas.height = sizeOfPiece;
// 				canvas.style.width = size + 'px';
// 				canvas.style.height = size + 'px';
// 				canvas.style.backgroundColor = colors[Math.floor(Math.random() * 3)];

// 				if (counter % 3 === 0 || counter % 2 === 0) {
// 					canvas.style.opacity = 0;
// 				}

// 				canvasWrapper.appendChild(canvas);
// 				pieces.push({
// 					canvas: canvas,
// 					position: {
// 						x: offsetLeft + (j * sizeOfPiece) - 1,
// 						y: offsetTop + (i * sizeOfPiece) - 1
// 					}
// 				})
// 			}
// 		}

// 		setTimeout(() => {
// 			let counter = 0;
// 			for (let i = 0; i < rowCount; i++) {
// 				for (let j = 0; j < columnCount; j++) {

// 					const canvas = pieces[columnCount * i + j].canvas;
// 					const ctx = canvas.getContext('2d');
// 					counter += 1;

// 					canvas.style.transition = `all 0.75s ease-out`;
// 					canvas.style.borderRadius = '0%';
// 					canvas.style.width = sizeOfPiece + 'px';
// 					canvas.style.height = sizeOfPiece + 'px';
// 					canvas.style.backgroundColor = 'transparent';
// 					canvas.style.top = pieces[columnCount * i + j].position.y + 'px'
// 					canvas.style.left = pieces[columnCount * i + j].position.x + 'px'

// 					if (counter % 3 === 0 || counter % 2 === 0) {
// 						canvas.style.opacity = 1;
// 					}
// 					setTimeout(() => {
// 						ctx.clearRect(0, 0, sizeOfPiece, sizeOfPiece);
// 						ctx.drawImage(img, sizeOfPiece * j, sizeOfPiece * i, sizeOfPiece, sizeOfPiece, 0, 0, sizeOfPiece, sizeOfPiece);
// 					}, 250);
// 				}
// 			}
// 		}, 250);


// 		window.addEventListener('resize', () => {
// 			const offsetTop = (window.innerHeight - canvasWrapper.clientHeight) / 2;
// 			const offsetLeft = (window.innerWidth - canvasWrapper.clientWidth) / 2;
// 			let counter = 0;
// 			for (let i = 0; i < rowCount; i++) {
// 				for (let j = 0; j < columnCount; j++) {
// 					const canvas = pieces[columnCount * i + j].canvas;
// 					counter += 1;

// 					canvas.style.transition = 'none';
// 					canvas.style.top = offsetTop + (i * sizeOfPiece) - 1 + 'px';
// 					canvas.style.left = offsetLeft + (j * sizeOfPiece) - 1 + 'px';
// 				}
// 			}
// 		})
// 	}

// 	setSizeImageParticleContainer(imageParticleContainer);

// 	if (canvasWrapper) {
// 		getImage(img => {
// 			canvasWrapper.style.width = img.width + 'px';
// 			canvasWrapper.style.height = img.height + 'px';

// 			splitImageIntoPieces(img);
// 		}, )
// 	}
// }


module.exports = () => {
	const canvas = document.querySelector('#canvas-wrapper');
	const ctx = canvas.getContext('2d');
	const colNumber = 25;
	const img = new Image();
	img.src = './assets/woo.svg'
	let initPositionPieces = [];
	let endPositionsPieces = [];
	let currentPositionsPieces = [];
	let distance = [];
	let pieces = [];
	let imgSize;
	let i = 0;


	img.onload = function() {
		setSizeCanvas();
		initialize(this, img.width, img.height, colNumber);
		drawCircleShapes();
		setTimeout(() => {
			let x = setInterval(() => {
				drawCircleShapes();
				if (i == 1210) {
					clearInterval(x);
				}
			}, 10);
		}, 1000);
	}

	const setSizeCanvas = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	const initialize = (img, imgWidth, imgHeight, colNumber) => {

		imgSize = imgWidth / colNumber;
		const rowNumber = Math.ceil(imgHeight / imgSize);
		const hideCanvas = document.createElement('canvas');
		const hideCtx = hideCanvas.getContext('2d');

		for (let j = 0; j < rowNumber; j++) {
			for (let i = 0; i < colNumber; i++) {
				hideCtx.clearRect(0, 0, imgSize, imgSize);
				hideCanvas.width = imgSize;
				hideCanvas.height = imgSize;
				hideCtx.drawImage(img, imgSize * i, imgSize * j, imgSize, imgSize, 0, 0, imgSize, imgSize)
				pieces.push(hideCanvas.toDataURL())
				const initPos = {
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight
				}
				const endPos = {
					x: imgSize * i + (window.innerWidth - img.width) / 2,
					y: imgSize * j + (window.innerHeight - img.height) / 2
				}
				initPositionPieces.push(initPos);
				endPositionsPieces.push(endPos)
				distance.push({
					x: (initPos.x - endPos.x) / 100,
					y: (initPos.y - endPos.y) / 100,
				})
				currentPositionsPieces = initPositionPieces;
			}
		}
	}

	const drawCircleShapes = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (i >= 1000) {
			ctx.drawImage(img, (window.innerWidth - img.width) / 2, (window.innerHeight - img.height) / 2)
			ctx.globalAlpha = (i - 1000) / 200;
		} else {
			currentPositionsPieces.forEach((item, index) => {
				ctx.beginPath();
				if (index % 20 === 0) {
					ctx.arc(item.x, item.y, 10, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(241,102,127,1)`;
				} else if (index % 20 === 1) {
					ctx.arc(item.x, item.y, 15, 0, Math.PI * 2);
					ctx.fillStyle = `#dfdfdf`;
				} else if (index % 20 === 2) {
					ctx.arc(item.x, item.y, 20, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(241,102,127,.6)`;
				} else if (index % 20 === 3) {
					ctx.arc(item.x, item.y, 10, 0, Math.PI * 2);
					ctx.fillStyle = `#dfdfdf`;
				} else if (index % 20 === 4) {
					ctx.arc(item.x, item.y, 15, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(241,102,127,.2)`;
				} else if (index % 20 === 5) {
					ctx.arc(item.x, item.y, 20, 0, Math.PI * 2);
					ctx.fillStyle = `#dfdfdf`;
				}
				ctx.shadowColor = "rgba(0,0,0,.05)";
				ctx.shadowBlur = 4;
				ctx.shadowOffsetX = 0;
				ctx.shadowOffsetY = 0;
				if (i > 950) {
					let opacity = (1000 - i) / 50;
					ctx.globalAlpha = opacity;
				}
				ctx.fill()

				const currentPos = {
					x: item.x - distance[index].x,
					y: item.y - distance[index].y,
				}
				currentPositionsPieces[index] = currentPos;
			})
		}
		i += 10;
	}

}