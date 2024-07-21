
function isBuy(transaction, address){
    return transaction.from==address
}

function createTokenEntry(name, val, lastBuyTime) {
    const tokenInfo = 
        {name: name, numTrades : 0, count_transactions : 1, timeHeld : 0, holdingTimes : []};
    if (lastBuyTime === undefined) {
        tokenInfo["lastWasBuy"] = false;
        tokenInfo["lastBuyTradeTime"] = null;
        tokenInfo["lastBuy"] = 0;
        tokenInfo["totalBuy"] = 0;
        tokenInfo["totalSell"] = val;
    } else {
        tokenInfo["lastWasBuy"] = true;
        tokenInfo["lastBuyTradeTime"] = lastBuyTime;
        tokenInfo["lastBuy"] = val;
        tokenInfo["totalBuy"] = val;
        tokenInfo["totalSell"] = 0;
    }
    return tokenInfo;
}
function UpdateTokenInfo(transInfo,tokenInfo,address){
    const val = getValueAtTime(transInfo.timeStamp,transInfo.value);
    const info = tokenInfo.find(info=>info.tokenName == transInfo.tokenName)
    if(info){
        info.count_transactions++;
        if(info.lastWasBuy){
            if(!isBuy(address,transInfo)){
                info.totalSell += val;
                info.lastWasBuy = false;
                info.timeHeld += transInfo.timeStamp;
                info.numTrades ++;
            } else{
                info.lastBuyTradeTime = transInfo.timeStamp;
                info.lastBuy = val;
                info.totalBuy += val;
            }
        } else {
            if(!isBuy(address,transInfo)){
                info.totalSell += val;
                insertInOder(info.holdingTimes, info.timeHeld);
                info.timeHeld = 0; // reset
                info.timeHeld += transInfo.timeStamp;
            } else {
                info.lastWasBuy = true;
                info.lastBuyTradeTime = transInfo.timeStamp;
                info.lastBuy = val;
                info.totalBuy += val;
            }
        }
    } else{
        if(isBuy(address, transInfo)) {
            createToken(transInfo.tokenName, val, transInfo.timeStamp);
        } else {
            createTokenEntry(transInfo.tokenName, val);
        }
    }
}   
    
function processTransactionList(transList, tokenInfo, address) {
    for (const transaction of transList) {
        UpdateTokenInfo(transaction, tokenInfo,address);
    }
}
function extractStats(tokenInfo) {
    var average = 0;
    var overAllBuys = 0;
    
    const pnl = [];
    var overallPnl = 0;
    
    average = Object.keys(tokenInfo).length;
    
    for (const info of tokenInfo) {
        //median time held
        average += info.holdingTimes[ Math.floor(info.numTrades / 2)];
        
        pnl.push({name: info.name, pnlAbs: info.totalSell-info.totalBuy, pnlRatio: info.totalSell/info.totalBuy})
        //weighted pnl
        overallPnl = (info.totalSell-info.totalBuy) * (info.totalSell/info.totalBuy);
        
        overAllBuys += info.totalBuys;
    }
    average = average / Object.keys(tokenInfo).length;
    
    overallPnl = overallPnl/overAllBuys
    const stats = {avgHoldingTime: average, pnl: overallPnl,tokenPerformance: pnl}
    return stats
}
    

// Output: User found: { name: 'Bob', age: 25, city: 'San Francisco' }

//}
