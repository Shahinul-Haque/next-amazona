import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../models/User";
import { signToken } from "../../../utilis/auth";
import db from "../../../utilis/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);

    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({
      message: "Invalid email or password",
    });
  }
});

handler.get( async (req, res)=>{
  await db.connect();

  const users = await User.find({});

  await db.disconnect();

  res.send(users);
})

export default handler;
