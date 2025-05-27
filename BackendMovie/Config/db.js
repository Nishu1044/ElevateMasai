const mongoose = require("mongoose")

async function Connection(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to MongoDB");
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = Connection