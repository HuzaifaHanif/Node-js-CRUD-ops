const { json } = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
const {hashPassword} = require("./hash");
const bcrypt = require("bcrypt");
const queries = require("./queries");
const config = require("config");

//const secretKey = "huza@1053";

const registerUser = async (req,res) => {
    const {email , password} = req.body;
    
    const hash = await hashPassword(password)

    pool.query(queries.registeringUser , [email , hash] , (error , result) => {
        if(error)
            res.status(400).send(json("error adding user in databse user"));

        res.status(200).json(
            {
                message: "Succesfully registered user ",
                user: result.rows
            });
    });
}

const loginUser =(req,res) => {
    const {email , password} = req.body;

    pool.query(queries.getUser , [email] , async (error , result) => {
        if(!result.rows.length)
            res.status(400).json("Invalid email or password");

        else
        {
            const {password : hashedPassword} = result.rows[0];
            const match = await bcrypt.compare(password , hashedPassword);

            if(!match)
                res.status(400).json("Invalid email or password2");

            else
            {
                jwt.sign({
                    email: result.rows[0].email
                } , config.get("jwtPrivateKey") , (error , token) =>{

                    if(error)
                        res.status(500).json("Couldn't create token");

                    res.status(200).json(token);
                });

            }
        }
    })
}

module.exports = {
    registerUser,
    loginUser,
}