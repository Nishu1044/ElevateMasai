const express = require("express")
require("dotenv").config();


const cors = require('cors');
const movieRouter = require("./Routes/movie.route");
const Connection = require("./Config/db");


const app = express()
app.use(express.json());

app.use(cors({
  origin:"*",
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.use("/api/movie",movieRouter)
const PORT = process.env.PORT || 8001


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
    Connection()
})

