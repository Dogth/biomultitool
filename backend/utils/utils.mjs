import { mkdir, ReadStream } from "fs";
import { PassThrough } from "stream";

export const camelToURL = (string) => {
	return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const mkdirAsync = (dir) => {
	return new Promise((resolve, reject) => {
		mkdir(dir, { recursive: true }, (err) =>
			err ? reject(err) : resolve(dir)
		);
	});
};

export const concatStreams = (files, dir) => {
	const passthru = new PassThrough();
	passthru.setMaxListeners(128);
	files
		.reverse()
		.map((file) => ReadStream(`${dir}/${file}`).pipe(passthru, { end: true }));
	return passthru;
};

export const setDownloadHeaders = (res, mime, filename) => {
	res.status(200);
	res.set({
		"content-type": mime,
		"content-disposition": `attachment;filename=${filename}`,
	});
};
