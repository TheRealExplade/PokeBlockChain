require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          evmVersion: "cancun"
        }
      },
      {
        version: "0.8.24",
        settings: {
          evmVersion: "cancun"
        }
      }
    ]
  }
};