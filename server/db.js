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

const db = { connect, disconnect };
export default db;
