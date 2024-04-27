import { app } from './app.js'
import { connectDB } from './db/index.js'
import dotenv from 'dotenv'


dotenv.config({
    path:'./env'
})


app.listen(5000, () => {
    connectDB().catch(
     
    )
    console.log('server is running on port 5000')
})
