import {
  createCustomer,
  getCustomerById,
  getCustomers,
} from "@/controllers/customer.controller";
import express from "express";
const router = express.Router();

router.route("/").get(getCustomers).post(createCustomer);
router.route("/:id").get(getCustomerById);

export default router;
