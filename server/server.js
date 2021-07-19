//default 현재 디렉토리에 위치한 .env 파일로 부터 환경변수를 읽음
require("dotenv").config(); 
//var, let과는 다르게 const키워드는 선언과 동시에 리터럴 값을 할당해주어야하며, 재할당이 불가능하다
const express = require("express"); 
const connectToDB=require("./database/db");

//Express 모듈을 실행해 app 변수에 할당, 익스프레스 내부에 http모듈이 내장되어 있으므로 서버의 역할을 할 수 있다.
const app = express(); 

connectToDB();

app.use(express.json());

//같은 방법 app.set(키,값) -> app.get(키) 사용가능
//app.set('port', process.env.PORT || 5000);
//app.listen(app.get('port'),() => {
//     console.log(app.get('port'), '번 포트에서 대기중');)
// });
const PORT = process.env.PORT || 5000; 


//app.get(주소,라우터) => /test로 요청시 Hi: "Welcome to the MERN Library API"를 json 형태로 응답
app.get("/test", (req, res)=> {
    res.json({
        Hi: "Welcome to the MERN Library API"
    });
});

//listen 포트를 연결하고 서버를 실행
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` 
    )
); 