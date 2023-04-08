import { expose } from "threads/worker";
import { PromisePool } from "@supercharge/promise-pool";
import { exec } from "child_process";
import { mkdirSync, rm } from "fs";
import { database } from "./db.mjs";

const run = (script) => {
	return new Promise((resolve) => {
		exec(script, (err) => {
			resolve(err ? `errored` : `done`);
		});
	});
};

const saveToDb = [`blastDb`, `skaniSketch`];

expose(async function worker({
	_id,
	title,
	toolname,
	dir,
	path,
	type,
	script,
}) {
	mkdirSync(path, { recursive: true });
	let { results } = await PromisePool.withConcurrency(
		parseInt(process.env.THREAD_CONCURRENCY)
	)
		.for(Array.isArray(script) ? script : [script])
		.process(async (command) => await run(command));
	rm(dir, { recursive: true }, (err) => (err ? results.push(`errored`) : null));
	saveToDb.includes(toolname) && !results.includes(`errored`)
		? database
			.db(`bmt`)
			.collection(toolname)
			.insertOne({
				_id: _id,
				title: title,
				type: type,
				dir: path,
			})
			.catch((err) => {
				throw err;
			})
		: null;
	database
		.db(`bmt`)
		.collection(`tasks`)
		.updateOne(
			{ _id: _id },
			{ $set: { status: results.includes(`errored`) ? `w/errors` : `done` } }
		)
		.catch((err) => {
			throw err;
		});
});
