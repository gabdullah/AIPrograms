var math = require('mathjs')
var data = require('./neuralNetInput.json')

var layerOneWeights = math.matrix(data.layerOneWeights)
var layerTwoWeights = math.matrix(data.layerTwoWeights)
var threshold = data.threshold

var tests = []
var exceptions = []

// Generate all 100 test cases
function generateTests() {
	for (var i = 0; i < 100; i++) {
		tests.push([])
		var input = []
		// Generating input cases
		for (var j = 0; j < 4; j++) {
			input.push(math.round(math.random()))
		}
		tests[i].push(input)

		// Generating output cases
		var inputString = JSON.stringify(input)
		var exceptionString = JSON.stringify(exceptions)
		if (exceptionString.indexOf(inputString) != -1)
			tests[i].push([1, 0, 0])
		else
			tests[i].push([1, 0, 1])
	}
}

// Cases found after training
function setExceptions() {
	exceptions.push([1, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0])
	exceptions.push([1, 0, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0])
}

function compute() {
	setExceptions()
	generateTests()

	var layerOneOutput = []
	var layerTwoInput = []
	var layerTwoOutput = []
	var trueOutput = []
	var output = []
	for (var i = 0; i < tests.length; i++) {
		// Calculate first value to plug into signum function
		layerOneOutput = math.multiply(layerOneWeights.valueOf(), tests[i][0])

		// Hidden layer signum function
		layerTwoInput = []
		for (var j = 0; j < 4; j++) {
			layerTwoInput.push(1 / (1 + math.pow(math.e, (layerOneOutput[j] * -1))))
		}

		// Calculate second value to plug into signum function
		layerTwoOutput = math.multiply(layerTwoWeights.valueOf(), layerTwoInput)

		// Output layer signum function
		trueOutput = []
		output.push([])
		for (var j = 0; j < 3; j++) {
			trueOutput.push(1 / (1 + math.pow(math.e, (layerTwoOutput[j] * -1))))

			// Check to see if output is over threshold
			if (trueOutput[j] > threshold)
				output[i].push(1)
			else
				output[i].push(0)
		}

		//console.log(trueOutput)
		console.log("Input", tests[i][0], "Output:", output[i], "Expected Output:", tests[i][1])
	}
}

compute()
