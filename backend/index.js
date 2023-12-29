import http from 'http';
import express from 'express'; 
import cors from 'cors';
let router = express.Router(); 
const app = express(); 
let corOptions = {
    origin: "*"
} 
app.use(cors(corOptions))
app.use("/champions", express.static('champions'));
app.listen(8080, ()=>{})