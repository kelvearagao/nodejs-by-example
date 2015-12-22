/**
 * Responsável pela geração da página HTML que os usuário irão ver no browser.
 *
 */

var fs = require('fs');
var html = fs.readFileSync(__dirname +  '/tpl/page.html').toString('utf8');

module.exports = function(req, res) {
	res.writeHead(200, {'Content-type' : 'text/html'});
	res.end(html + '\n');
}