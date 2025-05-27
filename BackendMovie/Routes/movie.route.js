const express = require("express")

const { AddMovies, GetMovies, GetMoviesID, updateMovieByID, deleteMovieByID } = require("../Controller/movie.controller")
const movieRouter = express.Router()

movieRouter.post("/add",AddMovies)
movieRouter.get("/get",GetMovies)
movieRouter.get("/:movieID",GetMoviesID)
movieRouter.put("/:movieID",updateMovieByID)
movieRouter.delete("/:movieID",deleteMovieByID)


module.exports = movieRouter