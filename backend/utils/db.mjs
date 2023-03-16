import { MongoClient } from "mongodb";

const database = await new MongoClient(`mongodb://db:27017`).connect()

export default database.db(`bmt`)



