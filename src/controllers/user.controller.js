import { mongo } from "../database/db.js";
import joi from "joi";

const db = await mongo();

const addressSchema = joi.object({
    state: joi.string().min(1).required(),
    city: joi.string().min(1).required(),
    district: joi.string().min(1).required(),
    street: joi.string().min(1).required(),
    number: joi.number().integer().positive().required(),
    complement: joi.string().min(1).required()
});

const editUserAdress = async (req, res) => {
    const userId = res.locals.userId;
    const address = req.body;
    const validation = addressSchema.validate(address, {abortEarly: false});

    if(validation.error) {
        const errors = validation.error.details.map((error) => error.message).join(" & ");
        return res.status(422).send(errors);
    };

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