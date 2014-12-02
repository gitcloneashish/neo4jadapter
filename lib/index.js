
var Conn = require("./conn");

module.exports.connect = function (url) {
	return new Conn(url);
}