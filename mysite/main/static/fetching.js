import fetch from 'node-fetch';
const MoonbaseKey = 'T4TZ4R331WUR4KPIF5TQHRR6T8TIDMI6K3'
const wGLMRTokenContract = '0xAcc15dC74880C9944775448304B263D191c6077F'
export async function getTransactionsByWalletAddress(address){
    //console.log(`https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=${MoonbaseKey}`)
    //const res = fetch(`https://api-moonbase.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=${MoonbaseKey}`)
    // if (!res.ok) {
    //     throw new Error(`HTTP error! Status: ${res}`);
    // }
    // var result='invalid';
    // res.then((response)=>{const jsonPromise = response.json();
    //     jsonPromise.then((data)=>{console.log(data)});
    // })
    const res = await fetch(`https://api-moonbeam.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=3&sort=asc&apikey=${MoonbaseKey}`)
    const data = await res.json();
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