import nc from "next-connect";
import Order from "../../../models/Order";
import { isAdmin, isAuth } from "../../../utilis/auth";
import db from "../../../utilis/db";
import { onError } from "../../../utilis/error";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate('user', 'name');

  //console.log(orders);
  await db.disconnect();
  res.send(orders);
});

export default handler;
