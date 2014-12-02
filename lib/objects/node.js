
var util = require('util')
	, Neobj = require("../neobj").Neobj
	, label = require("./label");

var Node = function (context, args) {
	this.context = context;
	Neobj.call(this);
}

util.inherits(Node, Neobj);

Node.prototype.label = function(){
	var args=[];
	for (var i=0; i<arguments.length; i++){
		args.push(arguments[i]);
	}

	return label.create(this.context, args);
}

module.exports.create = function(context, args) {
	return new Node(context, args);
}