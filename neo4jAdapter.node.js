var http = require('http');
var url = require("url");

String.prototype.format = function () {
    var args = [];
    if (arguments.length == 1) args = arguments[0];
    else if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++)
            args.push(arguments[i]);
    }
    if (!(args instanceof Array)) args = [args];
    var bits = this.split(/%s/g);
    var ret = [];
    for (var i = 0; i < bits.length - 1; i++) {
        ret.push(bits[i]);
        if (i < args.length) ret.push(args[i]);
    }
    ret.push(bits[i]);
    return ret.join('');
};

/*
   neo4j data loader
*/
var neo4j = {
    name: "neo4j",
    "dataLoader": {}
};

// query adapter
(function () {

    this.Query = function (query) {
        this.q = query;
        this.qargs = {};
    };
    this.Query.prototype.range = function (start, end) {
        this.skip(start).limit(end - start);
        return this;
    };
    this.Query.prototype.skip = function (val) {
        this.q += " skip " + val;
        return this;
    };
    this.Query.prototype.limit = function (val) {
        this.q += " limit " + val;
        return this;
    };
    this.Query.prototype.query = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
        this.q = this.q.format(args);
        return this.q + "~neo4j.q";
    };
    this.Query.prototype.args = function (args) {
        this.qargs = args;
        return this;
    };
    this.Query.prototype.adapter = function () {
        return new neo4j.loader.Adapter({
            query: this.query.apply(this, arguments),
            args: this.qargs,
            url: url
        });
    };

    this.query = function (query) {
        return new neo4j.Query(query);
    };
}).call(neo4j);

// dataLoader
(function () {
    this.Adapter = function (params) {
        this.target = params.target;
        this.url = params.url;
        this.args = params.args != undefined ? params.args : {};
        this.data = JSON.stringify({
            "query": params.target,
            "params": params.args
        });

        this.options = {
            host: "",
            path: "",
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
    };
    this.Adapter.prototype.load = function (u) {
        this.options.host = url.parse(u).host;
        this.options.path = url.parse(u).path;
        this.__req__ = http.request(this.options, function (res) {
            res.setEncoding('utf8');
        });
        this.__req__.write(this.data);
        this.__req__.end();
        return this;
    };
    this.Adapter.prototype.done = function (callback) {
        this.__req__.on("data", callback);
        return this;
    };
    this.Adapter.prototype.fail = function (callback) {
        this.__req__.on("error", callback);
        return this;
    };
    this.Adapter.prototype.always = function (callback) {
        this.__req__.always(callback);
        return this;
    };
}).call(neo4j.dataLoader);

exports.neo4j = neo4j;