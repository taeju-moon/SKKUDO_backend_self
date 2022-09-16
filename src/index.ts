import express from "express";

const app = express();

app.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    res.send("hello");
});

app.listen(8000, ()=>{
    console.log("8000번 포트 대기중...")
});