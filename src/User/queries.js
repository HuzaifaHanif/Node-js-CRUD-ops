const registeringUser = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
const getUser = "SELECT * FROM users WHERE email = $1";

module.exports = {
    registeringUser,
    getUser,
}