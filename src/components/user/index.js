import { Router } from "express";
import { findAll, store, validateCodeConfirm } from "./controller";

const userRouter = Router();

userRouter.get("/:id", findAll);
userRouter.post("/", store);
userRouter.put("/validate", validateCodeConfirm)

export default userRouter;