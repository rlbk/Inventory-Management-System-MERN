import {
  getCustomerById,
  getCustomers,
} from "@/controllers/customer.controller";
import express from "express";
const router = express.Router();

router.route("/").get(getCustomers);
router.route("/:id").get(getCustomerById);

export default router;
