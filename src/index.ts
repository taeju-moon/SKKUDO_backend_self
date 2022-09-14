import express from "express";

const app = express();

app.get("/", (req, res, next)=>{
    res.send("hello");
});

app.listen(8000, ()=>{
    console.log("8000번 포트 대기중...")
})