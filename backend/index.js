import dotenv from 'dotenv'
import connectDB from './DB/index.js'
import { app } from './app.js'

dotenv.config({
    path:'./.env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 9000 , () => {
        console.log(`server is connected ${process.env.PORT}`)
    })
    
})
.catch((err) => {
    console.log("server is not connected" , err)
})