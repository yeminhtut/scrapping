var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var webshot = require('webshot');

app.get('/',function(req,res){
    var webshot = require('webshot');
    // var mobile_options = {
    //   screenSize: {
    //     width: 320,
    //     height: 480
    //   }, 
    //   shotSize: {
    //     width: 320, 
    //     height: 736
    //   }, userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
    //     + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
    // };
    var options = {
      screenSize: {
        width: 768,
        height: 1024
      }, 
      shotSize: {
        width: 768, 
        height: 1024
      }, userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
        + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
    };

    // webshot('https://tripzilla.sg/', 'tripzilla_mobile.png',mobile_options, function(err) {
    //   // screenshot now saved to google.png
    // });
    webshot('https://tripzilla.sg/', 'tripzilla_tablet.png',options, function(err) {
      // screenshot now saved to google.png
    });
    webshot('https://tripzilla.sg/', 'tripzilla_web.png', function(err) {
      // screenshot now saved to google.png
    });
    res.send('done');
});

app.get('/scrape', function(req, res){
    
    url = 'http://magdev.tripzilla.com/';

    request(url, function(error, response, body){
        if(!error){
            // var checking = cheerio.load(html);
            var title, description, rating;
            var json = { title : "", description : "", rating : ""};

            var $ = cheerio.load(body);

            $('title').filter(function(){
                var data = $(this);
                title = data.text();
                json.title = title;
            });

            var meta = $('meta')
            var keys = Object.keys(meta)

            console.log(keys);

            var ogType;
            var ogTitle;

            keys.forEach(function(key){
            if (  meta[key].attribs
               && meta[key].attribs.property
               && meta[key].attribs.property === 'og:type') {
              ogType = meta[key].attribs.content;
            }
            });

            keys.forEach(function(key){
                if (  meta[key].attribs
                   && meta[key].attribs.property
                   && meta[key].attribs.property === 'og:title') {
                  ogTitle = meta[key].attribs.content;
                }
            });

            console.log(ogType);
            console.log(ogTitle);

            json.description = ogTitle;         
        }
        // fs.writeFile('output.html', checking, function(err){
        // console.log('File successfully written! - Check your project directory for the output.json file');
		// });
        res.send(json);
    });
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;