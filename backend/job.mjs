import { mkdirSync, WriteStream } from 'fs'
import { Readable } from 'stream'
import busboy from 'busboy'
import genTitle from './utils/titles.mjs'
import logger from './logger.mjs'
import { v1 as uuid } from 'uuid'

class Job {
	constructor(application, toolname) {
		this._id = uuid()
		this.createdAt = new Date()
		this.toolname = toolname??application.name
		mkdirSync(`/shared/tasks/${this._id}`, { recursive: true })
		this.dir = `/shared/tasks/${this._id}`
		this.status = `queued`
		this.files = [ ]
		this.application = application??(null)
	}

	async assign(req) {
		return new Promise((resolve, reject) => {
		let form = new FormData
		const bus = busboy({ headers: req.headers })
		bus.on(`file`, (name, data, info) => {
			info.filename.replace(/\s/g, `_`)
			data.pipe(WriteStream(`${this.dir}/${info.filename}`))
			.on(`error`, (err) => reject(err))
			this.files.push(info.filename)
		})
		bus.on(`field`, (name, data) => { form.set(name, data) })
		bus.on(`error`, (err) => reject(err) )
		bus.on(`close`, async () => {
			let command = {}
			form.forEach((data, key) => command[key] = data)
			this.title = ((command.title!=``)?command.title:genTitle()).replace(/\s/g, `_`)
			this.type = command.type??`untyped`
			if(command.query) {
				Readable.from(command.query)
				.on(`error`, (err) => reject(err))
				.pipe(WriteStream(`${this.dir}/query.txt`))
			this.files.push(`query.txt`)}
			resolve({...this, ...(await this.application(command, this).catch((err) => { logger.error(err); this.status = `error on generation` }))})
		})
		req.pipe(bus)
		})
	}
}

export default Job
