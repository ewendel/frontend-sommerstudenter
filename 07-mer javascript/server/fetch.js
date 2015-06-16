var https = require('https');
var querystring = require('querystring');
var cheerio = require('cheerio');
var Q = require('q');
var NodeCache = require( "node-cache" );

var cache = new NodeCache( { stdTTL: 600, checkperiod: 120 } );
var req = /imgurl=(.*?)&/;

var getUrl = function(url) {
  var u = req.exec(url);
  if(u[1]) {
    return decodeURIComponent(decodeURIComponent(u[1]));
  } else {
    return url;
  }
};


var getImages = function(deferred, query) {
  var returnObj = {
    query: query
  };

  var queryParms = {
    site: "imghp",
    tbm:  "isch",
    q: query
  };

  var options = {
    hostname: "www.google.no",
    port: 443,
    path: "/search?" +  querystring.stringify(queryParms),
    method: "GET",
    headers: {
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36"
    }
  };

  var req = https.request(options, function(res) {

    var htmlStr = "";
    res.on('data', function(d) {
      htmlStr += d.toString('utf-8');
    });

    res.on("end", function() {
      var list = [];
      var $ = cheerio.load(htmlStr);
      $('a.rg_l').slice(0,20).each(function(index, element) {

        var $anchor = cheerio(element);
        var $img = $anchor.find("img");
        var meta = $anchor.next(".rg_meta").text();
        meta = JSON.parse(meta);

        list.push({
          url: getUrl($anchor.attr("href")),
          thumb: $img.attr("src"),
          description: meta.pt
        });
      });

      returnObj.images = list;
      cache.set(query, returnObj);
      deferred.resolve(returnObj);

    });
  });
  req.end();

  req.on('error', function(e) {
    deferred.reject(new Error(e));
  });

};

var fetchImage = function(query) {
  var deferred = Q.defer();

  cache.get(query, function(err, value){
    if(err) {
      deferred.reject(new Error(err));
    } else if(value[query]) {
      deferred.resolve(value[query]);
    } else {
      getImages(deferred, query);
    }

  });

  return deferred.promise;
};




exports.image = fetchImage;
