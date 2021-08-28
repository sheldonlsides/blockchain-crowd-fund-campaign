# Blockchain CrowdFund Campaign App

#### Project In Development

Demo application using the Ethereum Blockchain to create a crowdfunding application

## Project Overview

This example project allows you to create a crowdfunded request using the Ethererum blockchain. It allows you to contribute to a particular campaign by sending ethereum to the campaign. Once you contrinute to the campaign you become an approver and allows you to vote on the funding request. In order for the campaign funds (ethereum) to be released more than 50% of the contributors must approve of the funding request before it can be finalized. Once the campaign funding request is approved by enough parties on the Ethereum blockchain the funds (ethereum) is sent to proper receipt ethereum address.

All request, approvals and payment finalization is managed and tracked completely on the Ethereum blockchain via a Ethereum Solidity Smart Contract.

## Project technology stack

This project uses a Truffle project as it's framework. If you aren't familiar with Truffle you can get an overview here https://www.trufflesuite.com/truffle

There are two key components to this project, which are the smart contract project and web application client.

#### Smart Contract

The test and code for the smart contract project are in the following folders:

- **contracts**
- **migrations** - specific to the Truffle Suite to deploy the Ethereum smart contract to the blockchain
- **test** - contains the test for testing the smart contract

#### Web App

The web app is developed using Next.js (React Framework) https://nextjs.org/

The web application for the project can be found in the **_client/src_** folder
