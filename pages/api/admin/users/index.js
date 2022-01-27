import nc from "next-connect";
import User from "../../../../models/User";
import { isAdmin, isAuth } from "../../../../utilis/auth";
import db from "../../../../utilis/db";
import { onError } from "../../../../utilis/error";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const user = await User.find({});
  await db.disconnect();
  //console.log(product);
  res.send(user);
});

export default handler;
