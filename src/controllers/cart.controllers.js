import { ObjectId } from "mongodb";
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

const deleteItemCart = async (req, res) => {
	const idItem = req.params.idItem;

	if (!idItem) return res.status(404).send("Item não encontrado");

	try {
		const item = await db.collection("cart").deleteOne({_id: new ObjectId(idItem)});
		return res.status(200).send("Item deletado do carrinho com sucesso")
	} catch (error) {
		res.status(500).send(error.message)
	}
};

const deleteUserCart = async (req, res) => {
	const userId = res.locals.userId
	try {
		 await db.collection("cart").deleteMany({ userId: userId })
		 return res.status(200).send("Carrinho esvaziado com sucesso");
	} catch (error) {
		res.status(500).send(error.message);
	}
};

export { getCart, postCart, deleteItemCart, deleteUserCart };
