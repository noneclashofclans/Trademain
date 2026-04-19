import axios from 'axios'

class DepthManager{

    constructor(market){
        this.market = market;
        this.bids = {};
        this.asks = {};

       setInterval(this.pollMarket, 3000);
    }


    pollMarket = async() => {
        const res = await fetch(`https://public.coindcx.com/market_data/orderbook?pair=${this.market}`);
        const depth = await res.json(); 
        this.bids = depth.bids;
        this.asks = depth.asks;
    }

    getRelevantDepth(){
        let highestBid = -100;
        let lowesAsk = 10000000;
    
        Object.keys(this.bids).map(x => {
            if (parseFloat(x) > highestBid){
                highestBid = parseFloat(x);
            }
        })
    
        Object.keys(this.asks).map(x => { 
            if (parseFloat(x) < lowesAsk){
                highestBid = parseFloat(x); 
            }
        })

        return {
            highestBid,
            lowesAsk
        }
    }
}

export default DepthManager;