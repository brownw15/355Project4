var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var dbConn = require('./server.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
dbConn.connect();

app.get('/', function (req, res) {
    res.write("<html>");
    res.write("<body>");
    res.write("<div>");
    res.write("<form action='/saveUser' method='post'>");
    res.write("<h2> Create New User</h2>");
    res.write("<input type='text' name='firstName' placeholder='First'/>");
    res.write("<input type='text' name='lastName' placeholder='Last'/>");
    res.write("<input type='text' name='phone' placeholder='Phone'/>");
    res.write("<input type='text' name='address' placeholder='Address'/>");
    res.write("<input type='text' name='email_address' placeholder='email address'/>");
    res.write("<input type='text' name='city' placeholder='City'/>");
    res.write("<input type='text' name='state' placeholder='State'/>");
    res.write("<input type='text' name='zip' placeholder='zipcode'/>");
    res.write("<button type='submit' class='btn btn-primary'>Save</button>")
    res.write("</form>");
    res.write("</div>");
    res.write("<div>");
    res.write("<form action='/updateUser' method='post'>");
    res.write("<h2> Update User info</h2>");
    res.write("<input type='text' name= 'acc_id' placeholder='user ID'/>");
    res.write("<input type='text' name='FirstName' placeholder='First'/>");
    res.write("<input type='text' name='LastName' placeholder='Last'/>");
    res.write("<button type='submit' class='btn btn-primary'>Save Update</button>")
    res.write("</form>");
    res.write("</div>");
    res.write("<div>");
    res.write("<form action='/deleteUser' method='post'>");
    res.write("<h2>Delete a User </h2>");
    res.write("<input type='hidden' name='acc_id' required>")
    res.write("<input type='text' name= 'email_address' placeholder='user email'/>");
    res.write("<button type='submit' class='btn btn-primary'>Save Delete</button>")
    res.write("</form>");
    res.write("</div>");
    res.write("</body>");
    res.write("</html>");
    res.end();
}); 

dbConn.connect(); 
 
 app.get('/')
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM USER_ACCOUNT', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
 
 
// Retrieve user with id 
/*app.get('/user/:id', function (req, res) {
  
    let id = req.params.id;
    console.log(id);
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM USER_ACCOUNT where acc_id=?', id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'no user associated list.' });
    });
  
}); */
 
 
// Add a new user  
app.post('/saveUser', (req, res)=> {
    let data = {firstName: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone, address: req.body.address, email: req.body.email_address, city: req.body.city, state: req.body.state, zip: req.body.zip};
    let sql = "INSERT INTO USER_ACCOUNT SET ?";
    let query = dbConn.query(sql,data,(err,results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});
 
 
//  Update user with id
app.post('/updateUser', (req, res) => {
    let newF= req.body.firstName;
    let newL= req.body.lastName;
    let user_id = req.body.acc_id;
    let sql = 'UPDATE USER_ACCOUNT SET FirstName =' + "dbConn.escape(newF)"+ ', LastName ='+ 'dbConn.escape(newL)' + 'WHERE acc_id =' + dbConn.escape(user_id);
    let query = dbConn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});
 
//  Delete user
app.post('/deleteUser', function (req, res) {
    let user_id = req.body.email_address;
    let sql = 'DELETE FROM USER_ACCOUNT WHERE Email =' + dbConn.escape(user_id);
    let query = dbConn.query(sql, (err, results) => {
      if(err) throw err;
        res.redirect('/');
    });
  });

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;
