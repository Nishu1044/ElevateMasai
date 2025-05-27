const movieModel = require("../Models/movie.model");

// add movie
const AddMovies = async(req,res)=>{
    const {name,description,category,imageUrl} = req.body;
    try {
        const newMovie = new movieModel({
            name,description,category,imageUrl
        })
        await newMovie.save()
        res.status(201).json({message:"movie added successfully"})

    } catch (error) {
        res.status(401).json({message:"error occurs while adding new movie",error})  
    }
}

// get movie
const GetMovies = async(req,res)=>{
    try {
        const AllMovies = await movieModel.find().sort({createdAt:-1})
        res.status(200).json({message:"All movies",AllMovies})
    } catch (error) {
        res.status(401).json({message:"error occurs while geeting data",error})
        console.log("error",error);  
    }
}

// get movie by id 
const GetMoviesID = async(req,res)=>{
    const movieID = req.params.movieID;
    try {
        const AllMovies = await movieModel.findById(movieID)
        if(!AllMovies) return res.json({message:"Invalid id"})

        res.status(200).json({message:"Specific movies",AllMovies})
    } catch (error) {
        res.status(401).json({message:"error occurs while geeting data",error})
        console.log("error",error);  
    }
}

// update by id 
const updateMovieByID = async(req,res)=>{
    const movieID = req.params.movieID;
    try {
        const AllMovies = await movieModel.findByIdAndUpdate(movieID,req.body,{new:true})
        if(!AllMovies) return res.json({message:"Invalid id"})

        res.status(200).json({message:"Movie has been updated",AllMovies})
    } catch (error) {
        res.status(401).json({message:"error occurs while updating data",error})
        console.log("error",error);  
    }
}

// delete by id 
const deleteMovieByID = async(req,res)=>{
    const movieID = req.params.movieID;
    try {
        const AllMovies = await movieModel.findByIdAndDelete(movieID)
        if(!AllMovies) return res.json({message:"Invalid id"})

        res.status(200).json({message:"Product has been deleted",AllMovies})
    } catch (error) {
        res.status(401).json({message:"error occurs while deleting data",error})
        console.log("error",error);  
    }
}

module.exports = {AddMovies,GetMovies,GetMoviesID,updateMovieByID,deleteMovieByID}

