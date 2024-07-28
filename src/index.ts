import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/", async (req, res) => {
	const response = await client.user.findMany();

	res.json({
		message: "heloo guys how are you the server is working !",
		data: response, 
	});
});

app.post("/add", async (req, res) => {
	await client.user.create({
		data: {
			email: req.body.email,
			name: req.body.name,
		},
	});

	res.json({
		message: "Done signing up!",
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
