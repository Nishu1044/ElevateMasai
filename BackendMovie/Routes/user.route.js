import {Router} from "express"
import {registration,login} from "../Controller/user.controller.js"



const userRouter = Router();
userRouter.post('/register', registration);
userRouter.post('/login', login);
// console.log("1")
export {userRouter}