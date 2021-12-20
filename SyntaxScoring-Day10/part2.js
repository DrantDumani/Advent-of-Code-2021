const fs = require("fs")
const raw = fs.readFileSync("navSys.txt", "utf8")

const navSys = raw.split("\n")

function fixIncomplete(input){
	const findMatch = (str, src, pos) => {
		let index = src.indexOf(str)
		return pos === 1 ? src.substring(index - 1, index + 1) :
		pos === 0 ? src.substring(index, index + 2) : Error("Invalid index. Matches are only two characters long")
	}

	const scoreBoard = []
	let closeChars = "}])>"
	const matches = "[]{}<>()"
	const scoreSystem = {
		"]": 2,
		"}": 3,
		")": 1,
		">": 4
	}
	for (let str of input){
		let score = 0
		let incomplete = true
		let openChar = ""
		let currMatch = null
		const openingQueue = []
		for (let char of str){
			if (!closeChars.includes(char)){
				openingQueue.push(char)
			}
			else {
				currMatch = findMatch(char, matches, 1)
				if (openChar !== currMatch[0]){
					incomplete = false
					break
				}
				else {
					openingQueue.pop()
				}
			}
			openChar = openingQueue[openingQueue.length - 1]
		}
		if (incomplete){
			for (let i = openingQueue.length - 1; i >= 0; i--){
				let pair = findMatch(openingQueue[i], matches, 0)
				score = score * 5 + scoreSystem[pair[1]]
			}
			scoreBoard.push(score)
		}
	}
	return scoreBoard.sort((a,b) => a - b)[(scoreBoard.length - 1)/2]
}

console.log(fixIncomplete(navSys))