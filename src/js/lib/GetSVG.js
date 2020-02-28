module.exports = (selector = 'img.svg') => {

	const svgArray = Array.from(document.querySelectorAll(selector));

	svgArray.forEach(svg => {

		const svgUrl = svg.getAttribute('src') || svg.getAttribute('data-src');
		const svgClassList = Array.from(svg.classList);
		const svgRequest = new XMLHttpRequest();

		svgRequest.open('GET', svgUrl, true);

		svgRequest.onload = res => {
			const svgParentElement = svg.parentElement;
			svg.outerHTML = res.target.response;
			const svgElement = Array.from(svgParentElement.children).filter(item => item.tagName === 'svg');
			svgClassList.forEach(className => {
				svgElement[0].classList.add(className);
			})
		}

		svgRequest.onerror = () => {
			svg.setAttribute('src', svgUrl)
		}

		svgRequest.send();
	})
}