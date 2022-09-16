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
    try {
        const products = await db.collection("products").find().toArray();

        if(products.length < 1) res.stauts(404).send("Não há produtos cadastrados");

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { postProduct, getProducts }