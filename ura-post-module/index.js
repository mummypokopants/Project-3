var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    // var jsonArray = [];
    var jsonobject = {};
    var carRows = 0;
    console.log("carRows at start "+carRows);
    // for (i=1;i<879;i++){ //<879

      url = ('https://spring.ura.gov.sg/lad/ecas/motorist/pp_info/ppInfoDisplay.cfm');
      console.log(url);

      request.post(url,{form:{select_pp_name:'A0004'}}, function(error, response, html){
          if(!error){
            var $ = cheerio.load(html);
            var name;
            // creates {"name":"ANG MO KIO STREET 63 (A0048)"}
            $('.cmxform').eq(0).children().eq(0).filter(function(){
              var data = $(this);
              name = data.text().substring(15);
              jsonobject['name']= name;
            })

            // creates {"name":"ANG MO KIO STREET 63 (A0048)", "rates":{.....}}
            jsonobject['rates'] = {"Car":{"Mon-Fri":{},"Saturday":{},"Sunday + PH":{}},"Motorcycle":{"Mon-Fri":{},"Saturday":{},"Sunday + PH":{}}}
            //check if there is a Car section... this is the selector
            if(($( "td:contains('Car')" ).eq(2).parent().parent().children().eq(0).text().replace(/\s+/g, ''))==="Car" ){
              carRows +=1;
              console.log("carRows when car row is found "+carRows);
            //looping through the rows under the Car section, up to 4 time chunks (have not seen more than 3 different times)
              for(i=1;i<5;i++){
                if(($( "td:contains('Car')" ).eq(2).parent().parent().children().eq(i).children().text())!==""){
                  console.log("car for loop running, i equal to "+i);
                  carRows +=1;
                  console.log("carRows as each row is found "+carRows);
                  var keyData;
                  var monToFriData;
                  var satData;
                  var sunPHData;
                  $( "td:contains('Car')" ).eq(2).parent().parent().children().eq(i).children().eq(0).filter(function(){
                    var rowData1       = $(this);
                    //selecting the first column - basically the time, and making it the key
                    keyData       = rowData1.text().replace(/\s+/g, '');
                    console.log("keyData is "+ keyData);
                    })
                  $( "td:contains('Car')" ).eq(2).parent().parent().children().eq(i).children().eq(1).filter(function(){
                    var rowData2       = $(this);
                    //selecting the 2nd, 3rd, 4th columns - the rates for this time on Mon-Fri, Sat and Sun+PH
                    monToFriData  = rowData2.text().replace(/\s+/g, '');
                    console.log("monToFriData is "+ monToFriData);
                    })
                  $( "td:contains('Car')" ).eq(2).parent().parent().children().eq(i).children().eq(2).filter(function(){
                    var rowData3       = $(this);
                    //selecting the 2nd, 3rd, 4th columns - the rates for this time on Mon-Fri, Sat and Sun+PH
                    satData       = rowData3.text().replace(/\s+/g, '');
                    console.log("satData is "+ satData);
                    })
                  $( "td:contains('Car')" ).eq(2).parent().parent().children().eq(i).children().eq(3).filter(function(){
                    var rowData4       = $(this);
                    //selecting the 2nd, 3rd, 4th columns - the rates for this time on Mon-Fri, Sat and Sun+PH
                    sunPHData     = rowData4.text().replace(/\s+/g, '');
                    console.log("sunPHData is "+ sunPHData);
                    })
                    //tagging the key value pairs on
                    jsonobject['rates']['Car']["Mon-Fri"][keyData]= monToFriData;
                    jsonobject['rates']['Car']["Saturday"][keyData]= satData;
                    jsonobject['rates']['Car']["Sunday + PH"][keyData]= sunPHData;
                    console.log("end of loop for i equal to " +i);
                }
              else if(($( "td:contains('Car')" ).eq(2).parent().parent().children().eq(i).children().text())===""){break;};
              }
            }



            //check if there is a Motorcycle section... this is the selector
            console.log("moving on to motorcycles and carRows is "+carRows);
            if(($( "td:contains('Motorcycle')" ).eq(1).parent().parent().children().eq(carRows+1).text().replace(/\s+/g, ''))==="Motorcycle" ){
            //looping through the rows under the Motorcycle section, up to 4 time chunks (have not seen more than 3 different times)
              for(i=1;i<5;i++){
                if(($( "td:contains('Motorcycle')" ).eq(1).parent().parent().children().eq(carRows+1+i).children().text())!==""){
                  console.log("motorcycle for loop running, i equal to "+i);
                  var keyData;
                  var monToFriData;
                  var satData;
                  var sunPHData;
                  $( "td:contains('Motorcycle')" ).eq(1).parent().parent().children().eq(carRows+1+i).children().eq(0).filter(function(){
                    var rowData1       = $(this);
                    //selecting the first column - basically the time, and making it the key
                    keyData       = rowData1.text().replace(/\s+/g, '');
                    console.log("keyData is "+ keyData);
                    })
                  $( "td:contains('Motorcycle')" ).eq(1).parent().parent().children().eq(carRows+1+i).children().eq(1).filter(function(){
                    var rowData2       = $(this);
                    //selecting the 2nd, 3rd, 4th columns - the rates for this time on Mon-Fri, Sat and Sun+PH
                    monToFriData  = rowData2.text().replace(/\s+/g, '');
                    console.log("monToFriData is "+ monToFriData);
                    })
                  $( "td:contains('Motorcycle')" ).eq(1).parent().parent().children().eq(carRows+1+i).children().eq(2).filter(function(){
                    var rowData3       = $(this);
                    //selecting the 2nd, 3rd, 4th columns - the rates for this time on Mon-Fri, Sat and Sun+PH
                    satData       = rowData3.text().replace(/\s+/g, '');
                    console.log("satData is "+ satData);
                    })
                  $( "td:contains('Motorcycle')" ).eq(1).parent().parent().children().eq(carRows+1+i).children().eq(3).filter(function(){
                    var rowData4       = $(this);
                    //selecting the 2nd, 3rd, 4th columns - the rates for this time on Mon-Fri, Sat and Sun+PH
                    sunPHData     = rowData4.text().replace(/\s+/g, '');
                    console.log("sunPHData is "+ sunPHData);
                    })
                    //tagging the key value pairs on
                    jsonobject['rates']['Motorcycle']["Mon-Fri"][keyData]= monToFriData;
                    jsonobject['rates']['Motorcycle']["Saturday"][keyData]= satData;
                    jsonobject['rates']['Motorcycle']["Sunday + PH"][keyData]= sunPHData;
                    console.log("end of loop for i equal to " +i);
                }
              else if(($( "td:contains('Motorcycle')" ).eq(1).parent().parent().children().eq(carRows+1+i).children().text())!==""){break};
              }
            }

        }

      });

    // } //the closing for the "for" loop in row 11
    setTimeout(function(){
      console.log(jsonobject);
      fs.writeFile('output.json', JSON.stringify(jsonobject), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })},5000);

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
