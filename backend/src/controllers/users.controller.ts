import asyncHandler from "@/lib/asyncHandler";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    gender,
    image,
  } = req.body;

  try {
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });

    if (existingUser) {
      const conflictField =
        existingUser.email === email
          ? "Email"
          : existingUser.username === username
          ? "Username"
          : "Phone number";
      return res.status(400).json({
        success: false,
        message: `${conflictField} already exists`,
      });
    }

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: await bcrypt.hash(password, 10),
        firstName,
        lastName,
        phone,
        gender,
        image,
      },
      select: { id: true, email: true, username: true },
    });

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error, "@Create user");
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
