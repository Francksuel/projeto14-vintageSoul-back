import { mongo } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"

const db = await mongo();

async function repeatEmail(email) {
	const users = await db.collection("users").find().toArray();
	return users.filter((element) => element.email === email);
}
const signUp = async (req, res) => {
	res.send("olá");
};

const signIn = async (req, res) => {
	res.send("ola");
} 

export { signUp, signIn };
