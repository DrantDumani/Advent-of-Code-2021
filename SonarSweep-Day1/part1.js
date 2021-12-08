const fs = require("fs")
let raw = fs.readFileSync("depths.txt", "utf8")

const depths = raw.split(`\n`).map(el => Number(el))

function numOfIncreases(arr){
	let amount = 0
	for (let i = 1; i < arr.length; i++){
		if (arr[i] > arr[i - 1]) amount+=1
	}
	return amount
}

console.log(numOfIncreases(depths))