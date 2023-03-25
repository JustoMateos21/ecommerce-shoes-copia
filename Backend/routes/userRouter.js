import express from "express";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
const userRouter = express.Router();

userRouter.post("/signin", (req, res) => {
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.email);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  });
});

userRouter.post("/signup", (req, res) => {
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.username);
    const newUser = new User({
      name: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
    return;
  });
});

export default userRouter;
