import fetch from 'node-fetch';

const MoonbaseKey = 'T4TZ4R331WUR4KPIF5TQHRR6T8TIDMI6K3'

export async function getTransactionsByWalletAddress(address){
    const res = await fetch(`https://api-moonbeam.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=${MoonbaseKey}`)
    const data = await res.json();
    if(data.message==`No transactions found`) return {};
    if(data.status!='1'){throw new Error(`HTTP Error! Status: ${res.status}`)}
    return data.result
}
export async function getTokenTransferEventsByAddress(address){
   const res = await fetch(`https://api-moonbeam.moonscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=10&startblock=0&endblock=latest&sort=asc&apikey=${MoonbaseKey}`)
   const data = await res.json();
   if(data.status!='1'){throw new Error(`HTTP Error! Status: ${res.status}`)}
   return data.result
}
export async function getTokenTransferEventsByAddressAndContractAddress(address,contractAddress){
    const res = await fetch(`https://api-moonbeam.moonscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=10&startblock=0&endblock=latest&sort=asc&apikey=${MoonbaseKey}`)
    const data = await res.json();
    if(data.status!='1'){throw new Error(`HTTP Error! Status: ${res.status}`)}
    return data.result
}
export async function getValueAtTime(time,val){
    const res = await fetch(/moonbeam/cush/tokenUsdPriceAtTime)
}


const wGLMRTokenContract = '0xAcc15dC74880C9944775448304B263D191c6077F';
//console.log(await getTransactionsByWalletAddress('0xe1Fa699860444Be91D366C21DE8FeF56E3dEC77A'))
//console.log(await getTokenTransferEventsByAddressAndContractAddress(`0xd27cece5ce8b4f6fa47a160105d842f97aee227d`,'0xAcc15dC74880C9944775448304B263D191c6077F'))



const axios = require('axios');

// Replace with your CoinMarketCap API key
const apiKey = 'YOUR_COINMARKETCAP_API_KEY';

// Convert Unix timestamp to CoinMarketCap's date format (ISO 8601)
function unixToISODate(unixTimestamp) {
    return new Date(unixTimestamp * 1000).toISOString();
}

export async function getGLMRPriceAtTimestamp(unixTimestamp) {
    const date = unixToISODate(unixTimestamp);
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical';
    const parameters = {
        symbol: 'GLMR',
        time_start: date,
        time_end: date,
        interval: 'hourly', // Adjust the interval as needed
        convert: 'USD'
    };
    const headers = {
        'X-CMC_PRO_API_KEY': apiKey
    };

    try {
        const response = await axios.get(url, {
            params: parameters,
            headers: headers
        });
        const data = response.data;
        const price = data.data.GLMR[0].quote.USD.price;
        console.log(`The price of GLMR at Unix timestamp ${unixTimestamp} was $${price} USD.`);
    } catch (error) {
        console.error('Error fetching the price:', error);
    }
}

// Example Unix timestamp (January 1, 2022, 00:00:00 UTC)
const unixTimestamp = 1640995200;
getGLMRPriceAtTimestamp(unixTimestamp);
