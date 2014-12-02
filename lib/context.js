
var Context = function (conn) {
	this.conn = conn;
	this.objs = [];
}
Context.prototype.add = function(obj){
	this.objs.push(obj);
	return this;
}

Context.prototype.create = function(cb){

	var exists = 0, actions = [];
	for (var i=0; i<this.objs.length; i++){
		var obj = this.objs[i]
			, exist = obj.exists("create")
			, action = obj.action("create");

		exists += exist ? 1 : 0;
		actions.push(action);
	}

	//if ()
}

module.exports = Context;