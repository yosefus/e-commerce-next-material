import nc from 'next-connect';
import db from '../../../server/db';
import Product from '../../../server/models/product';

const handler = nc();

handler.get(async (req, res) => {
  let result;
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    result = { code: 200, success: true, data: product };
  } catch (error) {
    result = { code: error.code || 500, success: false, msg: error.message || error };
  }
  res.send(result);
});

export default handler;
