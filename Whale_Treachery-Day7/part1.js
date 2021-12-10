const fs = require("fs")
const raw = fs.readFileSync("horizontalPos.txt", "utf8")

const positions = raw.split(",").map(num => Number(num)).sort((a,b) => a - b)

function leastFuel(oneDimCoords){
	//the median is the cheapest point to move to
	const alignment = oneDimCoords[Math.round(oneDimCoords.length / 2)]
	let fuelSpent = 0

	for (let pos of oneDimCoords){
		fuelSpent += Math.abs(pos - alignment)
	}
	return fuelSpent
}

console.log(leastFuel(positions))