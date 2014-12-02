
var neo4j = require("../lib/index");

neo4j
	.connect("http://localhost:7474")
	.node({name: "John"})
	.label("Person")
	.create(function (err, res) {
		
	});

var conn = neo4j
	.connect("http://localhost:7474");

conn
	.node({name: "John"})
	.remove(function(err, res){

	});

conn
	.node({name: "John"})
	.create(function(err, res){
		conn.node(1).remove(function(err, res){

		})
	});

conn
	.node({name: "John"})
	.get(function(err, res){

	});

conn
	.node({name: "John"})
	.put({age: 23, name: "John K"}, function(err, res){
		
	});