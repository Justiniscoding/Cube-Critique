const db = require("better-sqlite3")("database.db");

const userExists = db.prepare("SELECT EXISTS (SELECT 1 FROM PEOPLE WHERE wca_id = ?)");

const createUser = db.prepare("INSERT INTO PEOPLE (full_name, nickname, wca_id, comments) VALUES (?, ?, ?, 0)");
// const createComment = db.prepare("");

module.exports = {
    createUser,
    userExists
}