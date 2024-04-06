const db = require("better-sqlite3")("database.db");

// const isInDatabase = db.prepare("")

const createUser = db.prepare("INSERT INTO PEOPLE (full_name, nickname, wca_id) VALUES (?, ?, ?)");

module.exports = {
    createUser,

}