var express = require('express');
var cors = require('cors')

var  freeForexAPI  =  require('freeforexapi');

let Free_1_1 = 0;
let Free_1_2 = 0;
let Free_1_3 = 0;
let Free_1_4 = 0;
let Free_1_5 = 0;

let Free_2_1 = 0;
let Free_2_2 = 0;
let Free_2_3 = 0;
let Free_2_4 = 0;
let Free_2_5 = 0;

let Free_3_1 = 0;
let Free_3_2 = 0;
let Free_3_3 = 0;
let Free_3_4 = 0;
let Free_3_5 = 0;

let Free_4_1 = 0;
let Free_4_2 = 0;
let Free_4_3 = 0;
let Free_4_4 = 0;
let Free_4_5 = 0;

let Free_5_1 = 0;
let Free_5_2 = 0;
let Free_5_3 = 0;
let Free_5_4 = 0;
let Free_5_5 = 0;

const Binance = require('binance-api-node').default
const Binance_client = Binance()
let B_Btc = 0;
let B_Eth = 0;
let B_Dash = 0;

setInterval(async() => {
    freeForexAPI.getQuotes(['USDEUR', 'USDCAD', 'EURUSD', 'USDINR', 'USDAED', 'USDPKR'], res => {
        
        Free_5_1 = res['USDPKR']['rate']
        Free_5_2 = (1 / res['USDEUR']['rate']) * res['USDPKR']['rate']
        Free_5_3 = (1 / res['USDCAD']['rate']) * res['USDPKR']['rate']
        Free_5_4 = (1 / res['USDAED']['rate']) * res['USDPKR']['rate']
        Free_5_5 = (1 / res['USDINR']['rate']) * res['USDPKR']['rate']

        Free_4_1 = res['USDINR']['rate']
        Free_4_2 = (1 / res['USDEUR']['rate']) * res['USDINR']['rate']
        Free_4_3 = (1 / res['USDCAD']['rate']) * res['USDINR']['rate']
        Free_4_4 = (1 / res['USDAED']['rate']) * res['USDINR']['rate']
        Free_4_5 = (1 / res['USDPKR']['rate']) * res['USDINR']['rate']

        Free_3_1 = res['USDAED']['rate']
        Free_3_2 = (1 / res['USDEUR']['rate']) * res['USDAED']['rate']
        Free_3_3 = (1 / res['USDCAD']['rate']) * res['USDAED']['rate']
        Free_3_4 = (1 / res['USDINR']['rate']) * res['USDAED']['rate']
        Free_3_5 = (1 / res['USDPKR']['rate']) * res['USDAED']['rate']
        
        Free_2_1 = res['USDEUR']['rate']
        Free_2_2 = (1 / res['USDCAD']['rate']) * res['USDEUR']['rate']
        Free_2_3 = (1 / res['USDAED']['rate']) * res['USDEUR']['rate']
        Free_2_4 = (1 / res['USDINR']['rate']) * res['USDEUR']['rate']
        Free_2_5 = (1 / res['USDPKR']['rate']) * res['USDEUR']['rate']

        Free_1_1 = res['USDCAD']['rate']
        Free_1_2 = res['USDCAD']['rate'] * res['EURUSD']['rate']
        Free_1_3 = (1 / res['USDAED']['rate']) * res['USDCAD']['rate']
        Free_1_4 = (1 / res['USDINR']['rate']) * res['USDCAD']['rate']
        Free_1_5 = (1 / res['USDPKR']['rate']) * res['USDCAD']['rate']
    })
    const prices = await Binance_client.prices()
    Object.keys(prices).forEach(function(key) {
        if (key === 'BTCUSDT') {
            B_Btc = Number(prices[key])
        }
        if (key === 'ETHUSDT') {
            B_Eth = Number(prices[key])
        }
        if (key === 'DASHUSDT') {
            B_Dash = Number(prices[key])
        }
    });
}, 2000)

var app = express();

app.use(cors())

app.get('/getbuy', function(req, res) {
    let vaules = [B_Btc, B_Eth, B_Dash]
    res.send({
        success: 1,
        prices: vaules
    })
});

app.get('/getsell', function(req, res) {
    let vaules = [B_Btc, B_Eth, B_Dash]
    res.send({
        success: 1,
        prices: vaules
    })
});

app.get('/getconversion5', function(req, res) {
    res.send({
        success: 1,
        price1: Free_5_1,
        price2: Free_5_2,
        price3: Free_5_3,
        price4: Free_5_4,
        price5: Free_5_5
    })
})


app.get('/getconversion4', function(req, res) {
    res.send({
        success: 1,
        price1: Free_4_1,
        price2: Free_4_2,
        price3: Free_4_3,
        price4: Free_4_4,
        price5: Free_4_5
    })
})

app.get('/getconversion3', function(req, res) {
    res.send({
        success: 1,
        price1: Free_3_1,
        price2: Free_3_2,
        price3: Free_3_3,
        price4: Free_3_4,
        price5: Free_3_5
    })
})

app.get('/getconversion2', function(req, res) {
    res.send({
        success: 1,
        price1: Free_2_1,
        price2: Free_2_2,
        price3: Free_2_3,
        price4: Free_2_4,
        price5: Free_2_5
    })
})

app.get('/getconversion1', function(req, res) {
    res.send({
        success: 1,
        price1: Free_1_1,
        price2: Free_1_2,
        price3: Free_1_3,
        price4: Free_1_4,
        price5: Free_1_5
    })
});

app.listen(3001, function() {
    console.log('listening');
});