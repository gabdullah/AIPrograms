// Random point generation
function generatePoints(num, range) {
	for (var i = 0; i < num; i++) {
		var x = Math.round(Math.random() * (range-1) + 1); 
		var y = Math.round(Math.random() * (range-1) + 1);

		if (check(x, y) == true)
			points.push([x, y])
		else 
			i--;
	}
	console.log("\nPoints: ", points)
}

// Checks to see if the point already exists in the set
function check(x, y) {
	for (var i in points) {
		if (points[i][0] == x && points[i][1] == y)
			return false
	}
	return true
}

function kmeans(cluster, threshold) {
	// For create the number of clusters input
	for (var i = 0; i < cluster; i++) {
		var point = Math.round(Math.random() * (maxRange-1));
		maxRange--;
		
		// Add point to the cluster
		// Take out point from the original set
		clusters.push([points[point]])
		points.splice(point, 1)
	}

	// Print 1st iteration of Points/Clusters
	console.log("\nPoints: ", points)
	console.log("Clusters: ", clusters)

	while(true) {
		// Keep track of original length to detect change later
		var oldPoints = points.length;

		// Run once per cluster then repeat
		for (var i = 0; i < cluster; i++) {
			// Calculate the centroid of the cluster
			var centroidx = calculateCentroidx(i); 
			var centroidy = calculateCentroidy(i);

			var shortestPlace = -1;
			var shortestValue = 1000;
			// For all points remaining in the set,
			//   find the closest one to the cluster
			for (var j = 0; j < points.length; j++) {
				var x = points[j][0] - centroidx;
				var y = points[j][1] - centroidy;
				var distance = Math.sqrt(x*x + y*y)
				
				if (distance < shortestValue) {
					shortestValue = distance;
					shortestPlace = j;
				}
			}

			// Check if the closest one is under the threshold
			// Add that point to the cluster and remove it 
			//   from the original set
			if (shortestPlace != -1 && shortestValue <= threshold) {
				clusters[i].push(points[shortestPlace])
				points.splice(shortestPlace, 1)
			}

			// Recalculate the centroid to see if any of the points
			//   in the cluster are now above the threshold
			centroidx = calculateCentroidx(i);
			centroidy = calculateCentroidy(i);
			for (var j = 0; j < clusters[i].length; j++) {
				var x = clusters[i][j][0] - centroidx;
				var y = clusters[i][j][1] - centroidy;
				var distance = Math.sqrt(x*x + y*y)

				// Remove the point from the cluster and add it
				//   back to the original set
				if (distance > threshold) {
					console.error("Point removed")
					points.push(clusters[i][j])
					clusters[i].splice(j, 1)
					break
				}
			}
		}

		// Print next iteration of points/clusters
		console.log("\nPoints: ", points)
		console.log("Clusters: ", clusters)

		// If no more points in the set, quit the loop
		if (points.length == 0)
			break;
		// If no points were removed/added to any cluster, quit the loop
		if (oldPoints == points.length)
			break;
	}
}

function calculateCentroidx(i) {
	var res = 0;
	for (var j = 0; j < clusters[i].length; j++) {
		res += clusters[i][j][0]
	}
	return res / clusters[i].length
}

function calculateCentroidy(i) {
	var res = 0;
	for (var j = 0; j < clusters[i].length; j++) {
			res += clusters[i][j][1]
		}
	return res / clusters[i].length
}

var data = require('./kmeansInput.json')

var points = []
var clusters = []

var numberOfPoints = parseInt(data.numberOfPoints) 
var maxRange = parseInt(data.maxRange) 

var k = parseInt(data.k) 
var threshold = parseInt(data.threshold) 

generatePoints(numberOfPoints, maxRange)
kmeans(k, threshold)