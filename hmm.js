var data = require('./hmmInput.json')
var math = require('mathjs')

var numberOfStates = data.numberOfStates
var numberOfEmissions = data.numberOfEmissions
var givenSequence = data.transitionSequence

var transitionMatrix = []
var emissionMatrix = []
var initialProbabilities = []
var transitionSequence = []
transitionMatrix = math.matrix(generateWeights(numberOfStates, transitionMatrix))
emissionMatrix = math.matrix(generateWeights(numberOfEmissions, emissionMatrix))
initialProbability = math.matrix(generateWeights(numberOfStates, initialProbabilities, true))

console.log("\nStates: ", numberOfStates)
console.log("\nEmissions: ", numberOfEmissions)
console.log("\nTransition Matrix:\n", transitionMatrix.valueOf())
console.log("\nEmission Matrix:\n", emissionMatrix.valueOf())
console.log("\nInitial Probabilities:\n", initialProbabilities.valueOf())
console.log("\nGiven Observation:", givenSequence, '\n')



function sequence() {
	// OLD
	// var prevIndex = 0
	// for (var i = 0; i < givenSequence.length; i++) {
	// 	var stepProbability = []
	// 	for (var j = 0; j < numberOfStates; j++) {
	// 		if (i == 0) {
	// 			stepProbability.push(initialProbability.valueOf()[j] * emissionMatrix.valueOf()[j][givenSequence[i]-1])
	// 		}
	// 		else {
	// 			stepProbability.push(transitionMatrix.valueOf()[j][prevIndex] * emissionMatrix.valueOf()[j][givenSequence[i]-1])
	// 		}
	// 	}
	// 	// Finding max probability and index of it
	// 	maxStepProbability = Math.max.apply(null, stepProbability)
	// 	maxStepProbabilityIndex = stepProbability.indexOf(maxStepProbability)
	// 	prevIndex = maxStepProbabilityIndex

	// 	// Adding that index to the transition sequence
	// 	transitionSequence.push(maxStepProbabilityIndex+1)
	// 	console.log("Step", i+1, "probability:\n",stepProbability)
	// }
	// console.log("\nTransition Sequence:", transitionSequence)

	var probability = []
	var set = []
	for (var i = 0; i < numberOfStates; i++) {
		set.push(i)
	}

	multiArray = []
	for (var i = 0; i < givenSequence.length; i++) {
		multiArray.push(set)
	}

	var cartesian = [[]]
	for (var i = 0; i < multiArray.length; i++) {
		var subArray = multiArray[i]
		var temp = []
		for (var j = 0; j < cartesian.length; j++) {
			for (var k = 0; k < subArray.length; k++) {
				temp.push(cartesian[j].concat(subArray[k]))
			}
		}
		cartesian = temp
	}

	var maxProbability = -1
	var bestPath = []
	cartesian.forEach((sequence) => {
		var result = 1
		for (var i = 0; i < sequence.length; i++) {
			if (i == 0) {
				result *= initialProbability.valueOf()[sequence[i]] * emissionMatrix.valueOf()[givenSequence[i]-1][sequence[i]]
			}
			else {
				result *= transitionMatrix.valueOf()[sequence[i]][sequence[i-1]] * emissionMatrix.valueOf()[givenSequence[i]-1][sequence[i]]
			}
		}
		probability.push(result)
		if (result > maxProbability) {
			maxProbability = result
			bestPath = sequence
		}
	})
	// All probabilities
	//console.log(probability)

	for (var i = 0; i < givenSequence.length; i++) {
		bestPath[i] = bestPath[i] + 1
	}

	// Final Output
	console.log("Best path for given observation is:", bestPath)
	console.log("With a probability of:", maxProbability)
}

// Random weight generation
function generateWeights(num, matrix, initial=false) {
	for (var i = 0; i < num; i++)
		matrix.push([])

	if (initial)
		num2 = 1
	else
		num2 = num

	for (var i = 0; i < num2; i++) {
		var column = []
		var sum = 0
		for (var j = 0; j < num; j++){
			var x = parseFloat(Math.random().toFixed(2))

			if ((x + sum) >= 1) {
				if (sum == 1)
					column.push(0)
				else {
					x = parseFloat((1 - sum).toFixed(2))
					sum = 1
					column.push(x)
				}
			}
			else if ((sum != 1) && (j == num-1))
				column.push(parseFloat((1 - sum).toFixed(2)))
			else {
				column.push(x)
				sum += x
			}
		}
		shuffleArray(column)
		for (var j = 0; j < num; j++)
			matrix[j].push(column[j])
	}
	return matrix
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

sequence()