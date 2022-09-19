import { mongo } from "../database/db.js";

const db = await mongo();

const postProduct = async (req, res) => {
	const product = res.locals.product;

	try {
		await db.collection("products").insertOne(product);
		res.status(201).send("Produto criado com sucesso");
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const getProducts = async (req, res) => {
	const limit = req.query.limit;
	const start = 12 * (limit - 1);
	const end = limit * 12;

	try {
		const products = await db.collection("products").find().toArray();
		res.status(200).send(products.reverse().slice(start, end));
	} catch (error) {
		res.status(500).send(error.message);
	}
};

export { postProduct, getProducts };
