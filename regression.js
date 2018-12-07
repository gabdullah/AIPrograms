var math = require('mathjs')
var data = require('./regressionInput.json')

var points = data.points

console.log("\nFor the points:\n", points)

// Sum of all points
var Sx = 0
var Sy = 0
var num = 0

points.forEach((point) => {
	num++;
	Sx += parseInt(point.x)
	Sy += parseInt(point.y)
})

// Mean of x and y
var Mx = Sx / num;
var My = Sy / num;

// Sum of the Product of (X-Mx)(Y-My)
var SP = 0;

// Sum of the Squares (X-Mx)^2 and (Y-My)^2
var SSx = 0
var SSy = 0

points.forEach((point) => {
	var x = (point.x - Mx)
	var y = (point.y - My)
	SP += x * y
	SSx += math.square(x)
	SSy += math.square(y)
})

var b = SP / SSx
var m = My - b * Mx

// Output equation of line
console.log("\ny =", m + "X +", b)

var r = SP / math.round(math.sqrt(SSx * SSy), 2)

// Output regression value
console.log("r =", r)