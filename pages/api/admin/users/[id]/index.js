import nc from "next-connect";
import User from "../../../../../models/User";
import { isAdmin, isAuth } from "../../../../../utilis/auth";
import db from "../../../../../utilis/db";
import { onError } from "../../../../../utilis/error";


const handler = nc({
    onError
});
handler.use( isAuth, isAdmin);



handler.get(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
});



handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);

  if (user) {
    user.name = req.body.name;
    user.isAdmin = req.body.isAdmin;

    await user.save();
    await db.disconnect();
    res.send({ message: "User Updated successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });

  }
});


handler.delete( async(req,res)=>{
    await db.connect();
    const user = await User.findById(req.query.id);
  
    if(user){
      await user.remove();
      await db.disconnect();
      res.send({message : 'User Deleted'});
    }else{
      await db.disconnect();
      res.status(404).send({ message: 'User Not Found'})
    }
  
  });

  export default handler;
  