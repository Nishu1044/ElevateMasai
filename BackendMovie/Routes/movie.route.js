import {Router} from "express"
import  { AddMovies, GetMovies, GetMoviesID, updateMovieByID, deleteMovieByID } from "../Controller/movie.controller.js"
import { tokenVerify } from "../Middlewares/auth.middleware.js"
const movieRouter =Router()

movieRouter.post("/add",tokenVerify,AddMovies)
movieRouter.get("/get",GetMovies)
movieRouter.get("/:movieID",tokenVerify,GetMoviesID)
movieRouter.put("/:movieID",tokenVerify,updateMovieByID)
movieRouter.delete("/:movieID",tokenVerify,deleteMovieByID)


export { movieRouter}