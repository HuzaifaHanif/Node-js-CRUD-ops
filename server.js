const express = require("express");
const studentRoutes = require("./src/student/routes");
const userRoutes = require("./src/User/routes");
const config = require("config");

const app = express()
port = 3000 ;  
app.use(express.json());

if(!config.get("jwtPrivateKey"))
{
    console.error("private Key is not defined");
    process.exit(1);
}

app.get('/',(req,res) =>{
    res.send("Hello World");
})

app.use("/api/students/", studentRoutes);
app.use("/api/users", userRoutes);

app.listen(port ,() => console.log(`App listening on Port ${port}`));

