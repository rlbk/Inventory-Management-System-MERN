import asyncHandler from "@/lib/asyncHandler";
import { db } from "@/lib/db";
import { Request, Response } from "express";

export const createShop = asyncHandler(async (req: Request, res: Response) => {
  const { name, slug, location, adminId, attendantIds } = req.body;
  try {
    const existingShop = await db.shop.findFirst({
      where: { slug },
    });
    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: "Shop already exists with this name",
      });
    }
    const newShop = await db.shop.create({
      data: {
        name,
        slug,
        location,
        adminId,
        attendantIds,
      },
    });
    res.status(201).json({
      success: true,
      data: newShop,
    });
  } catch (error) {
    console.log(error, "@Create shop");
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const getShops = asyncHandler(async (req: Request, res: Response) => {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
    res.status(200).json({
      success: true,
      data: shops,
    });
  } catch (error) {
    console.log(error, "@Get shops");
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const getShopById = asyncHandler(async (req: Request, res: Response) => {
  const { shopId } = req.params;
  try {
    const existingShop = await db.shop.findUnique({
      where: { id: shopId },
    });
    if (!existingShop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }
    res.status(200).json({
      success: true,
      data: existingShop,
    });
  } catch (error) {
    console.log(error, "@Get shop");
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const getShopAttendants = asyncHandler(
  async (req: Request, res: Response) => {
    const { shopId } = req.params;
    try {
      const existingShop = await db.shop.findUnique({
        where: { id: shopId },
      });
      if (!existingShop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }
      const attendants = await db.user.findMany({
        where: {
          id: {
            in: existingShop.attendantIds,
          },
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          image: true,
          phone: true,
          email: true,
        },
      });
      res.status(200).json({
        success: true,
        data: attendants,
      });
    } catch (error) {}
  }
);
