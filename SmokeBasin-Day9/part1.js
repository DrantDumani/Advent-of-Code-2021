const fs = require("fs")
const raw = fs.readFileSync("heightMap.txt", "utf8")

const heightMap = raw.split('\r\n').map(line => line.split("").map(num => Number(num)))

function riskLevel(points){
	let sum = 0
	const roofAndLeftWall = 0
	const ground = points.length - 1
	const rightWall = points[0].length - 1
	const invalidIndices = []

	const confirmEdges = (lowerLimit, upperLimit, point) => {
		let validPoints = []
		switch(point){
			case lowerLimit:
				validPoints.push(point + 1)
				break;
			case upperLimit:
				validPoints.push(point - 1)
				break
			default:
				validPoints.push(point - 1, point + 1)
		}
		return validPoints
	}

	const findLowPoint = (xArr, yArr, currX, currY) => {
		let point = points[currY][currX]
		let lowest = true
		
		for (let el of yArr){
			if (point >= points[el][currX]){
				lowest = false
			}
			else {
				invalidIndices.push(`${el}&${currX}`)
			}
		}

		for (let el of xArr){
			if (point >= points[currY][el]){
				lowest = false
			}
			else {
				invalidIndices.push(`${currY}&${el}`)
			}
		}
		return lowest ? point + 1 : 0
	}

	for (let y = 0; y < points.length; y++){
		for (let x = 0; x < points[0].length; x++){
			if (invalidIndices.includes(`${y}&${x}`)) continue
			let adjX = confirmEdges(roofAndLeftWall, rightWall, x)
			let adjY = confirmEdges(roofAndLeftWall, ground, y)

			sum += findLowPoint(adjX, adjY, x, y)
		}
	}
	return sum
}

console.log(riskLevel(heightMap))