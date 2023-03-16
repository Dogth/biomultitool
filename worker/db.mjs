import { MongoClient } from "mongodb"

const database = await new MongoClient(`mongodb://db:27017`).connect()
const tasks = database.db(`bmt`).collection(`tasks`)

export { tasks, database }
