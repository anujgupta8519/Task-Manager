import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))


app.use( cookieParser() )

//routes

import adminRoutes from './routes/admin.routes.js'
app.use('/api/admin',adminRoutes)

import userRoutes from './routes/User.routes.js'
app.use('/api/user', userRoutes)

import taskRoutes from './routes/task.routes.js'
app.use('/api/task', taskRoutes)

import commentRoutes from './routes/comment.routes.js'
app.use('/api/comment', commentRoutes)






export {app}
