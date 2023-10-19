import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// routes lib
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log(`>>> Connect to MongoDB successfully!`);
	})
	.catch((err) => {
		console.log(err);
	});

const app = express();

// use libraries
app.use(express.json());
app.use(cookieParser());

app.listen(3004, () => {
	console.log(`>>> Server running on port: 3004`);
});

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", listingRouter);

// middlewares
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});
