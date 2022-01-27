import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utilis/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  //console.log(req.query.id);
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

export default handler;
