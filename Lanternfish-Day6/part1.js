const fs = require("fs")
const raw = fs.readFileSync("fishPopulation.txt", "utf8")

const population = raw.split(",")

function popGrowth(initPop, days) {
	let init = {}
	for (let el of initPop){
		init[el] = init[el] + 1 || 1
	}
	
	for (let d = 0; d < days; d++){
		let newPop = {}
		for (let k of Object.keys(init)){
			key = Number(k)
			switch (key){
				case 0: 
					newPop[8] = init[key]
					newPop[6] = init[key] + newPop[6] || init[key]
					break;
				default:
					newPop[key - 1] = init[key] + newPop[key - 1] || init[key]
			}
		}
		init = newPop
	}
	// return init
	return Object.values(init).reduce((acc, el) => acc + el,0)
}

console.log(popGrowth(population, 80))