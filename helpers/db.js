const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://mchaouch007:mchaouch007@cluster0.qdtbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

const connectToDb = async () => {
  try {
    await client.connect();
    db = client.db("todoApp");
    console.log("connected");
  } catch (error) {
    console.error("error connecting!", error);
  }
};
const getDB = () => {
  if (!db) throw new Error("please connct before use db");
  else return db;
};

module.exports = { getDB, connectToDb };
