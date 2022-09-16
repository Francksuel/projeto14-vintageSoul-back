import { mongo } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const db = await mongo();

const signUp = async (req, res) => {
	const registry = res.locals.registry;

	try {
		const emailInUse = db
			.collection("users")
			.findOne({ email: registry.email });

		if (!emailInUse) return res.status(409).send("Email já cadastrado");

		const passwordHash = bcrypt.hashSync(registry.password, 10);

		await db.collection("users").insertOne({
			name: registry.name,
			email: registry.email,
			passwordHash,
		});
		res.status(201).send("Usuário cadastrado com sucesso");
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const signIn = async (req, res) => {
	const signInObject = res.locals.signIn;
	const token = uuid();

	try {
		const user = await db
			.collection("users")
			.findOne({ email: signInObject.email });

		if (!user) return res.status(401).send("Usuário e/ou senha inválidos");

		const isCorrectPassword = await bcrypt.compare(
			signInObject.password,
			user.passwordHash
		);

		if (!isCorrectPassword)
			return res.status(401).send("Usuário e/ou senha inválidos");

		await db.collection("sessions").insertOne({
			userId: user._id,
			token,
		});
		return res.status(200).send({
			name: user.name,
			token,
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export { signUp, signIn };
