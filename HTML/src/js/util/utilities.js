const randomise = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const rgbToHex = (r, g, b) => {
	if (r > 255 || g > 255 || b > 255) throw 'Invalid color component'
	return ((r << 16) | (g << 8) | b).toString(16)
}

const setHeight = (selector, ratio) => {
	const els = Array.from(document.querySelectorAll(selector))
	for (let i = 0; i < els.length; i++) {
		const itemWidth = els[i].clientWidth
		els[i].style.height = `${itemWidth / ratio}px`
	}
}

const getSVGs = (selector) => {
	if (typeof selector == 'string' && selector.length > 0) {
		const SVGs = Array.from(document.querySelectorAll(selector))
		for (let i = 0; i < SVGs.length; i++) {
			const dataSrc = SVGs[i].getAttribute('src')
			const src = SVGs[i].getAttribute('src')
			const svgUrl = dataSrc || src
			const fullUrl = getFullUrl(svgUrl)
			const request = new XMLHttpRequest()
			request.addEventListener('load', function (res) {
				if (res.target.status === 200) {
					SVGs[i].outerHTML = res.target.response
				}
			})
			request.open('GET', fullUrl, true)
			request.send()
		}
	} else {
		console.log('Nhập sai selector của svg!')
	}
}

const getFullUrl = (url) => {
	const ORIGIN = window.location.origin
	return `${ORIGIN}/${url}`
}

export { randomise, rgbToHex, setHeight, getSVGs, getFullUrl }
