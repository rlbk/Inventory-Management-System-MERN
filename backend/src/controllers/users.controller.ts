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

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        firstName: true,
        lastName: true,
        image: true,
        gender: true,
        dob: true,
      },
    });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error, "@Get users");
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        firstName: true,
        lastName: true,
        image: true,
        gender: true,
        dob: true,
      },
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error, "@Get user by id");
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export const updateUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, gender, image, dob } = req.body;
    try {
      const userExist = await db.user.findUnique({
        where: { id },
      });
      if (!userExist)
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      const user = await db.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          gender,
          image,
          dob: new Date(dob),
        },
        select: {
          id: true,
          email: true,
          username: true,
          phone: true,
          firstName: true,
          lastName: true,
          image: true,
          gender: true,
          dob: true,
        },
      });
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error, "@Update user by id");
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

export const updatePasswordByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const { password } = req.body;
    try {
      const userExist = await db.user.findUnique({
        where: { id: userId },
      });
      if (!userExist) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const user = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          password: await bcrypt.hash(password, 10),
        },
      });

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {}
  }
);

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userExist = await db.user.findUnique({
        where: { id },
      });
      if (!userExist)
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      await db.user.delete({
        where: { id },
      });
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(error, "@Delete user by id");
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

export const getAttendants = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const users = await db.user.findMany({
        where: {
          role: "ATTENDANT",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error, "@Get attendants");
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);
