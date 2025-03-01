import cors from "cors";
import express, { Request, Response } from "express";
import envConfig from "./config/envConfig";

const app = express();

// middlewares
app.use(
  cors({
    origin: envConfig.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes
app.get("/test", (req: Request, res: Response) => {
  const customers = [
    { name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
    {
      name: "Joel Smith",
      email: "joel.smith@example.com",
      phone: "+0987654321",
    },
  ];

  res.status(200).json(customers);
});

export { app };
