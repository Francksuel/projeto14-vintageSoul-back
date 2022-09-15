import { mongo } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"

const db = await mongo();

const signUp = async (req, res) => {
	const registry = res.locals.registry;

	try {
		const emailInUse = db.collection("users").findOne({email: registry.email});

		if(!emailInUse) return res.status(409).send("Email já cadastrado");

		const passwordHash = bcrypt.hashSync(registry.password, 10);

		await db.collection("users").insertOne({
			name: registry.name,
			email: registry.email,
			passwordHash
		});

		res.status(201).send("Usuário cadastrado com sucesso");
		
	} catch (error) {
		return res.status(500).send(error.message);
	}

};

const signIn = async (req, res) => {
	res.send("ola");
} 

export { signUp, signIn };
