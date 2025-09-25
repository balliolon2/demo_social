import express from "express";
import {
  getThread,
  getThreads,
  createThread,
  createReply,
} from "../controllers/thread.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get("/", getThreads);
router.post("/", verifytoken, createThread);
router.get("/:id", getThread);
router.post("/:id/replies", verifytoken, createReply);

export default router;
