const express = require( 'express' );
const mysql = require( 'mysql' );
const cors = require( 'cors' );

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'storekeeper',
    password: 'storekeeper123',
    database: 'store'
});

connection.connect(function( error ) {
    if( error ) {
        console.log( 'Error connecting to the DB : ' + error.message );
        throw error;
    }

    console.log( 'connected to the DB' );
});

const app = express();
app.use( cors() );

app.get( '/products', function( req, res ) {
    const query = 'SELECT * FROM products';
    connection.query( query, function( error, products ) {
        if( error ) {
            return console.log( error.message );
        }

        res.status( 200 ).json( products );
    });
});

app.listen( 3000 );