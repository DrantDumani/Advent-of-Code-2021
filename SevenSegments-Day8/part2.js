const fs = require("fs")
const raw = fs.readFileSync("signalPatterns.txt", "utf8")

const patterns = raw.replace(/\s\|\s/g, " ").split('\r\n').map(str => str.split(" "))

function decode(patternOutput){
	let sum = 0
	let zero = ""
	let one = ""
	let two = ""
	let three = ""
	let four = ""
	let five = ""
	let six = ""
	let seven = ""
	let eight = ""
	let nine = ""

	for (line of patternOutput){
		let outputVal = ""
		let pattern = line.slice(0,10)
		for (let str of pattern) {
			switch(str.length){
				case 2:
					one = str
					break
				case 7:
					eight = str
					break
				case 4:
					four = str 
					break
				case 3:
					seven = str 
					break
			}
		}

		let sixSegments = pattern.filter(str => str.length === 6)
		let fiveSegments = pattern.filter(str => str.length === 5)
		
		//find nine
		let fourArr = four.split("")
		for (let num of sixSegments){
			if (!fourArr.every(char => num.includes(char))) continue
			nine = num
			sixSegments = sixSegments.filter(str => str !== nine)
			break
		}

		//find six
		for (let char of seven){
			for (let num of sixSegments){
				if (!num.includes(char)) {
					six = num 
					sixSegments = sixSegments.filter(str => str !== six)
					break
				}
			}
			if (sixSegments.length === 1) break
		}
		//find zero
		zero = sixSegments[0]

		for (let num of fiveSegments){
			if (num.includes(one[0]) && num.includes(one[1])){
				three = num
				fiveSegments = fiveSegments.filter(str => str !== three)
				break
			}
		}

		for (let num of fiveSegments){
			let charsExcluded = 0
			for (let char of six){
				if (!num.includes(char))
					charsExcluded += 1
			}
			if (charsExcluded === 1){
				five = num
				fiveSegments = fiveSegments.filter(str => str !== five)
				break
			}
			if (fiveSegments.length === 1) break
		}

		two = fiveSegments[0]

		const output = line.slice(10)
		let fiveArr = five.split("")
		let twoArr = two.split("")
		let threeArr = three.split("")
		let nineArr = nine.split("")
		let sixArr = six.split("")
		let zeroArr = zero.split("")

		for (str of output){
			switch(str.length){
				case 2:
					outputVal += 1
					break
				case 7:
					outputVal += 8
					break
				case 4:
					outputVal += 4
					break
				case 3:
					outputVal += 7
					break
				case 5:
					if (fiveArr.every(char => str.includes(char))){
						outputVal += 5
						break
					}
					if (twoArr.every(char => str.includes(char))){
						outputVal += 2
						break
					}
					if (threeArr.every(char => str.includes(char))){
						outputVal += 3
						break
					}
				case 6:
					if (sixArr.every(char => str.includes(char))){
						outputVal += 6
						break
					}
					if (zeroArr.every(char => str.includes(char))){
						outputVal += 0
						break
					}
					if (nineArr.every(char => str.includes(char))){
						outputVal += 9
						break
					}
			}
		}
		sum += Number(outputVal)
	}
	return sum
}

console.log(decode(patterns))