import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../models/User";
import { signToken } from "../../../utilis/auth";
import db from "../../../utilis/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  const token = signToken(user); 
    
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  
});

handler.get(async (req, res) => {
  await db.connect();

  const users = await User.find({});

  await db.disconnect();

  res.send(users);
});

export default handler;
