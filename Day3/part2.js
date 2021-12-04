const fs = require("fs")
const raw = fs.readFileSync("binaryData.txt", "utf8")

const binary = raw.split(`\n`).map(str => str.replace('\r', ""))

function findRating(arr, criteria){
	let value = ""
	let index = 0
	let possibleVals = arr
	while (possibleVals.length > 1){
		let startsWithZero = []
		let startsWithOne = []
		for (let str of possibleVals){
			str[index] === "1" ? startsWithOne.push(str) : startsWithZero.push(str)
		}
		switch (criteria){
			case "most":
				startsWithZero.length > startsWithOne.length ? possibleVals = startsWithZero : possibleVals = startsWithOne
				break;
			case "least":
				startsWithZero.length <= startsWithOne.length ? possibleVals = startsWithZero : possibleVals = startsWithOne
				break
			default: 
				throw new Error("invalid criteria")
		}
		index += 1
	}
	value = possibleVals[0]
	return parseInt(value, 2)
}

console.log(findRating(binary, "most") * findRating(binary, "least"))