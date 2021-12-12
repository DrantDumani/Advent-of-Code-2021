const fs = require("fs")
const raw = fs.readFileSync("signalPatterns.txt", "utf8")

const patterns = raw.replace(/(?<=\|)\s\n/g, " ").split('\r\n')
.map(str => str.match(/(?<=\|\s).*/)[0].split(" "))
.flat(Infinity)

function findDigits(output){
	const numOfSegments = num => {
		switch(num){
			case 0:
			case 6:
			case 9:
				return 6
			case 1: 
				return 2
			case 2:
			case 3:
			case 5:
				return 5
			case 4: 
				return 4
			case 7:
				return 3
			case 8:
				return 7
			default: throw new Error("Invalid input. Not a number")
		}
	}

	const zero = numOfSegments(0)
	const one = numOfSegments(1)
	const two = numOfSegments(2)
	const three = numOfSegments(3)
	const four = numOfSegments(4)
	const five = numOfSegments(5)
	const six = numOfSegments(6)
	const seven = numOfSegments(7)
	const eight = numOfSegments(8)
	const nine = numOfSegments(9)

	const easyNumbers = [one, four, seven, eight]
	let numOfAppearances = 0

	for (let str of output){
		if (easyNumbers.includes(str.length)) numOfAppearances += 1
	}
	return numOfAppearances
}

console.log(findDigits(patterns))