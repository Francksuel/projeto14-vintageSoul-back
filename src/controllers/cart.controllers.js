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

export { getCart };
