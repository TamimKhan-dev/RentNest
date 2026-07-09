import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { authRoutes } from "./modules/auth/auth.route";
import { landLordRoutes } from "./modules/landlord/landlord.route";
import { propertyRoutes } from "./modules/property/property.route";
import { rentalRequestRoutes } from "./modules/rental-requests/rental-requests.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { paymentRoutes } from "./modules/payment/payment.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: `Express Server is running on Port: ${config.port}`,
    author: "Tamim Khan",
    project: "RentNest"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/landlord", landLordRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rentals", rentalRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;