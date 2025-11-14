import mongoose from "mongoose"
async function connectDB() {
    try{
        await mongoose.connect(process.env.MongoURI)
        console.log("Connected to MongoDB")
    }catch(err){
        console.log(err.message)
    }
}
export{
    connectDB
}