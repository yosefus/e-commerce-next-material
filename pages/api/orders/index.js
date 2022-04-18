import nc from 'next-connect';
import db from '../../../server/db';
import order from '../../../server/models/order';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth)

handler.post(async (req, res) => {
  let result;
  try {
    await db.connect();
    // let y = await order.deleteMany({})
    // let j = await order.find()
    // console.log(j, y);
    const newOrder = await order.create({ ...req.body, user: req.user._id });
    result = { code: 201, success: true, data: newOrder };
  } catch (error) {
    console.log(error);
    result = { code: error.code || 500, success: false, message: error.message || error };
  }
  res.send(result);
});

handler.get(async (req, res) => {
  let result;
  try {
    await db.connect();
    // let y = await order.deleteMany({})
    // let j = await order.find()
    // console.log(j, y);
    const newOrder = await order.create({ ...req.body, user: req.user._id });
    result = { code: 201, success: true, data: newOrder };
  } catch (error) {
    console.log(error);
    result = { code: error.code || 500, success: false, message: error.message || error };
  }
  res.send(result);
});

export default handler;
