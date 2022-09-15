import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
const mongo = async () => {
	let db;

		mongoClient.connect().then(() => {
			db = mongoClient.db("vintagesoul");
		});
};
export { mongo };


