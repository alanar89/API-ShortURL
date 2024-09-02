import express from "express";
import { verifyToken } from "../middlewares/jwt.middleware.js";
import { verifyUrl } from "../middlewares/urlValidator.middleware.js";
import {
  createLink,
  getLinks,
  getLink,
  updateLink,
  deleteLink,
} from "../controllers/link.controller.js";
const router = express.Router();

//get /api/v1/links  all links
router.get("/", verifyToken, getLinks);
//get /api/v1/links/:id one links
router.get("/:short", getLink);
//post /api/v1/links  create links
router.post("/", verifyToken, verifyUrl, createLink);
//patch /api/v1/links/:id  update links
router.patch("/:id", verifyToken, updateLink);
//delete /api/v1/links/:id  delete links
router.delete("/:id", verifyToken, deleteLink);

export default router;
