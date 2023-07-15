const app = require("./app")
const dotenv = require("dotenv");
const  connectmongodb = require("./config/database")
// handling uncought exception error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
})

// config
dotenv.config()
// connect data base
connectmongodb();
const port = process.env.PORT || 5000 ;
const server = app.listen(port,()=>{
    console.log(`server is working porton http://localhost:${process.env.PORT}`)
})

// unhandled promise Rejection 

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});