import { mongo } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"

const db = await mongo();

async function repeatEmail(email) {
	const users = await db.collection("users").find().toArray();
	return users.filter((element) => element.email === email);
}
const signUp = async (req, res) => {
	try {
		const registry = res.locals.registry;
		const isRepeatEmail = await repeatEmail(registry.email).then((repeat) => {
			return repeat.length;
		});
		if (isRepeatEmail !== 0) {
			return res.status(409).send("Já existe um usuário com esse e-mail!");
		}
		const passwordHash = bcrypt.hashSync(registry.password, 10);
		await db.collection("users").insertOne({
			name: registry.name,
			email: registry.email,
			password: passwordHash,
			street: registry.street,
			numberHouse: registry.numberHouse,
			city: registry.city,
			state: registry.state,
		});
		res.status(201).send("Usuário registrado com sucesso!");
	} catch {
		res.status(500).send("Falha ao conectar com o servidor!");
	}
};

const signIn = async (req, res) => {
	const signInObject = res.locals.signIn
	const token = uuid();
	
	try {
	const user = await db.collection("users").findOne({email: signInObject.email});

	if(!user) return res.status(401).send("Usuário e/ou senha inválidos");

	const isCorrectPassword = await bcrypt.compare(signInObject.password, user.password);

	if(!isCorrectPassword) return res.status(401).send("Usuário e/ou senha inválidos");

		await db.collection("sessions").insertOne({
			userId: user._id,
			token
		});
		return res.status(200).send({
			name: user.name,
			token
		});

	} catch (error) {
		return res.status(500).send("Falha ao conectar com o servidor!");
	}
}

export { signUp, signIn };
