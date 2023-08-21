import express from 'express'
import { sendUserResponse } from '../controllers/chatController.js'

const router = express.Router()

router.route('/').post(sendUserResponse)

export default router