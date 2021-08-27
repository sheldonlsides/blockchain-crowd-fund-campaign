import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
  web3 = new Web3(provider);
  // console.log("No web3 instance injected, using Local web3.");
}

export default web3;
