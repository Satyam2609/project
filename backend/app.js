import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true
}));

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:false , limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())

import { router } from './routes/user.routes.js'
app.use('/user' , router)

export {app}