import { ObjectId } from "mongodb";
import { mongo } from "../database/db.js";

const db = await mongo();

const getProduct = async (req, res) => {
    const idProduct = req.params.idProduct;
	try {
		const product = await db
			.collection("products")
			.findOne({ _id: ObjectId(idProduct)});			
		res.send(product);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

export { getProduct };