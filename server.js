var httpModule = require('http')
var urlModule = require('url')
var fs = require('fs')
var requestModule = require('request')

var server = httpModule.createServer(processRequest)
//server.listen(80)

var staticFiles = ["/index.html"]

var Client = require('node-rest-client').Client;
var client = new Client();

funkcja()

function funkcja() {
    var args = {
        data: { apiKey: "ox903986698258911851509577375768",
                country: "GB",
                currency: "GBP",
                locale: "en-GB",
                originplace: "EDI",
                destinationplace: "LHR",
                outbounddate: "2016-11-26", },
        headers: { "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json" }
    };

    client.post("http://partners.api.skyscanner.net/apiservices/pricing/v1.0", args, function (data, response) {
        // parsed response body as js object
        //console.log(data);
        // raw response
        console.log(response);
    });
}

function processRequest(request, response) {
    var res = new Object()
    var reqUrl = urlModule.parse(request.url, true)
    if (reqUrl.pathname == "/api/test") {
        res.response = funkcja()
    } else {
        res.code = 1
        res.error = "No such endpoint"
    }
    response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    response.write(JSON.stringify(res))
    response.end()
}

function arrayDeepCopy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? arrayDeepCopy(v) : v;
   }
   return output;
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
