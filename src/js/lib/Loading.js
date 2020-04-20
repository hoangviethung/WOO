export function Loading() {
	return new Promise((resolve, reject) => {
		let loading = document.querySelector('#loading-container')
		let images = document.images
		let imagesLength = images.length
		let counter = 0
		console.log(1);
		

		function turnOffLoadingScreen() {
			loading.classList.add('closing')
			loading.style.opacity = '0'
			resolve()
			setTimeout(function () {
				loading.parentNode.removeChild(loading)
				document.body.classList.add('show-page')
			}, 1000)
		}

		function progressing() {
			let progressBar = loading.querySelector('#progress-bar')
			let progressPercentage = loading.querySelector(
				'#progress-percentage'
			)
			counter += 1
			let n = Math.round((100 / imagesLength) * counter)
			if (progressBar) {
				progressBar.style.width = `${n}%`
			}
			if (progressPercentage) {
				progressPercentage.innerHTML = `${n}`
			}
			if (counter === imagesLength) {
				setTimeout(() => {
					return turnOffLoadingScreen()
				}, 2000)
			}
		}
		if (loading) {
			if (imagesLength === 0) {
				return turnOffLoadingScreen(resolve)
			} else {
				loading.classList.add('loading')
				for (let i = 0; i < imagesLength; i++) {
					let img = new Image()
					img.onload = progressing
					img.onerror = progressing
					img.src = images[i].src
				}
			}
		}
	})
}
