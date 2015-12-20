/*
exports.name = 'Node.js by example';
exports.read = function() {
	console.log('I am reading ' + exports.name);
}
*/

// Retornanto objeto (errado)
/*
var ratePoint = 0;
exports.rate = function(points) {
	ratePoints = points;
}
exports.getPoints = function() {
	return ratePoints;
}
*/


// Retornando função (certo)
module.exports = function() {
	var ratePoints = 0;
	
	return {
		rate: function(points) {
			ratePoints = points;
		},
		getPoints: function() {
			return ratePoints;
		}
 	}
}