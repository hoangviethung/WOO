import {
	src,
	dest
} from "gulp";
import {
	readFileSync
} from "graceful-fs";

const copyAssets = () => {
	return src("src/assets/**/**.{svg,png,jpg,jpeg,gif,mp4}")
		.pipe(dest("_dist/assets"))
};

const copyFonts = () => {
	let vendors = JSON.parse(readFileSync("_vendors.json"));
	let fonts = vendors.fonts;
	return src(fonts, {
			allowEmpty: true
		})
		.pipe(dest("_dist/fonts"));
};

const copyJson = () => {
	return src('src/js/**.json', {
			allowEmpty: true
		})
		.pipe(dest("_dist/js"));
}

const copyFavicon = () => {
	return src('favicon.ico', {
			allowEmpty: true
		})
		.pipe(dest("_dist"));
}

module.exports = {
	copyAssets,
	copyFonts,
	copyJson,
	copyFavicon
};