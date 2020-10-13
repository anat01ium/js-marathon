function random(max, min = 0) {
	const num = max - min;
	return Math.floor(Math.random() * num) + min;
}

export default random;