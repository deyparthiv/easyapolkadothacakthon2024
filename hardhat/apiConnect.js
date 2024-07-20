import fetch from 'node-fetch';

const MoonbaseKey = 'T4TZ4R331WUR4KPIF5TQHRR6T8TIDMI6K3'

"https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=0x1038F9E41836b3E8BBD3416fbdbE9836F1EA83C5&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=".concat(MoonbaseKey);

async function getTransactionsByWalletAddress(address){
    //console.log(`https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=${MoonbaseKey}`)
    //const res = fetch(`https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=${MoonbaseKey}`)
    // if (!res.ok) {
    //     throw new Error(`HTTP error! Status: ${res}`);
    // }
    // var result='invalid';
    // res.then((response)=>{const jsonPromise = response.json();
    //     jsonPromise.then((data)=>{console.log(data)});
    // })
    const res = await fetch(`https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=${MoonbaseKey}`)
    const data = await res.json();
    if(data.status!='1'){throw new Error(`HTTP Error! Status: ${res.status}`)}
    return data.result
}

async function getTokenTransferEventsByAddress(address,contractAddress){ //NOT TESTED!!!
    const res = await fetch(`https://api-moonbase.moonscan.io/api
   ?module=account
   &action=tokentx
   &contractaddress=${contractAddress}
   &address=${address}
   &page=1
   &offset=100
   &startblock=0
   &endblock=99999999
   &sort=asc
   &apikey=${MoonbaseKey}`)
   const data = await res.json();
   if(data.status!='1'){throw new Error(`HTTP Error! Status: ${res.status}`)}
   return data.result
}

console.log(await getTransactionsByWalletAddress('0xa620f8357B449928965D34EC67249251f14d8E77'))