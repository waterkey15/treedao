const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { getFileStream, createMetadataLink, checkMint } = require('./s3');
const { validateTransaction, tokenCounter } = require('./tokenTransfer');

const {getPriceFromCoupons, createCoupons} = require('./database');


const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());



app.get('/video/:key', (req, res) => {
    const key = req.params.key
  
    const readStream = getFileStream(key);

    console.log(readStream.body)
    res.set("Content-Type", "video/mp4");

    readStream.pipe(res)

  })
  
  app.get('/validate', (req, res) => {
        
    validateTransaction().then((result) => {
            console.log(tokenCounter);
            res.send(result);
    })
        .catch((err) => {
                console.log(err);
        })

  })
  app.get('/getPrice/:code', (req, res) => {
    console.log(req.params.code);
    getPriceFromCoupons(req.params.code).then((price) => {
            console.log(price);
            res.send(price)
    })
    .catch((err) => {
            res.send(err)
    })
})


app.get('/price/:coupon', (req, res)=> {
if(req.params.coupon === 'genesis50pass'){
  res.send({price: 0.5});
}else{
if(req.params.coupon === 'mintforzeroether35'){
            res.send({price: 0});
    }else{
              res.send({price: 5});
    }
}
})


app.post('/createMetadata', (req, res) => {
console.log(req.body.id);
createMetadataLink(req.body.id)
res.send(true);
})

app.get('/metadatas/:key', (req, res) => {

    
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)

  
  })

  app.get('/checkMint/:id', (req, res) => {
    const key = req.params.id
    checkMint(key);
    res.send(true);
  })


  app.get('/getTokenCounter', (req, res) => {
    tokenCounter().then((result) => {
      console.log(typeof result);
      var resultInt = parseInt(result);
      var tokenID = resultInt + 1;
      res.send({tokenID: tokenID})
    })
    .catch((err) => {
      res.send(err);
    })
  })

  app.get('/sendMetadataName/:name', (req, res) => {
    tokenCounter().then((result) => {
      var resultInt = parseInt(result);
      var tokenID = resultInt + 1;
      console.log(`-=-==--=-=--=-=-=-==--=-= tokenID-> ${tokenID} tokenName-> ${req.params.name} -=--=-=-=-=-=-=-=-=-=-=-=-`)
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
    })
  })


  app.get('/generateCoupons', (req, res) => {
        createCoupons();
        res.send(true);
  })

app.listen(port, () => console.log(`Stanfor NFT backend  app listening on port ${port}!`));






