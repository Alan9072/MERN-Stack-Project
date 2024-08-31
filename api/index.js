import express from 'express'
const app = express();
const port = 5000;
import cors from 'cors'


app.use(express.json());
app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.post('/add',(req,res)=>{
    console.log(req.body);
    console.log("message received");
    res.json("successful");
})

app.listen(port,()=>{
    console.log("Server running on port " +`${port}`);
})
