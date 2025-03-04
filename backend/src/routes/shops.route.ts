import {
  createShop,
  getShopAttendants,
  getShopById,
  getShops,
} from "@/controllers/shops.controller";
import express from "express";
const router = express.Router();

router.route("/").post(createShop).get(getShops);
router.route("/:shopId/attendants").get(getShopAttendants);
router.route("/:shopId").get(getShopById);

export default router;
