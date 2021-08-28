import web3 from "./web3";
import CampaignFactory from "../../contracts/CampaignFactory.json";

//0x9274F6cF4013d0ce539A581DF072D78b957a8c04 - local

//0x307A7Ab3ba1c517756aD2b3d04B6599Eae257876 - rinkeby
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  //You will place your smart contract address here
  "0x307A7Ab3ba1c517756aD2b3d04B6599Eae257876"
);

export default instance;
