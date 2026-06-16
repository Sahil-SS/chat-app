import express from "express";
import {
  getAllContacts,
  getChatPatners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const router = express.Router();
router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPatners);
router.get("/:idx", getMessagesByUserId);
router.post("/send/:idx", sendMessage);

export default router;
