"use strict";

const dotenv = require('dotenv');
dotenv.config();
 const mongoose = require('mongoose');
 const logger = require('../core/logger');
 
 let conn = null;
 const uri = process.env.DB_CONNECTION_URL;
 //console.log("process",process.env.DB_CONNECTION_URL);
 
 module.exports.openDBConnection = async function () {
   try {
     if (conn == null) {
       conn = await mongoose.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       logger.info("New Connection open ");
       // `await`ing connection after assigning to the `conn` variable
       // to avoid multiple function calls creating new connections
       await conn;
     }
 
     return conn;
   } catch (error) {
     logger.error(error);
     return null;
   }
 };

module.exports.closeDBConnection = async (db) => {
    // if (db) {
    //     await db.disconnect();
    //     console.log("Connection closed");
    // }
}

