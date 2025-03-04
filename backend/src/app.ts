import cors from "cors";
import express from "express";
import envConfig from "./config/envConfig";

import customerRoutes from "./routes/customers.route";
import shopRoutes from "./routes/shops.route";
import userRoutes from "./routes/users.route";

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
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/shops", shopRoutes);

export { app };
