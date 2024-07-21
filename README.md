# easyapolkadothacakthon2024

https://docs.google.com/document/d/1gQJI4iW81HoaGtsQupa-LyThuUfqvHixZkkzUaOAvco/edit


function getValueAtTime(timeStamp, val) {
    
}

function createToken(name, val, lastBuyTime) {
    const tokenInfo = 
        {name: name, numTrades : 0, count_transactions : 1, timeHeld : 0, holdingTimes : []}
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
}
function UpdateTokenInfo(transInfo, tokenInfo,address) {
    const val = getValueAtTime(transInfo.timeStamp, transInfo.value);
    
    const info = tokenInfo.find(info => info.tokenName === transInfo.tokenName);
    if (info) {
        info.count_transactions++;
        if (info.lastWasBuy) {
            if (!isBuy(address, transInfo)){
                info.totalSell += val;
                info.lastWasBuy = false;
                info.timeHeld += transInfo.timeStamp;
                info.numTrades ++;
            } else {
                info.lastBuyTradeTime = transInfo.timeStamp;
                info.lastBuy = val;
                info.totalBuy += val;
            }
        } else {
            if (!isBuy(address, transInfo)){
                info.totalSell += val;
                info.holdingTimes.push(info.timeHeld);
                info.timeHeld = 0; // reset
                info.timeHeld += transInfo.timeStamp;
            } else {
                info.lastWasBuy = true;
                info.lastBuyTradeTime = transInfo.timeStamp;
                info.lastBuy = val;
                info.totalBuy += val;
        }
    } else {
        if (isBuy(address, transInfo)) {
            createToken(transInfo.tokenName, val, transInfo.timeStamp);
        } else {
            createToken(transInfo.tokenName, val);
        }
    }
    
function processTransactionList(transList, tokenInfo, address) {
    for (const transaction of transList) {
        UpdateTokenInfo(transaction, tokenInfo,address);
    }
}
