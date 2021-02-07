import { Router } from "express";
import User from "../models/user";

const router = Router();

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (req.body.password == user.password) {
        res.status(200).send({ user });
      } else {
        res.status(400).send({ Error: "Unable to login" });
      }
    }
  } catch (error) {
    res.status(400).send({ Error: "Unable to login" });
  }
});

export { router as userRouter };
