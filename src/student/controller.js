const pool = require("../../db");
const queries = require("./queries");
const jwt = require("jsonwebtoken");
const config = require("config");

const getStudents = (req,res) => {
    pool.query(queries.getStudents,(error,result) =>{
        if(error)
            throw new Error("Error getting students from database");

        res.status(200).json(result.rows);
    });
}


const getStudentByID = (req,res) => {

    const id = parseInt(req.params.id);
    pool.query(queries.getStudentByID , [id] , (error , result) =>{
        if(error)
            throw new Error(`error getting student through id : ${id}`);

        else if(result.rows.length)
            res.status(200).json(result.rows);

        else
            res.send("please provide a valid id");
        

    })
}

const postStudent = (req,res) => {
    const {name , email , age , dob} = req.body;

    pool.query(queries.checkEmailExsists , [email] , (error , result) => {

        if(result.rows.length)
            return  res.send("Email already exsists");
        
        
        pool.query(queries.postStudent,[name , email , age , dob ],(error,result) => {
            if(error)
                throw new Error("Error inserting student" + error.message);
            res.status(200).json(result.rows);
        });

    });

}

const updateStudent = (req,res) => {
    const id = parseInt(req.params.id);
    const {name , email , age , dob} = req.body;

    pool.query(queries.updateStudent , [name , email , age , dob , id] , (error , result) => {
        if(error)
            throw new Error(`couldn't update student having id = ${id}`);

        res.status(200).json(result.rows);
    });

}

const deleteStudent = (req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(queries.deleteStudent , [id] , (error , result) =>{

        const noStudentFound = !result.rows.length;

        if(!result.rows.length)
            res.send("Student doesnot exsist in DataBase");

        else
            res.status(200).json(`Student having id = ${id} succesfully deleted`)
    });
        
}

module.exports ={
    getStudents,
    getStudentByID,
    postStudent,
    updateStudent,
    deleteStudent,
};