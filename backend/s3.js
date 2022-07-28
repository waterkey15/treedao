require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const { tokenCounter, tokenURL } = require('./tokenTransfer');

bucketName=process.env.AWS_BUCKET_NAME
region=process.env.AWS_BUCKET_REGION
accessKeyId=process.env.AWS_ACCESS_KEY
secretAccessKey=process.env.AWS_SECRET_KEY


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

 function getFileStream (fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
    return  s3.getObject(downloadParams).createReadStream()
  }
  exports.getFileStream = getFileStream



  function createMetadataLink(id) {
    console.log("s3 stuff");

    //   var tokenName = parseInt(res);
    //   tokenName = tokenName;
    //   var tokenNameFinal = tokenName.toString();
     //  id = id * 100;
      var metaDataname = id.toString();
      var obj = {
        description: "Stanford Alumni DAO",
        external_url: "http://gsbdao.xyz:3333/metadatas/" + metaDataname + ".json",
        image: `https://stanford-nft.s3.us-west-1.amazonaws.com/treedao.png`,
        name: `Generation One Member #${metaDataname}`
      }
      console.log(obj);
  
      var buf = Buffer.from(JSON.stringify(obj));
      var data = {
          Bucket: bucketName,
          Body: buf,
          Key: `${id}.json`
      };
  
      s3.upload(data, function (err, data) {
        if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
        } else {
            console.log('succesfully uploaded!!!');
        }
      });
  }
  exports.createMetadataLink = createMetadataLink


const checkMint = (id) => {
  console.log(id);
    tokenCounter()
    .then((counter) => {
      setTimeout(() => {
        tokenURL(counter)
        .then((tokenURI) => {
          console.log(tokenURI)
          console.log(`http://gsbdao.xyz:3333/metadatas/${counter+1}.json`)
          if(tokenURI === `http://gsbdao.xyz:3333/metadatas/${counter+1}.json`){
            console.log("creating metadata link");
            createMetadataLink(id);
          }
          else{
            console.log("user decided not to mint!!!!!")
          }
	})
	.catch((err) => {
          console.log("not minted");
          console.log(err);
        })
      }, 90000);
    })
    .catch((err) => {
      console.log(err);
    })
} 
module.exports.checkMint = checkMint;






