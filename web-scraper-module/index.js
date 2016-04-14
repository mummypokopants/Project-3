var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var dataCheck = require('./output.json');
console.log(dataCheck.length);

app.get('/scrape', function(req, res){

    var jsonArray = [];

<<<<<<< HEAD
    for (i=1;i<2;i++){ //<879
=======
    for (i=1;i<10;i++){ //<879
>>>>>>> 2bcc7e34abfe066883062f57a2a3095cae865637

      url = ('http://www.sgcarmart.com/news/carpark_index.php?TYP=carpark&LOC=all&ID='+i);
      console.log(url);

      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html);

              var name, address, monFribefore6pm, monFriafter6pm, saturday, sunPH;
<<<<<<< HEAD
              var json = { 'name' : "", 'address' : "", 'monFribefore6pmRates':"",'monFriafter6pmRates':"",'saturdayRates':"",'sunPHRates':""};
              // json['rates'] = {'monFribefore6pm':"",'monFriafter6pm':"",'saturday':"",'sunPH':""}
=======
              var json = { 'name' : "", 'address' : ""};
              json['rates'] = {'monFribefore6pm':"",'monFriafter6pm':"",'saturday':"",'sunPH':""}
>>>>>>> 2bcc7e34abfe066883062f57a2a3095cae865637

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

<<<<<<< HEAD
              var monFribefore6pm = $( "th:contains('MON-FRI Before 5/6 PM')" ).parent().children().eq(1).text().trim();
              json['monFribefore6pmRates'] = monFribefore6pm;

              var monFriafter6pm = $( "th:contains('MON-FRI After 5/6 PM')" ).parent().children().eq(1).text().trim();
              json['monFriafter6pmRates'] = monFriafter6pm;

              var saturday = $( "th:contains('SAT')" ).parent().children().eq(1).text().trim();
              json['saturdayRates'] = saturday;

              var sunPH = $( "th:contains('SUN / PUBLIC HOLIDAYS')" ).parent().children().eq(1).text().trim();
              json['sunPHRates'] = sunPH;

              // $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(0).children().eq(1).children().children().children().children().eq(0).filter(function(){
              //   var data = $(this);
              //   monFribefore6pm = data.text();
              //   console.log("Mon to Fri rate before 6pm is" + monFribefore6pm);
              //   json['rates']['monFribefore6pm'] = monFribefore6pm;
              // })
              //
              // $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(1).children().eq(1).children().children().children().children().eq(0).filter(function(){
              //   var data = $(this);
              //   monFriafter6pm = data.text();
              //   console.log(monFriafter6pm);
              //   json['rates']['monFriafter6pm'] = monFriafter6pm;
              // })
              //
              // $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(2).children().eq(1).children().children().children().children().eq(0).filter(function(){
              //   var data = $(this);
              //   saturday = data.text();
              //   console.log(saturday);
              //   json['rates']['saturday'] = saturday;
              // })
              //
              // $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(3).children().eq(1).children().children().children().children().eq(0).filter(function(){
              //   var data = $(this);
              //   sunPH = data.text();
              //   console.log(sunPH);
              //   json['rates']['sunPH'] = sunPH;
              // })
=======
              $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(0).children().eq(1).filter(function(){
                var data = $(this);
                monFribefore6pm = data.text().replace(/\s+/g, '');
                console.log("Mon to Fri rate before 6pm is" + monFribefore6pm);
                json['rates']['monFribefore6pm'] = monFribefore6pm;
              })

              $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(1).children().eq(1).filter(function(){
                var data = $(this);
                monFriafter6pm = data.text().replace(/\s+/g, '');
                console.log(monFriafter6pm);
                json['rates']['monFriafter6pm'] = monFriafter6pm;
              })

              $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(2).children().eq(1).filter(function(){
                var data = $(this);
                saturday = data.text().replace(/\s+/g, '');
                console.log(saturday);
                json['rates']['saturday'] = saturday;
              })

              $('.grayboxborder').eq(0).children().eq(0).children().eq(2).children().children().children().eq(3).children().eq(1).filter(function(){
                var data = $(this);
                sunPH = data.text().replace(/\s+/g, '');
                console.log(sunPH);
                json['rates']['sunPH'] = sunPH;
              })
>>>>>>> 2bcc7e34abfe066883062f57a2a3095cae865637

              setTimeout(function(){
              console.log(json);
              console.log("done with the run for i equal to" + i);
              jsonArray.push(json);},2000);

        }

      });

    }
<<<<<<< HEAD
    setTimeout(function(){
      console.log(jsonArray);
      fs.writeFile('output.json', JSON.stringify(jsonArray), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })},120000);
=======
    // setTimeout(function(){
    //   console.log(jsonArray);
    //   fs.writeFile('output.json', JSON.stringify(jsonArray), function(err){
    //   console.log('File successfully written! - Check your project directory for the output.json file');
    // })},20000);
>>>>>>> 2bcc7e34abfe066883062f57a2a3095cae865637

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
