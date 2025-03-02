import {
  createUser,
  getUserById,
  getUsers,
} from "@/controllers/users.controller";
import express from "express";
const router = express.Router();

router.route("/").post(createUser).get(getUsers);
router.route("/:id").get(getUserById);

export default router;
