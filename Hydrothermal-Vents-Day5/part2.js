const fs = require('fs')
const raw = fs.readFileSync("lineSegments.txt", "utf8")

const segments = raw.replace(/(\s->\s|\r)/g, (match, m1) => {
	return m1 === " -> " ? "," : ""
}).split('\n').map(str => str.split(",").map(el => Number(el)))
// .filter(seg => seg[0] === seg[2] || seg[1] === seg[3])

function findOverlaps(coords){
	const ocean = []
	let overlaps = 0

	const vertical = (start, stop, fixedX) => {
		for (let dy = start; dy <= stop; dy++){
			if (!ocean[dy]) ocean[dy] = []
			let point = ocean[dy][fixedX]
			ocean[dy][fixedX] = typeof(point) === "number" ? point + 1 : 1
			if (ocean[dy][fixedX] === 2) overlaps += 1
		}
	}

	const horizontal = (start, stop, fixedY) => {
		if (!ocean[fixedY]) ocean[fixedY] = []
		for (let dx = start; dx <= stop; dx++){
			let point = ocean[fixedY][dx]
			ocean[fixedY][dx] = typeof(point) === "number" ? point + 1 : 1
			if (ocean[fixedY][dx] === 2) overlaps += 1
		}
	}

	const diagonal = (x1, y1, x2, y2) => {
		let x = x1
		let y = y1
		while (true) {
			if (!ocean[y]) ocean[y] = []
			let point = ocean[y][x]
			ocean[y][x] = typeof(point) === "number" ? point + 1 : 1
			if (ocean[y][x] === 2) overlaps += 1

			if (x1 > x2 && y1 > y2){
				x--
				y--
			}
			else if (x1 < x2 && y1 < y2){
				x++
				y++
			}
			else if (x1 > x2 && y1 < y2){
				x--
				y++
			}
			else if (x1 < x2 && y1 > y2){
				x++
				y--
			}
			if ((x1 > x2 && x < x2 ) || (x1 < x2 && x > x2)) {
				break
			}
		}
	}

	for (let line of coords){
		let [x1, y1, x2, y2] = line
		if (x1 === x2) {
			vertical(Math.min(y1,y2), Math.max(y1, y2), x1)
		}
		else if (y1 === y2){
			horizontal(Math.min(x1, x2), Math.max(x1, x2), y1)
		}
		else {
			diagonal(x1 ,y1, x2, y2)
		}
	}
	return overlaps
}

console.log(findOverlaps(segments))