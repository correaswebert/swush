import { Router } from "express";

const router = Router();

router.route("/").get((_req, res) => {
  res.send("Swush | A secure vault for teams.");
});

export { router as IndexController };
