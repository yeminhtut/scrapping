var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    
    url = 'http://travelogy.com/';

    request(url, function(error, response, html){
        if(!error){
            var checking = cheerio.load(html);
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            checking('title').filter(function(){
                var data = checking(this);
                console.log(data);
                title = data.text();
                json.title = title;
            })
            console.log(json.title);            
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