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

app.get("/:id", async (req, res) => {
	const response = await client.user.findUnique({
		where: {
			id: req.params.id,
		},
	});

	res.json({
		message: "User found!",
		data: response,
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
