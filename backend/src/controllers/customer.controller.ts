import { Request, Response } from "express";

export const getCustomers = async (req: Request, res: Response) => {
  const customers = [
    { name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
    {
      name: "Joel Smith",
      email: "joel.smith@example.com",
      phone: "+0987654321",
    },
  ];

  res.status(200).json(customers);
};

export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = {
    id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
  };

  res.status(200).json(customer);
};
