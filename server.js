const mysql = require('mysql2');

var dbConn = mysql.createConnection({
    host: 'deltona.birdnest.org',
    user: 'my.brownw15',
    password: 'wessbrowndb',
    database: 'my_brownw15_355Project4'
});

dbConn.connect(function(err) {
    if (err) {
        console.error('error connecting');
        return;
    }
    console.log('connected!');
});
module.exports = dbConn;

/*
CREATE TABLE USER_ACCOUNT
(
    acc_id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    Phone VARCHAR(10),
    Address VARCHAR(30),
    Email VARCHAR(30),
    City VARCHAR(25),
    State CHAR(2),
    Zip CHAR(5), 
    Salt VARCHAR(30), 
    Hash VARCHAR(30)
);*/