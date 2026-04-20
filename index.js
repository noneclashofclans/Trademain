import axios from 'axios';
import DepthManager from './DepthManager.js';

const solInrMarket = new DepthManager("B-SOL_INR");

const usdtInrMarket = new DepthManager("B-USDT_INR");

const solusdtMarket = new DepthManager("B-SOL_USDT");

setInterval(() => {
    console.log(solInrMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());
    console.log(solusdtMarket .getRelevantDepth());

    // Sell SOL for INR, buy USDT from INR, buy SOL from INR.
    const canGetInr = solInrMarket.getRelevantDepth().lowesAsk - 0.001;
    const canGetUsdt = canGetInr /  usdtInrMarket.getRelevantDepth().lowesAsk;
    const canGetSol =  canGetUsdt / solusdtMarket.getRelevantDepth().lowesAsk;

    console.log(`You can convert ${1} SOL to ${canGetSol} SOL`);


    const intialInr = solInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = 1 * usdtInrMarket.getRelevantDepth().highestBid;
    const canGetInr2 = usdtInrMarket.getRelevantDepth().highestBid * canGetUsdt2;

    console.log(`You can convert ${intialInr} SOL to ${canGetInr2} INR`);

}, 3000); 

