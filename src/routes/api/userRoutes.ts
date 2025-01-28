import { Router } from 'express';
const router = Router();

import {
  getUser,
  createUser
} from "../../controllers/userControllers.js";

// GET ALL USERS
// router.get("/", getUser)
// router.post("/", createUser);


router.route("/")
  .get(getUser)
  .post(createUser); 


export { router as userRouter };
