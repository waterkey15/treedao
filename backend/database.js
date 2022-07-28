let mysql = require('mysql');
const fs = require('fs');
const {parse} = require('csv-parse');

const connectDB = new Promise((resolve, reject) => {
        

       	let connection = mysql.createConnection({
                host: 'localhost',
                user: '', //db username
                password: '', //db password
                database: '' //db name
        })


	connection.connect(function(err) {
                if (err) {
                        reject(false);

                }
        
       	console.log('Connected to the MySQL server.');
        resolve(connection);
        });
});


const getPriceFromCoupons = (coupon) => {
        return new Promise((resolve, reject) => {
                connectDB.then((res) =>{
                        console.log(coupon)
                        res.query(`select * from coupons where code="${coupon}";`, function(err, result) {
                        if(err || result === undefined){
                                reject("DB ERROR");
                        }
                console.log('-==-=--=')
                console.log(result.length);
                deleteFromDB(coupon).then((isDeleted) => {

                if(result.length === 0){
                        resolve({status: false, price: 100})
                }else{
                      	console.log(result[0].price)
                        resolve({status: true, price: result[0].price});
                }
        })
          	})
        })
	})
}

const sendCouponsToDB = (code) => {

    return new Promise((resolve, reject) => {
        connectDB.then((res) =>{
              
             	res.query(`INSERT INTO coupons (code, price) VALUES ("${code}", 1.5);`, function(err, result) {
                if(err || result === undefined){
                        reject("DB ERROR");
                }
                resolve(true);
    })
        })
    })
  }


  const createCoupons = () => {
    fs.createReadStream("./200_unique_codes.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      console.log(row);
      sendCouponsToDB(row).then((result) => {
          console.log(`${row} added`);
      })
    }) 
  }

  const deleteFromDB = (code) => {

    return new Promise((resolve, reject) => {
connectDB.then((res) =>{
        res.query(`DELETE FROM coupons where code = '${code}';`, function(err, result) {
        if(err || result === undefined){
                reject("DB ERROR");
        }
        console.log(result);
        resolve(true);
})
  })
})
}

module.exports = {getPriceFromCoupons, createCoupons};




