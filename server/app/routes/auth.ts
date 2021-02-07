import { Router } from "express";
import User, { I_user } from "../models/user";

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

router.post("/login", (req, res) => {
  const credentials = req.body;

  try {
    res.status(200).send({ credentials });
  } catch (error) {
    res.status(400).send(error);
  }
});

export { router as authRouter };
