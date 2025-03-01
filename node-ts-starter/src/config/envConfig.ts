require("dotenv").config();

const envConfig = {
  port: process.env.PORT || 5000,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};

export default Object.freeze(envConfig);
