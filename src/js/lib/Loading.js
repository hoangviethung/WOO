module.exports = () => {
	return new Promise((resolve, reject) => {
		const body = document.querySelector('body')
		const loading = document.querySelector('#loading-container');
		const progressBar = loading.querySelector('#progress-bar');
		const progressPercentage = loading.querySelector('#progress-percentage');
		const images = document.images;
		const imagesLength = images.length;
		let counter = 0;

		const turnOffLoadingScreen = () => {
			if (loading) {
				loading.style.opacity = '0';
				setTimeout(() => {
					resolve();
				}, 500);
				setTimeout(function() {
					loading.parentNode.removeChild(loading);
					body.classList.add('show-page');
				}, 1000)
			}
		};

		const progressing = () => {
			let n = Math.round(100 / imagesLength * (counter += 1));
			progressBar.style.width = `${n}%`;
			progressPercentage.innerHTML = `${n}`;
			if (counter === imagesLength) {
				return turnOffLoadingScreen();
			}
		};

		if (loading) {
			if (imagesLength === 0) {
				return turnOffLoadingScreen();
			} else {
				for (let i = 0; i < imagesLength; i++) {
					let img = new Image;
					img.onload = progressing;
					img.onerror = progressing;
					img.src = images[i].src
				}
			}
		}
	})
};