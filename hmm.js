var data = require('./hmmInput.json')
var math = require('mathjs')

var numberOfStates = parseInt(data.numberOfStates)
var numberOfEmissions = parseInt(data.numberOfEmissions)
var initialProbabilities = math.matrix(data.initialProbabilities)
var emissionMatrix = math.matrix(data.emissionMatrix)
var transitionMatrix = math.matrix(data.transitionMatrix)

var stepProbability = initialProbabilities
var transitionSequence = []

console.log("\nStates: ", numberOfStates)
console.log("\nEmissions: ", numberOfEmissions)
console.log("\nInitial Probabilities: ", initialProbabilities.valueOf())
console.log("\nEMatrix: ", emissionMatrix.valueOf())
console.log("\nTMatrix: ", transitionMatrix.valueOf())

function sequence() {
	var allStatesInSequence = false
	for (var i = 0; allStatesInSequence == false; i++) {
		probability(i, stepProbability)

		var greatest = 0
		var greatestPlace = -1
		stepProbability.valueOf().forEach((value) => {
			if (value > greatest) {
				greatest = value
				greatestPlace = stepProbability.valueOf().indexOf(value)
			}
		})
		transitionSequence.push(greatestPlace + 1)

		if (i == 15)
			break

		for (var j = 0; j < numberOfStates; j++) {
			if (transitionSequence.includes(j + 1))
				allStatesInSequence = true
			else {
				allStatesInSequence = false
				break
			}
		}
	}

	console.log("\nTransition Sequence:", transitionSequence)
}

function probability(step, input) {
	stepProbability = math.multiply(transitionMatrix.valueOf(), input)
	console.log("\nStep", step+1, "probability: ")
	console.log(stepProbability.valueOf())
}

sequence()