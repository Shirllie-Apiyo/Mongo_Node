// puling mongodb client
const MongoClient = require('mongodb').MongoClient;

//create a repo
const circulationRepo =require('./repos/circulationRepo');

//pull that data
const data = require('./circulation.json');

const url = 'mongodb://localhost:27017';
//name of db
const dbName = 'circulation';

// create function main
async function main(){
    //open up a client
    const client = new MongoClient(url);
    // holds processing till client.connect comes back
    await client.connect();


    const results = await circulationRepo.loadData(data);
    console.log(results.insertedCount); // show the data inserted  on the db
    //admin is an object that allows some introspection on the server
    const admin = client.db(dbName).admin();
    // gives info about the server
    // console.log(await admin.serverStatus());
    // gives info about the db's in our server
    console.log(await admin.listDatabases());
}

//execute main
main();