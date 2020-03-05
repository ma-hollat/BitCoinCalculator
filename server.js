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
            price = data.bpi.EUR.rate_float;
            console.log("Price in EUR", price);
        }
        else{
            price = data.bpi.USD.rate_float;
            console.log("Price in USD", price);
        }

        //price.toString();
        result = parseFloat(price) * parseFloat(BitCoin);
        let disclaimer = data.disclaimer;

        res.write(`${disclaimer}` );
        res.write(` You get from ${BitCoin} BitCoin - ${parseFloat(result)} ${currency}`);
        res.send();

    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started.");
});
