const fs = require("fs")
const raw = fs.readFileSync("heightMap.txt", "utf8")

const heightMap = raw.split('\r\n').map(line => line.split("").map(num => Number(num)))

function riskLevel(points){
	let depths = []
	const recordedDepths = [] //for preventing duplicate values
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
		return lowest
	}

	function findDepth(currY, currX, yArr, xArr){
		recordedDepths.push(`${currY}&${currX}`)
		const neighbors = []
		let adjX = xArr || confirmEdges(roofAndLeftWall, rightWall, currX)
		let adjY = yArr || confirmEdges(roofAndLeftWall, ground, currY)

		for (let el of adjY){
			neighbors.push([el, currX])
		}

		for (let el of adjX){
			neighbors.push([currY, el])
		}

		let valid = neighbors.filter(el => points[el[0]][el[1]] !== 9 && !recordedDepths.includes(`${el[0]}&${el[1]}`))
		for (let coord of valid){
			recordedDepths.push(`${coord[0]}&${coord[1]}`)
		}

		switch (valid.length){
			case 0:
				return 1 
			case 1:
				return 1 + findDepth(valid[0][0], valid[0][1])
			case 2:
				return 1 + findDepth(valid[0][0], valid[0][1]) + findDepth(valid[1][0], valid[1][1])
			case 3:
				return 1 + findDepth(valid[0][0], valid[0][1]) + findDepth(valid[1][0], valid[1][1]) + findDepth(valid[2][0], valid[2][1])
			case 4:
				return 1 + findDepth(valid[0][0], valid[0][1]) + findDepth(valid[1][0], valid[1][1]) + findDepth(valid[2][0], valid[2][1]) + findDepth(valid[3][0], valid[3][1])
		}
	}

	for (let y = 0; y < points.length; y++){
		for (let x = 0; x < points[0].length; x++){
			if (invalidIndices.includes(`${y}&${x}`)) continue
			let adjX = confirmEdges(roofAndLeftWall, rightWall, x)
			let adjY = confirmEdges(roofAndLeftWall, ground, y)

			if (findLowPoint(adjX, adjY, x, y)){
				depths = depths.concat(findDepth(y, x, adjY, adjX))
			}
		}
	}

	for (let i = 0; i < 3; i++){
		depths = depths.sort((a,b) => b - a).slice(0,3)
	}
	return depths.reduce((acc, el) => acc * el, 1)
}

console.log(riskLevel(heightMap))