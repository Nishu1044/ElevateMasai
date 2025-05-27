const mongoose = require("mongoose")

const MovieSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true } 
    },
      {
        timestamps: true, // Automatically manages `createdAt` and `updatedAt` fields
      }
)

const movieModel = mongoose.model("movie",MovieSchema)
module.exports = movieModel