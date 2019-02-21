const express = require('express');
const cors = require('cors')
const mysql = require( 'mysql' );

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'storekeeper',
    password: 'storekeeper123',
    database: 'store'
});

connection.connect(function( error ) {
    if( error ) {
        console.error( 'error on trying to connect to DB : ', error.message );
        throw error;
    }

    console.log( 'connected to the DB' );    
});

const app = express();

app.use(cors())

app.get( '/products', function( req, res ) {
    const query = 'SELECT * FROM products';
    
    connection.query( query, function( error, products ) {
        if( error ) {
            res.json({
                message: 'Error retrieving products from DB : ' + error.message
            });
            return;
        }

        res.status(200).json( products );
    });
});

app.listen( 3000 );