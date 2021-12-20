const fs = require("fs")
const raw = fs.readFileSync("navSys.txt", "utf8")

const navSys = raw.split("\n")

function findSyntaxErrors(input){
	const findMatch = (str, src) => {
		let index = src.indexOf(str)
		return src.substring(index - 1, index + 1)
	}

	let score = 0
	let closeChars = "}])>"
	const matches = "[]{}<>()"
	const scoreSystem = {
		"]": 57,
		"}": 1197,
		")": 3,
		">": 25137
	}
	for (let str of input){
		let openChar = ""
		let currMatch = null
		const openingQueue = []
		for (let char of str){
			if (!closeChars.includes(char)){
				openingQueue.push(char)
			}
			else {
				currMatch = findMatch(char, matches)
				if (openChar !== currMatch[0]){
					score += scoreSystem[char]
					break
				}
				else {
					openingQueue.pop()
				}
			}
			openChar = openingQueue[openingQueue.length - 1]
		}
	}
	return score
}

console.log(findSyntaxErrors(navSys))