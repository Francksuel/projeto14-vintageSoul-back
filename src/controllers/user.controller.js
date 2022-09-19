import { mongo } from "../database/db.js";

const db = await mongo();

const editUserAdress = async (req, res) => {
    const userId = res.locals.userId;

    //falta validação do body
    
    try {
        await db.collection("users").updateOne({_id: userId}, {$set: {address: req.body}});
        const user = await db.collection("users").findOne({_id: userId});
		return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

const getUserAddress = async (req, res) => {
    const userId = res.locals.userId;

    try {
        const user = await db.collection("users").findOne({_id: userId});
        return res.status(200).send(user.address);
    } catch (error) {
        return res.status(500).send(error.message);   
    }

};

export { editUserAdress, getUserAddress }