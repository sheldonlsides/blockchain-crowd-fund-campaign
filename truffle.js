const path = require("path");
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = process.env.MNEMONIC;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    test: {
      host: "127.0.01",
      port: 7545,
      network_id: "5777",
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        );
      },
      network_id: 4,
    },
  },
  mocha: {
    useColors: true,
  },
  compilers: {
    solc: {
      version: "^0.8.1",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200, // Default: 200
        },
      },
    },
  },
};
