//default 현재 디렉토리에 위치한 .env 파일로 부터 환경변수를 읽음
require("dotenv").config(); 
//var, let과는 다르게 const키워드는 선언과 동시에 리터럴 값을 할당해주어야하며, 재할당이 불가능하다
const express = require("express"); 
const connectToDB=require("./database/db");
const ErrorsMiddleware = require("./middleware/errorMiddleware");
const LibraryError = require("./utils/libraryError");
const bookRoutes = require("./routes/bookRoutes");

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);

    process.exit(1);
});

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
app.get("/test", (req, res) => {
    res.json({
        Hi: "Welcome to the MERN Library API"
    });
});

app.use("/api/v1/", bookRoutes);

// Error middleware
app.all("*", (req, res, next) => {
    next(
        new LibraryError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
});
app.use(ErrorsMiddleware);

//listen 포트를 연결하고 서버를 실행
//app.listen(
const server = app.listen( 
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` 
    )
); 

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);
    server.close(() => {
        // exit code 1 means that there is an issue that caused the program to exit
        process.exit(1);
    });
});