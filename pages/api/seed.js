// import nc from 'next-connect';
// import db from '../../server/db';
// import Product from '../../server/models/product';
// // import User from '../../server/models/user';
// // import data from '../../utils/data';
// import data from '../../utils/data2';

// const handler = nc();

// handler.get(async (req, res) => {
//    let result;
//    console.log(data.products[0]);
//    try {
//       await db.connect();
//       await Product.deleteMany({ category: "cars" });
//       const insertedDATA = await Product.insertMany(data.products);
//       console.log("data", data.products);
//       // const insertedDATA = {}
//       result = { code: 200, success: true, data: insertedDATA };
//    } catch (error) {
//       console.log(error.message);
//       result = { code: error.code || 500, success: false, msg: error.message || error };
//    }
//    //   try {
//    //     await db.connect();
//    //    //  await User.deleteMany();
//    //     const insertedDATA = await User.insertMany(data.users);
//    //     result = { code: 200, success: true, data: insertedDATA };
//    //   } catch (error) {
//    //     result = { code: error.code || 500, success: false, msg: error.message || error };
//    //   }
//    res.send(result);
// });

// export default handler;
