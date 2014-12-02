
var Neobj = function (context) {
	this.context = this.context.add(this);
}
Neobj.prototype.create = function(options, cb){
	return this.context.create(cb);
}
Neobj.prototype.remove = function(options, cb){
	return this.context.remove(cb);
}
Neobj.prototype.get = function(options, cb){
	return this.context.get(cb);
}
Neobj.prototype.update = function(options, cb){
	return this.context.update(cb);
}

exports.Neobj = Neobj;