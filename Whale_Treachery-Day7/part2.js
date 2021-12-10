const fs = require("fs")
const raw = fs.readFileSync("horizontalPos.txt", "utf8")

const positions = raw.split(",").map(num => Number(num)).sort((a,b) => a - b)

function leastFuel(oneDimCoords){
	const median = oneDimCoords[Math.round(oneDimCoords.length / 2)]
	let fuelSpent = 0

	for (let pos of oneDimCoords){
		fuelSpent += findFuelRate(Math.abs(pos - median))
	}
	let testPos = median + 1
	while (true){
		let lowest = 0
		for (let pos of oneDimCoords){
			lowest += findFuelRate(Math.abs(pos - testPos))
		}
		if (lowest > fuelSpent) break
		fuelSpent = lowest
		testPos += 1
	}
	return fuelSpent
}

function fuelRateTracker(){
	const fuelConverter = {0:0, 1:1}

	return function rateFinder(num){
		if (fuelConverter[num] >= 0) return fuelConverter[num]
		else if (num === 1) return 1
		else {
			return fuelConverter[num] = num + rateFinder(num - 1)
		}
	}
}

const findFuelRate = fuelRateTracker()

console.log(leastFuel(positions))