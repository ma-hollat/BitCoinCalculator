const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res){
    let currency = req.body.currency;

    request(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`, function(error, response, body){
        console.log("Status message: ", response.statusMessage);
        console.log("Server Status Code: ", response.statusCode);

        console.log(response.body);

        let data = JSON.parse(response.body);
        let BitCoin = Number(req.body.BitCoin);
        let price;

        if(currency === "EUR") {
            price = data.bpi.EUR.rate;
            console.log("Price in EUR", price);
        }
        else{
            price = data.bpi.USD.rate;
            console.log("Price in USD", price);
        }

        price.toString();

        result = price*BitCoin;
        let diclaimer = data.diclaimer;

        res.write(`${diclaimer} </br>`);
        res.write(`You get from ${BitCoin} BitCoin - ${parseFloat(result)} ${currency}`);
        res.send();

    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});