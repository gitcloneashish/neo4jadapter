# Neo4j Adapter

Neo4j adapter is a simple javascript library which provides easy and intuitive API to interact with [Neo4j](http://neo4j.org) graph db. It is available in client side javascript and nodejs flavors.

## Table of contents

 - [Quick start](#quick-start)
 - [Nodes](#nodes)
 - [Relationships](#relationships)
 - [Properties](#properties)
 - [Labels](#labels)
 - [Traversing](#traversing)
 - [Cypher](#cypher)
 - [Batch](#batch)

## Quick start

To use it on client side:

- Simply include the javascript library, neo4jadapter.js, in your html page.
``` bash
<script src="neo4jadapter.js" type="text/javascript"></script>
```

To use it in your node project:
- Copy the neo4j folder in node_modules folder, and include neo4j
``` bash
var neo4j = require('neo4j').neo4j
```

## Nodes

#### Get node with id 1:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).adapter().load(gurl).done(function(node){
 // access node here
});
```

#### Delete node with id 1:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1, {del: true}).adapter().load(gurl).done(function(node){
 
});
```

## Relationships

#### Get all node relationships:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).rels().adapter().load(gurl).done(function(ret){
 // access all node relationships
});
```

#### Get node relationship with id 100:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).rels(100).adapter().load(gurl).done(function(ret){
 // access all node relationship with id 100
});
```

#### Get all node relationships of type 'KNOWS':
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS").adapter().load(gurl).done(function(ret){
 // access node relationships of type "KNOWS"
});
```

#### Get all 'incoming' relationship of type 'KNOWS' to a node:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS", { dir: "in" }).adapter().load(gurl).done(function(ret){
 // access node relationships of type "KNOWS" as incoming relationship
});
```

#### Get all 'outgoing' relationship of type 'KNOWS' to a node:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS", { dir: "out" }).adapter().load(gurl).done(function(ret){
 // access node relationships of type "KNOWS" as outgoing relationship
});
```

#### Delete all relationship of type 'KNOWS' to a node:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS", { dir: 'all', del: true }).adapter().load(gurl).done(function(ret){
 
});
```

#### Get all relationship of type 'KNOWS':
``` bash
var gurl = 'http://localhost:7474';

neo4j.rels("KNOWS", { dir: 'all' }).adapter().load(gurl).done(function(ret){
 
});
```

## Properties

#### To access node properties:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).props().adapter().load(gurl).done(function(ret){
 // access all node properties
});
```

#### To access node property with name 'foo':
``` bash
neo4j.node(1).props("foo").adapter().load(gurl).done(function(ret){
 // access node property with name 'foo'
});
```

#### Update node property:
``` bash
neo4j.node(1).props("foo", "bar").adapter().load(gurl).done(function(ret){
 // updates node property "foo" with "bar"
});
```

#### Delete node property:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).props("foo", {del: true}).adapter().load(gurl).done(function(ret){
 // delete node property of type "foo"
});
```

#### Set node properties, deletes all previously set properties:
``` bash
neo4j.node(1).props({ foo: "bar", name: "foo-bar" }).adapter().load(gurl).done(function(ret){
 // set node properties
});
```

#### To access relationship properties:
``` bash
var gurl = 'http://localhost:7474';

neo4j.rel(1).props().adapter().load(gurl).done(function(ret){
 // access all rel properties
});
```

#### To access rel property with name 'foo':
``` bash
neo4j.rel(1).props("foo").adapter().load(gurl).done(function(ret){
 // access rel property with name 'foo'
});
```

## Labels

#### To add label to node:
``` bash
var gurl = 'http://localhost:7474';

neo4j.node(1).label("user").adapter().load(gurl).done(function(ret){
 // add label "user" to node
});
```

## Traversing


## Cypher

#### To query using cypher:
``` bash
var gurl = 'http://localhost:7474';

neo4j.query("start n=node(1) return n.id").adapter().load(gurl).done(function(ret){
 // return id of node 1
});
```

#### To pass arguments to cypher:
``` bash
var gurl = 'http://localhost:7474';

neo4j.query("start n=node(%s) match n-[:KNOWS]->r where r.country = '%s' return r.name where n.name").adapter(1, 'USA').load(gurl).done(function(ret){
 // return all person whome node 1 knows and stays in USA
});
```

## Batch

Batch queries are used to combine set of operation and hit once, which saves time and are faster. To create batch using adapter is simple. Create batch as:

``` bash
var batch = neo4j.batch()
```
and then keeps on adding actions to batch, which will hit sequentially. For example to set two properties on a node 1:
``` bash
var gurl = 'http://localhost:7474';

neo4j.batch()
.add("props", "node", 1, "foo", "bar")
.add("props", "node", 1, "blah", "blah")
.adapter().load(gurl).done(function(ret){
 // set two properties on node 1
});
```

To refer an item perviously in batch:
``` bash
var gurl = 'http://localhost:7474';

neo4j.batch()
.add("node", { "name": "John" })
.add("label", "{0}", "person") // refers, to item at 0 index in batch by {0}
.add("node", { "name": "Marie" })
.add("label", "{2}", "person") // refers, to item at 2 index in batch by {2}
.add("rel", "LOVES", { "from": "{0}", "to": "{2}" })
.adapter().load(gurl).done(function(ret){
 // creates John-[:LOVES]->Marie
});
```
