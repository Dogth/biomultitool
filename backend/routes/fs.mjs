import logger from '../logger.mjs'
import express from "express"
import { explore, remove, upload } from '../utils/fs.mjs'

const router = express.Router()

router.use((req, res, next) => {
	logger.info(`FS request [${req.ip}] to ${req.method}${req.path}`)
	next()
})

router.get(`(/*)?`, (req,res) => { explore(req.path,res) })

router.delete(`(/*)?`, (req,res) => { remove(req.path, res) })

router.post(`(/*)?`, (req, res) => { upload(req, res) })

export default router
