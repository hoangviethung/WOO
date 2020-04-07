const randomise = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const rgbToHex = (r, g, b) => {
	if (r > 255 || g > 255 || b > 255)
		throw "Invalid color component";
	return ((r << 16) | (g << 8) | b).toString(16);
}

export {
	randomise,
	rgbToHex
}