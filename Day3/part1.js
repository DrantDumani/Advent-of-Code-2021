const fs = require("fs")
const raw = fs.readFileSync("binaryData.txt", "utf8")

const binary = raw.split(`\n`).map(str => str.replace('\r', ""))

function powerConsumption(arr){
	let gamma = ""
	let epsilon = ""
	for (let charInd = 0; charInd < arr[0].length; charInd++){
		let startInd = 0
		let endInd = arr.length - 1
		let zeroBitCount = 0
		let oneBitCount = 0
		let remainingNums = endInd
		while (startInd <= endInd){
			arr[startInd][charInd] == "1" ? oneBitCount += 1 : zeroBitCount += 1
			arr[endInd][charInd] == "1" ? oneBitCount += 1 : zeroBitCount += 1
			remainingNums -= 2
			let higherCount = Math.max(zeroBitCount, oneBitCount)
			let lowerCount = Math.min(zeroBitCount, oneBitCount)
			if (higherCount > lowerCount + remainingNums) break
			startInd += 1
			endInd -= 1
		}
		zeroBitCount > oneBitCount ? (gamma += "0", epsilon += "1") : (gamma += "1", epsilon += "0")
	}
	return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

console.log(powerConsumption(binary))