import {
	stat,
	readdir,
	rm,
	statSync,
	mkdir,
	ReadStream,
	WriteStream,
} from "fs";
import archiver from "archiver";
import { setDownloadHeaders } from "./utils.mjs";
import logger from "../logger.mjs";
import mime from "mime";
import { basename, extname, normalize } from "path";
import { Readable } from "stream";
import busboy from "busboy";

const sendArhive = (dir, res) => {
	setDownloadHeaders(res, `application/zip`, `${basename(dir)}.zip`);
	const archive = archiver("zip");
	archive.directory(dir, basename(dir));
	archive.finalize();
	archive
		.on("error", (err) => {
			logger.error(err);
			res.sendStatus(500);
		})
		.on("warning", (warn) => {
			logger.warn(warn);
		})
		.pipe(res);
};

const sendFile = (dir, res) => {
	ReadStream(dir)
		.on(`error`, (err) => {
			logger.error(err);
			res.sendStatus(500);
		})
		.pipe(res);
};

const formFileData = (path, file, stats) => {
	return {
		path: normalize(`${path}/${file}`),
		filename: file,
		ext: extname(file),
		isDir: stats.isDirectory(),
		size: stats.size,
		createdAt: stats.birthtime,
		mime: mime.lookup(file),
	};
};

export const download = (dir, res) => {
	const path = normalize(`/shared/${dir}`);
	setDownloadHeaders(res, mime.lookup(path), basename(dir));
	stat(path, (err, file) => {
		err
			? res.sendStatus(400)
			: file.isDirectory()
				? sendArhive(path, res)
				: sendFile(path, res);
	});
};

export const upload = (req, res) => {
	const path = normalize(`/shared/${req.path}`);
	try {
		const bus = busboy({ headers: req.headers });
		bus
			.on(`file`, (name, data, info) => {
				mkdir(path, { recursive: true }, (err) =>
					err
						? res.sendStatus(500)
						: data.pipe(
							WriteStream(`${path}/${info.filename.replace(/\s/g, `_`)}`)
						)
				);
			})
			.on(`error`, (err) => {
				res.sendStatus(err ? 500 : 200);
				console.log(err);
			})
			.on(`field`, (name, data) => {
				console.log(`Field ${data}`);
				Readable.from(data).pipe(WriteStream(path));
			})
			.on(`error`, (err) => {
				res.sendStatus(500);
				logger.error(err);
			})
			.on(`close`, () => res.sendStatus(200));
		req.pipe(bus);
	} catch {
		mkdir(path, { recursive: true }, (err) => res.sendStatus(err ? 500 : 200));
	}
};

export const remove = (dir, res) => {
	const path = normalize(`/shared/${dir}`);
	rm(path, { recursive: true }, (err) => res.sendStatus(err ? 404 : 200));
};

export const explore = (dir, res) => {
	const path = normalize(`/shared/${dir}`);
	stat(path, (err, file) => {
		err
			? res.sendStatus(404)
			: file.isDirectory()
				? readdir(path, (err, files) => {
					err
						? res.sendStatus(404)
						: res.send(
							files.map((file) => {
								return formFileData(dir, file, statSync(`${path}/${file}`));
							})
						);
				})
				: ReadStream(path)
					.on(`error`, (err) => {
						logger.error(err);
						res.sendStatus(500);
					})
					.pipe(res);
	});
};
