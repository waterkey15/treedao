const express = require('express')
const https = require('https')
const cors = require('cors');
const bodyParser = require('body-parser');
const { validateTransaction, tokenCounter } = require('./tokenTransfer');
const { createMetadataLink } = require('./s3');


const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());



app.get('/validate', async (req,res) => {
    
    validateTransaction().then((result) => {
            console.log(tokenCounter);
            res.send(result);
    })
})

app.post('/createMetadata', (req, res) => {
    console.log(req.body)
    createMetadataLink(req.body.id);
    res.send("okay");
})


app.listen(port, () => console.log(`GSBDAO  app listening on port ${port}!`));
