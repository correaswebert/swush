import { Router } from "express";
import { I_user } from "../model/user";

const router = Router();

router.post("/signup", (req, res) => {
    const user: I_user = req.body;

    try{
        res.status(201).send({user});
    }catch(error){
        res.status(400).send(error);
    }
});

router.post("/login", (req, res) => {
    const credentials = req.body;

    try{
        res.status(200).send({credentials});
    }catch(error){
        res.status(400).send(error);
    }
});

export { router as userRouter }