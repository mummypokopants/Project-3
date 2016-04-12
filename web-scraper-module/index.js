var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    var jsonArray = [];

    for (i=1;i<879;i++){ //<879

      url = ('http://www.sgcarmart.com/news/carpark_index.php?TYP=carpark&LOC=all&ID='+i);
      console.log(url);

      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html);

              var name, address;
              var json = { name : "", address : ""};

              $('.grayboxborder').eq(0).children().eq(0).children().eq(0).filter(function(){
                  var data = $(this);
                  name = data.text();
                  json.name = name;
              })

              $('.grayboxborder').eq(0).children().eq(0).children().eq(1).filter(function(){
                  var data = $(this);
                  address = data.text();
                  json.address = address;
              })
              setTimeout(function(){
              console.log(json);
              jsonArray.push(json);},2000);

        }

      });

    }
    setTimeout(function(){
      console.log(jsonArray);
      fs.writeFile('output.json', JSON.stringify(jsonArray), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })},20000);

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
