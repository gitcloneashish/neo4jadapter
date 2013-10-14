neo4jadapter
============

neo4j javascript data adapter, provide simple javascript api to query neo4j graph db

neo4j.query("create (n:Node{node})")
        .args({
          id: 1,
          name: 'John'
        }).adapter() 
        .load('http://localhost:7474/db/cypher')
        .done(function(data) {
          // do something
        })
        .fail(function(err)) {
          // do something
        }
        .always(function() {
          // do something
        });

neo4j.query("match (n:Node) where n.id = '%s' return n.name")
        .adapter('1')
        .load('http://localhost:7474/db/cypher')
        .done(function(data) {
          alert(data.data[0][0]);
        });

note
====
requires jquery
