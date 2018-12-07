var data = require('./hmmInput.json')
var math = require('mathjs')

var numberOfStates = parseInt(data.numberOfStates)
var numberOfEmissions = parseInt(data.numberOfEmissions)
var givenSequence = data.transitionSequence

var transitionMatrix = []
var emissionMatrix = []
var initialProbabilities = []
var transitionSequence = []
transitionMatrix = math.matrix(generateWeights(numberOfStates, transitionMatrix))
emissionMatrix = math.matrix(generateWeights(numberOfEmissions, emissionMatrix))
initialProbability = math.matrix(generateWeights(numberOfStates, initialProbabilities, true))
//var stepProbability = initialProbabilities

console.log("\nStates: ", numberOfStates)
console.log("\nEmissions: ", numberOfEmissions)
console.log("\nTransition Matrix:\n", transitionMatrix.valueOf())
console.log("\nEmission Matrix:\n", emissionMatrix.valueOf())
console.log("\nInitial Probabilities:\n", initialProbabilities.valueOf())
console.log("\nGiven Sequence:", givenSequence)

function sequence() {
	//var allStatesInSequence = false
	
	// for (var i = 0; i < givenSequence.length; i++) {
	// 	var states = []
	for (var j = 0; j < numberOfStates; j++) {
		var temp = probability(j, initialProbability, transitionMatrix).valueOf()

		//console.log("Sorted:", temp)
	}
		

		// stepProbability = probability(i, stepProbability, transitionMatrix)

		// var greatest = 0
		// var greatestPlace = -1
		// stepProbability.valueOf().forEach((value) => {
		// 	if (value > greatest) {
		// 		greatest = value
		// 		greatestPlace = stepProbability.valueOf().indexOf(value)
		// 	}
		// })
		// transitionSequence.push(greatestPlace + 1)

		// if (i == 15)
		// 	break

		// for (var j = 0; j < numberOfStates; j++) {
		// 	if (transitionSequence.includes(j + 1))
		// 		allStatesInSequence = true
		// 	else {
		// 		allStatesInSequence = false
		// 		break
		// 	}
		// }
	// }

	console.log("\nTransition Sequence:", transitionSequence)
}

function probability(step, input, matrix) {
	tempProbability = math.multiply(matrix.valueOf(), input)
	console.log("\nStep", step+1, "probability: ")
	console.log(tempProbability.valueOf())
	return tempProbability
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