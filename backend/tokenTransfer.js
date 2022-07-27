var express = require('express');
var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');




const SmartContractABI = require('./GSBDAO.json')
const SmartContractAddress = "0x79a7E2E38b13047D5BA130E5b887aD5D61E50Ee6" //rinkeby
const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');



var privatekey = ""; // priv key for admin wallet
var rpcurl = ""; //eth rpc url


const validateTransaction = async () => {
    return new Promise(async (resolve, reject) => {
      var provider = new Provider(privatekey, rpcurl);
      var web3 = new Web3(provider);
      const msg = "" + Math.random();
      const sig = await web3.eth.accounts.sign(msg, privatekey);  
      console.log(sig.messageHash);
      console.log(sig.signature);
      tokenCounter().then((totalToken) => {
        resolve({message: sig.messageHash, signature: sig.signature, totalToken: totalToken});
      })
    })
}

const tokenCounter = () => {
  return new Promise((resolve, reject) => {

    var provider = new Provider(privatekey, rpcurl);
    var web3 = new Web3(provider);
    var TNFT = new web3.eth.Contract(SmartContractABI, SmartContractAddress);

    TNFT.methods.tokenCounter().call(function (err, res) {
        if (err) {
            console.log("An error occured", err)
            reject(err);
          }
          console.log("The balance is: ", res)
          resolve(res);
      })
    })
}



  module.exports={validateTransaction, tokenCounter}
