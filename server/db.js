import mongoose from 'mongoose';

async function connect() {
  if (!mongoose.connection?.readyState) {
    try {
      await mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });
      console.log('mongo is connected');
    } catch (error) {
      console.log('mongo connect + error ', error);
    }
  }
}

async function disconnect() {
  if (mongoose.connection?.readyState) {
    try {
      await mongoose.disconnect();
      console.log('mongo is disconnected');
    } catch (error) {
      console.log('mongo disconnect + error', error);
    }
  }
}

const convertMongoDoc = (doc) => ({ ...doc, _id: doc._id.toString(), updatedAt: doc.updatedAt.toString(), createdAt: doc.createdAt.toString() });

const db = { connect, disconnect, convertMongoDoc };
export default db;
