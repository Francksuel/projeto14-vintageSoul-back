import { mongo } from "../database/db.js";
import bcrypt from "bcrypt";

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


export { signUp };
