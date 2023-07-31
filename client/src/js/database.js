import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//this function is responsible for saving the data to the database
export const putDb = async (content) => {
  console.log("Put to the database");
//open the database
  const jateDb = await openDB("jate", 1);
  //start a transaction in readwrite mode to access the database and store the data in the object store
  const tx = jateDb.transaction("jate", "readwrite");
  //access the object store
  const store = tx.objectStore("jate");
  //put the data in the object store
  const request = store.put({ id: 1, value: content });
  //log the request object that represents the request to the database
  console.log(request);
  //wait for the request to complete
  const result = await request;
  //log the result
  console.log("data saved to the database", result);
  //return the result
  return result;
};



// TODO: Add logic for a method that gets all the content from the database
//this function is responsible for getting the data from the database
export const getDb = async () => {
  console.log("GET from the database");
  //here we are opening the database 
  const jateDb = await openDB("jate", 1);
  //start a transaction in readonly mode to access the database and store the data in the object store
  const tx = jateDb.transaction("jate", "readonly");
  //access the object store
  const store = tx.objectStore("jate");
  //here we are fetching all operation to complete the request
  const request = store.getAll();
  //log the request object that represents the request to the database
  const result = await request;
  //log the result of the request
  console.log("result.value", result);
  //return the result
  return result?.value;
};
initdb();
