
var Context = require("./context");

var Conn = function (url) {
	this.url = url;
}

var objects = require('fs')
	.readdirSync(require('path').join(__dirname, 'objects'));

var extend = function(name) {
	var obj = require('./objects/' + name);
	Conn.prototype[name] = function(){
		var args=[];
		for (var i=0; i<arguments.length; i++){
			args.push(arguments[i]);
		}
		var context = new Context(this);
		var obj = new obj.create(
						context, args);
		transaction.add(obj);
		return obj;
	}
}

for (var i=0; i<objects.length; i++){
	extend(objects[i].split(".")[0]);
}

module.exports = Conn;