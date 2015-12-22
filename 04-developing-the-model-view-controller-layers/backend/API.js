/**
 * REST API
 *
 */
module.exports = function(req, res) {
	res.writeHead(200, {'Content-type' : 'aplication/json'});
	res.end('{}' + '\n');
}