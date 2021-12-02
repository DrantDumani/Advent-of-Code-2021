const fs = require("fs")
const raw = fs.readFileSync("directions.txt", "utf8")

const directions = raw.split(`\n`).map(str => str.split(" ")).map(arr => [arr[0], Number(arr[1])])

function steerSub(dir){
	const coords = {x: 0, y: 0}
	for (let el of dir){
		switch(el[0]){
			case "forward":
				coords.x += el[1]
				break
			case "up":
				coords.y -= el[1]
				break
			case "down":
				coords.y += el[1]
				break
		}
	}
	return coords.x * coords.y
}

console.log(steerSub(directions))