const jwt = require("jsonwebtoken");
const config = require("config");

const gettingToken = (req,res,next) =>{
    const bearerHeader = req.headers['authorization'];
    
    if(bearerHeader == undefined)
        return res.status(400).json("invalid token");

    else
    {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
}

const verifyToken = (req,res,next) =>{

    token = req.token;
    jwt.verify(token , config.get("jwtPrivateKey") , (error , result) =>{
        if(error)
           return res.status(400).json("invalid Token");

        next();
    });
}

module.exports = {
    gettingToken,
    verifyToken
};