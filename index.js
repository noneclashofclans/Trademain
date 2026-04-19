import axios from 'axios';
import DepthManager from './DepthManager.js';

const solInrMarket = new DepthManager("B-SOL_INR");

const usdtInrMarket = new DepthManager("B-USDT_INR");

const solusdtMarket = new DepthManager("B-SOL_USDT");

setInterval(() => {
    console.log(solInrMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());
    console.log(solusdtMarket .getRelevantDepth());
}, 3000); 