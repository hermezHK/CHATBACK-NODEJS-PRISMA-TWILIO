import { Router } from "express";
import { findAll, store } from "./controller";

const messageRouter = Router();

messageRouter.get("/:id/:sender_id", findAll )
messageRouter.post("/", store);

export default messageRouter;