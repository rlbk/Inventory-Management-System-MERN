import { db } from "@/lib/db";
import { Request, Response } from "express";

export const createCustomer = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  try {
    const existCustomer = await db.customer.findUnique({
      where: {
        email,
      },
    });
    if (existCustomer)
      res.status(400).json({ message: "Customer already exists" });
    else {
      const newCustomer = await db.customer.create({
        data: {
          name,
          email,
          phone,
        },
      });
      res.status(201).json(newCustomer);
    }
  } catch (error) {
    console.log(error, "@Create customer");
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  const customers = await db.customer.findMany({
    orderBy: {
      createAt: "desc",
    },
  });

  res.status(200).json(customers);
};

export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await db.customer.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json(customer);
};
