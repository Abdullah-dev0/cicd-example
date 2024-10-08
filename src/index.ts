import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/", async (req, res) => {
	const response = await client.user.findMany();

	res.json({
		message: "Hello guys, how are you? The server is working!",
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

app.post("/find", async (req, res) => {
	const response = await client.user.findMany({
		where: {
			email: req.body.email,
		},
	});

	res.json({
		message: "User found",
		data: response,
	});
});

app.post("/delete", async (req, res) => {
	await client.user.deleteMany();

	res.json({
		message: "All users deleted",
	});
});

app.post("/add", async (req, res) => {
	let i = 0;
	while (i < 10) {
		await client.user.create({
			data: {
				name: req.body.name,
				email: req.body.email,
			},
		});
		i++;
	}

	res.json({
		message: "Done signing up!",
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
