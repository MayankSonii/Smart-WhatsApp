import express from 'express'
import { sendUserResponse } from '../controllers/chatController.js'

const router = express.Router()

//route to serve the post request
router.route('/').post(sendUserResponse)

export default router