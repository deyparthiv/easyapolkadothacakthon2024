import { Web3 } from 'web3';

// Create Web3 instance
const web3 = new Web3('https://rpc.api.moonbase.moonbeam.network');

const addressFrom = '0x4ef28F8f6eb3a97F3E17B53Edb0934CF8beC33ec';
const addressTo = '0x0F42F881cc0174cDBa2492b931328F787088D1D4';

const balances = async() => {
    const balanceFrom = web3.utils.fromWei(
        await web3.eth.getBalance(addressFrom),
        'ether'
    );
    const balanceTo = web3.utils.fromWei(
        await web3.eth.getBalance(addressTo),
        'ether'  
    );

    console.log(`The balance of ${addressFrom} is: ${balanceFrom} DEV`);
    console.log(`The balance of ${addressTo} is: ${balanceTo} DEV`);
}

balances();

