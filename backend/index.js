import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(3004, () => {
	console.log(`>>> Server running on port: 3004`);
});
