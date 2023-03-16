import express from 'express'
import { download } from '../utils/fs.mjs'
import logger from '../logger.mjs'

const router = express.Router()

router.use((req, res, next) => {
	logger.info(`Download request [${req.ip}] to ${req.method}${req.path}`)
	next()
})

router.get(`(/*)?`, (req,res) => {
	download(req.path, res)
})

export default router


