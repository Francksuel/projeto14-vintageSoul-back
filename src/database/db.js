import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();
const mongo = async () => {
	let db;
	try {
		db = await mongoClient.db("vintagesoul");
		return db;
	} catch (error) {
		return error;
	}
};
export { mongo };