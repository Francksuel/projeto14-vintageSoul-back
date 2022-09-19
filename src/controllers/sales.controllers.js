import { ObjectId } from "mongodb";
import { mongo } from "../database/db.js";

const db = await mongo();

const finalizePurchase = async (req, res) => {
	const userId = res.locals.userId;
	const { total } = req.body;
	try {
		const user = await db
			.collection("users")
			.findOne({ _id: ObjectId(userId) });
		const userProducts = await db
			.collection("cart")
			.find({ userId: res.locals.userId })
			.toArray();
		userProducts.forEach(async (element) => {
			const product = await db
				.collection("products")
				.findOne({ _id: ObjectId(element.idProduct) });
			if (!product) {
				return res.status(404).send("Produto não encontrado!");
			}
			if (product.inventory < element.quantity) {
				return res.status(400).send("Quantidade acima do inventário");
			}
			const newInventory = Number(product.inventory - Number(element.quantity));
			await db.collection("products").updateOne(
				{ _id: ObjectId(element.idProduct) },
				{
					$set: {
						inventory: newInventory,
					},
				}
			);
		});
		await db.collection("cart").deleteMany({ userId: userId });
		const result = await db
			.collection("sales")
			.insertOne(...userProducts, user.address, total, userId);
		res.send(result.insetedId);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
export { finalizePurchase };
