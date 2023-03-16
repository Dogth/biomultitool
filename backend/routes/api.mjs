import express from 'express'
import logger from '../logger.mjs'
import Job from '../job.mjs'
import database from '../utils/db.mjs'
import { camelToURL } from '../utils/utils.mjs'

import { blast, blastDb, rodeo, prodigal, skaniDist, skaniSearch, skaniSketch, skaniTriangle } from '../scripts.mjs'

const router = express.Router()

router.use((req, res, next) => {
	logger.info(`API request [${req.ip}] to ${req.method}${req.path}`)
	next()
})

const genEndpoints = ([...tools]) => {
	tools.map(tool => {
		router.post(`/${camelToURL(tool.name)}`, (req,res) => {
			new Job(tool).assign(req)
			.then((job) => {
				database.collection(`tasks`).insertOne(job)
				res.sendStatus(200)
			})
			.catch((err) => {
				logger.error(err)
				res.sendStatus(500)
			})
		})
	})
}

genEndpoints([
	blast, blastDb, rodeo, prodigal,
	skaniDist, skaniSearch, skaniSketch,
	skaniTriangle
])

export default router
