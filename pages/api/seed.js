import nc from 'next-connect';
import db from '../../server/db';
import User from '../../server/models/user';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  let result;
  // try {
  //   await db.connect();
  //   await Product.deleteMany();
  //   const insertedDATA = await Product.insertMany(data.products);
  //   result = { code: 200, success: true, data: insertedDATA };
  // } catch (error) {
  //   result = { code: error.code || 500, success: false, msg: error.message || error };
  // }
  try {
    await db.connect();
    await User.deleteMany();
    const insertedDATA = await User.insertMany(data.users);
    result = { code: 200, success: true, data: insertedDATA };
  } catch (error) {
    result = { code: error.code || 500, success: false, msg: error.message || error };
  }
  res.send(result);
});

export default handler;
