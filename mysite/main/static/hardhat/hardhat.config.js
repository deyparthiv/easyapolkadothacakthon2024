require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition-ethers');
const privateKey = '0dd43f4b28dcdd0d95c11221f829dc356cde9eac52d23e02da0862a85ed5dfb9';
module.exports = {
  solidity: "0.8.24",
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287,
      accounts: [privateKey],
    },
  }
    
};
