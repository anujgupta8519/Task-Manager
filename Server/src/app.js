import express from 'express'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use( cookieParser() )

//routes

import adminRoutes from './routes/admin.routes.js'
app.use('/admin',adminRoutes)

import userRoutes from './routes/User.routes.js'
app.use('/user', userRoutes)

import taskRoutes from './routes/task.routes.js'
app.use('/task', taskRoutes)

import commentRoutes from './routes/comment.routes.js'
app.use('/comment', commentRoutes)






export {app}
