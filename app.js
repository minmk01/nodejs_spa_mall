const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();  
};

app.use(express.static("static"));
app.use(express.json()); //body 데이터를 해석해주는 미들웨어
app.use(express.urlencoded()); // 4-7강. 프론트엔드 측 3번째 요구사항에 의해 추가한 코드.
app.use(requestMiddleware);

app.use("/api", [goodsRouter]); //경로가 /api가 맞으면 goodsRouter로 실행됨. routes폴더의 goods.js 파일 안 router 코드가 실행됨.
//아니면 뒤에 있는 cartsRouter가 실행됨.

app.get("/", (req, res) => {
    res.send("Hello World###");
}); // app.get(,)은 라우터. 라우터도 미들웨어에 속함.

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});