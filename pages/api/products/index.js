import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utilis/db';

const handler = nc();

handler.get(async (req,res)=>{

    await db.connect();

    const produtcs = await Product.find({});

    await db.disconnect();

    res.send(produtcs);
})

export default handler;