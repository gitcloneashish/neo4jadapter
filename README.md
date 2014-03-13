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
```
<script src="neo4jadapter.js" type="text/javascript"></script>
```

To use it in your node project:
- Copy the neo4j folder in node_modules folder, and include neo4j
```
var neo4j = require('neo4j').neo4j
```

## Nodes

#### Get node with id 1:
```
var gurl = 'http://localhost:7474';

neo4j.node(1).adapter().load(gurl).done(function(node){
 // access node here
});
```

#### Delete node with id 1:
```
var gurl = 'http://localhost:7474';

neo4j.node(1, {del: true}).adapter().load(gurl).done(function(node){
 
});
```

## Relationships

#### Get all node relationships:
```
var gurl = 'http://localhost:7474';

neo4j.node(1).rels().adapter().load(gurl).done(function(ret){
 // access all node relationships
});
```

#### Get node relationship with id 100:
```
var gurl = 'http://localhost:7474';

neo4j.node(1).rels(100).adapter().load(gurl).done(function(ret){
 // access all node relationship with id 100
});
```

#### Get all node relationships of type 'KNOWS':
```
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS").adapter().load(gurl).done(function(ret){
 // access node relationships of type "KNOWS"
});
```

#### Get all 'incoming' relationship of type 'KNOWS' to a node:
```
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS", { dir: "in" }).adapter().load(gurl).done(function(ret){
 // access node relationships of type "KNOWS" as incoming relationship
});
```

#### Get all 'outgoing' relationship of type 'KNOWS' to a node:
```
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS", { dir: "out" }).adapter().load(gurl).done(function(ret){
 // access node relationships of type "KNOWS" as outgoing relationship
});
```

#### Delete all relationship of type 'KNOWS' to a node:
```
var gurl = 'http://localhost:7474';

neo4j.node(1).rels("KNOWS", { dir: 'all', del: true }).adapter().load(gurl).done(function(ret){
 
});
```

#### Get all relationship of type 'KNOWS':
```
var gurl = 'http://localhost:7474';

neo4j.rels("KNOWS", { dir: 'all' }).adapter().load(gurl).done(function(ret){
 
});
```

## Properties

#### To access node properties:
```
var gurl = 'http://localhost:7474';

neo4j.node(1).props().adapter().load(gurl).done(function(ret){
 // access all node properties
});
```

#### To access node property with name 'foo':
```
neo4j.node(1).props("foo").adapter().load(gurl).done(function(ret){
 // access node property with name 'foo'
});
```

#### Update node property:
```
neo4j.node(1).props("foo", "bar").adapter().load(gurl).done(function(ret){
 // updates node property "foo" with "bar"
});
```

#### Set node properties, deletes all previously set properties:
```
neo4j.node(1).props({ foo: "bar", name: "foo-bar" }).adapter().load(gurl).done(function(ret){
 // set node properties
});
```

#### To access relationship properties:
```
var gurl = 'http://localhost:7474';

neo4j.rel(1).props().adapter().load(gurl).done(function(ret){
 // access all rel properties
});
```

#### To access rel property with name 'foo':
```
neo4j.rel(1).props("foo").adapter().load(gurl).done(function(ret){
 // access rel property with name 'foo'
});
```
