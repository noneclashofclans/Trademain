const request = require('request');
const crypto = reuqire ('crypto');
import {key, scret} from './config';
const baseurl = "https://api.coindcx.com"

const timeStamp = Math.floor(Date.now());


export const createOrder = (side,  market, price, clientOrderId, quantity) => {
    const body = {
        "side": "buy",  //Toggle between 'buy' or 'sell'.
        "order_type": "limit_order", //Toggle between a 'market_order' or 'limit_order'.
        "market": "SNTBTC", //Replace 'SNTBTC' with your desired market.
        "price_per_unit": price, //This parameter is only required for a 'limit_order'
        "total_quantity": quantity, //Replace this with the quantity you want
        "timestamp": timeStamp,
        "client_order_id": clientOrderId //Replace this with the client order id you want
    }

    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    const options = {
        url: baseurl + "/exchange/v1/orders/create",
        headers: {
            'X-AUTH-APIKEY': key,
            'X-AUTH-SIGNATURE': signature
        },
        json: true,
        body: body
    }

    request.post(options, function(error, response, body) {
        if (error){
            console.log('Error while creating orders');
        }
        else{
            console.log(body);
        } 
    })

}

export const cancelAll = (market ) => {
    const   body = {
        market, 
        "timestamp": timeStamp
    }

    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    const options = {
        url: baseurl + "/exchange/v1/orders/cancel_all",
        headers: {
            'X-AUTH-APIKEY': key,
            'X-AUTH-SIGNATURE': signature
        },
        json: true,
        body: body
    }

    request.post(options, function(error, response, body) {
        if (error){
            console.log('Error while cancelling orders');
        }
        else{
            console.log(body);
        }
    })
}