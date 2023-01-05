require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env; // add a .env file next to the db.js file with your PostgreSQL credentials
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/socialnetwork`
);

// module.exports.addNewUser = (url, username, title, description) => {
//     return db.query(
//         `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *;`,
//         [url, username, title, description]
//     );
// };
