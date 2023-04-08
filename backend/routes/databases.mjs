import express from "express";
import database from "../utils/db.mjs";
import { camelToURL } from "../utils/utils.mjs";
import logger from "../logger.mjs";
import { rm } from "fs";

const router = express.Router();

router.use((req, res, next) => {
	logger.info(`Database request [${req.ip}] to ${req.method}${req.path}`);
	next();
});

const getMany = async (collection) => {
	return await database.collection(collection).find().toArray();
};

const getOne = async (collection, id) => {
	return await database.collection(collection).findOne({ _id: id });
};

const deleteOne = async (collection, id) => {
	return (await database.collection(collection).deleteOne({ _id: id }))
		.deletedCount;
};

const collections = [`blastDb`, `tasks`, `skaniSketch`];

const genDbRoutes = (collections) => {
	collections.map((collection) => {
		let URL = camelToURL(collection);
		router.get(`/${URL}/:id`, async (req, res) => {
			let data = await getOne(collection, req.params.id);
			data ? res.send(data) : res.sendStatus(404);
		});
		router.get(`/${URL}`, async (req, res) => {
			res.send(await getMany(collection));
		});
		router.delete(`/${URL}/:id`, async (req, res) => {
			const params = await getOne(collection, req.params.id);
			params.dir
				? rm(params.dir, { recursive: true }, async (err) =>
					res.sendStatus(
						(await deleteOne(collection, req.params.id)) ? 200 : 404
					)
				)
				: res.sendStatus(
					(await deleteOne(collection, req.params.id)) ? 200 : 404
				);
		});
	});
};

genDbRoutes(collections);

export default router;
