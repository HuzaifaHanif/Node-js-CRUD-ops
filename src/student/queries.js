const getStudents = "SELECT * FROM students";
const postStudent = "INSERT INTO students (name , email , age ,DateOfBirth) VALUES ($1 , $2 , $3 , $4) RETURNING *";
const getStudentByID = "SELECT * FROM students WHERE id = $1";
const checkEmailExsists = "SELECT * FROM students WHERE email = $1";
const updateStudent = "UPDATE students SET name = $1 , email = $2 , age =$3 , DateOfBirth = $4 WHERE id = $5 RETURNING *";
const deleteStudent = "DELETE FROM students where id = $1";

module.exports = {
    getStudents,
    getStudentByID,
    postStudent,
    checkEmailExsists,
    updateStudent,
    deleteStudent,
}