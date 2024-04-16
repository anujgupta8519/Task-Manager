import mongoose from  'mongoose'

const connectDB = async () => {
  try {
   const databaseDetails = await mongoose.connect(process.env.MONGODB_URL)
    console.log("database connected", databaseDetails.connection.host, databaseDetails.connection.name)
  } catch (error) {
    console.log(error,"databse error")
  }

}

export {connectDB}
 
