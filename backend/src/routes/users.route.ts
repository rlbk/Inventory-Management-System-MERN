import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updatePasswordByUserId,
  updateUserById,
} from "@/controllers/users.controller";
import express from "express";
const router = express.Router();

router.route("/").post(createUser).get(getUsers);
router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);
router.route("/:id/password").put(updatePasswordByUserId);

export default router;
