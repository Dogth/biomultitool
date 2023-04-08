import logger from "./logger.mjs";
import { spawn, Pool, Worker } from "threads";
import { tasks } from "./db.mjs";

const threadingOptions = {
	concurrency: process.env.THREAD_CONCURRENCY,
	size: process.env.WORKER_CORES,
};

const pool = Pool(() => spawn(new Worker(`./worker.mjs`)), threadingOptions);

const fillPool = async (poolSize) => {
	let Job;
	for (poolSize; poolSize != 0; poolSize--) {
		Job = (
			await tasks.findOneAndUpdate(
				{ status: `queued` },
				{ $set: { status: `running` } }
			)
		).value;
		if (!Job) break;
		else {
			logger.info(`Got new task ${Job._id}, ${Job.script}`);
			await pool.queue((processJob) =>
				processJob(Job)
					.then((err) =>
						err ? logger.error(err) : logger.info(`Finished task ${Job._id}`)
					)
					.catch((err) =>
						err
							? logger.error(err)
							: logger.info(`Completed script command for ${Job._id}`)
					)
			);
		}
	}
};

setInterval(async () => {
	await fillPool(process.env.POOL_SIZE);
}, process.env.POLLING_RATE);
