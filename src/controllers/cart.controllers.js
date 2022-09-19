import { mongo } from "../database/db.js";

const db = await mongo();

const getCart = async (req, res) => {
	try {
		const userProducts = await db
			.collection("cart")
			.find({ userId: res.locals.userId })
			.toArray();
		res.send(userProducts);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
const postCart = async (req, res) => {
	const userId = res.locals.userId;
	const product = req.body;
	try {
		await db.collection("cart").insertOne({...product, userId});
		res.status(201).send("Adicionado ao carrinho com sucesso");
	} catch (error) {
		res.status(500).send(error.message);
	}
};

export { getCart, postCart };
