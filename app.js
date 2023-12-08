 const express = require('express');
 const {engine} = require('express-handlebars');
 const bodyParser = require('body-parser');
 const mysql = require('mysql');

 require('dotenv').config();

 const app = express();
 const port = process.env.PORT || 5000;

 //Parsing middleware
 //Parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false}));

 //Parse application/json
 app.use(bodyParser.json());

 // Static Files
 app.use(express.static('public'));

 //Templating Engine
 app.engine('handlebars', engine());
 app.set('view engine', 'handlebars');
 app.set('views', './views');


 // Connection Pool
 const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
 });
 
 // Connect to DB
 pool.getConnection((err, connection) => {
   if(err) throw err;
   console.log('connected as ID' + connection.threadId);
 }); 





 // Router
 app.get('', (req, res) => {
    res.render('home');
 });


 app.listen(port, () => console.log(`Listening on port ${port}`));
