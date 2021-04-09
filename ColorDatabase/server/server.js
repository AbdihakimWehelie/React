//makes sure the express is used
const express = require('express')
const app = express();
const mysql= require('mysql2')





//const fetch = require("node-fetch");
const db= mysql.createConnection({
  user:'bill',
  servername:"localhost",
  password:"password",
  database: "color_database",
});


//calls the body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.text());

// calls the cross orgin middleware
const cors = require("cors");
app.use(cors());


app.use(express.json());
app.use(bodyParser.urlencoded({
     extended: false
}));

const port=3001;

app.listen(port, ()=>{

  console.log("Running on Port 3001.");
})

db.connect((err)=>{

    if(!err){
          console.log("Connected");
    }

    else{
      console.log("Not Connected");
      console.log(err);
    }

})


app.post('/insert', (req,res) => {

    const CSSValue =req.body.CSSValue;
    console.log(CSSValue);
    const sqlinsert="INSERT INTO CSSColor (CSSValue) VALUES(?)";

    db.query(sqlinsert, [CSSValue], (err, result)=>{
      if (err) {
            console.log(err);
            } else {
                res.send("Values Inserted");
                }
    });

})

app.get('/get', (req, res) => {

      const select="select * from CSSColor;"

      db.query(select, (err, result)=>{
          if(err){
            res.send(`There was an error with MySQL server.`)
            console.log(err);
          }

          else {
               res.send(result);
          }
      });
})

app.post('/delete', (req, res) => {


    const sqlDelete="DELETE from CSSColor WHERE CSSValue = ?";
    const CSSValue =req.body.CSSValue;

    db.query(sqlDelete, CSSValue, (err, result)=>{
      if (err) {
            console.log(err);
            } else {
                console.log('Number of rows deleted = ' + result.affectedRows);
                res.send("Value Deleted");
                }
    });

})
