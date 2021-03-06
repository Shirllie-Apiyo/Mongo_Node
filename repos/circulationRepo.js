// pull mongo client directly thru destructuring
const { MongoClient, MongoClient } = require('mongodb');

// function to build repo
//revealing module pattern
//build a circultion repo
function circulationRepo() {
  const url = 'mongodb://localhost:27017';
  const dbName = 'circulation';

  function get(){
    return new Promise(async(resolve,reject) =>{
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

      const items = db.collection('newspapers').find();
      
      resolve(await items.toArray());
      client.close();
      }catch(error){
        reject(error);
      }
    });
  }

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        results = await db.collection('newspapers').insertMany(data);
        resolve(results);
        client.close();
      } catch (error) {
        reject(error);
      }
    })
  }

  return { loadData }
}

module.exports = circulationRepo();
