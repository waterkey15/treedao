import Web3 from 'web3'
import axios from "../axios/axios";

const TNFTABI = require("../contract/GSBDAO.json");
const TNFTAddress = "0xEDF513b726a08d8dFD5870F4D345194600b24BDC" //rinkeby

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
var TNFT = new web3.eth.Contract(TNFTABI, TNFTAddress);


export const mintNFT = (walletAddress, coupon) => {
    return new Promise ((resolve, reject) => {
        validateMint().then((result) => {
            console.log(result);
            var jsonName = parseInt(result.data.totalToken);
            var metadataName = jsonName + 1;
            console.log(jsonName)

            jsonName = jsonName + 1;
            console.log(jsonName)

            jsonName = jsonName.toString();
            console.log(jsonName)

            jsonName = jsonName + ".json"
            console.log(jsonName)

            getPrice(coupon).then((priceJson) => {
                console.log(priceJson)
                var price = priceJson.price;
                TNFT.methods.create(jsonName, walletAddress, result.data.message, result.data.signature)
                .send({from: walletAddress, value: web3.utils.toWei(`${price}`, "ether")}) //
                .on("receipt", function(receipt) {
                    createMetadata(metadataName).then((res) =>{
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    console.log(receipt)
                    resolve(receipt)
                })
                .on("error", function(error) {
                    console.log(error);
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    })
}



const validateMint = () => {
    return new Promise ((resolve, reject) => {
        var config = {
            method: 'get',
            url: '/validate',
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
              resolve(response)
          })
          .catch(function (error) {
              reject(error)
          });
    })  
}

// const getPrice = (coupon) => {
//     return new Promise((resolve, reject) => {
//         var config = {
//             method: 'get',
//             url: '/price/' + coupon,
//             headers: { }
//           };
          
//           axios(config)
//           .then(function (response) {
//             resolve(response.data.price);
//           })
//           .catch(function (error) {
//             reject(error);
//           });
          
//     })
// }

const createMetadata = (metadataName) => {
    return new Promise ((resolve, reject) => {

        var data = JSON.stringify({
            "id": metadataName,
            "fileId":metadataName,
        });
        
        var config = {
            method: 'post',
            url: '/createMetadata',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    })

}

const getPrice = (code) => {
    return new Promise ((resolve, reject) => {
        var config = {
            method: 'get',
            url: `/getPrice/${code}`,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            resolve(response.data)
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
    })
}


// const backendCheckForMint = (id) => {
//     var config = {
//         method: 'get',
//         url: '/checkMint/' + id,
//         headers: { }
//       };
      
//       axios(config)
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.log(error)
//       });
// }

// const getTokenID = () => {
//     return new Promise ((resolve, reject) => {
//         var config = {
//             method: 'get',
//             url: '/getTokenCounter',
//             headers: { },

//         };      
//         axios(config)
//         .then(function (response) {
//             console.log(JSON.stringify(response.data));
//             resolve(response.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//             reject(error);
//         });
//     })
// }

// const sendMetadataName = (name) => {

//     var data = '';
//     var config = {
//         method: 'get',
//         url: '/sendMetadataName/' + name,
//         headers: { },
//         data : data
//     };

//     axios(config)
//     .then(function (response) {
//     console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//     console.log(error);
//     });

// }