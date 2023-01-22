require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env; // add a .env file next to the db.js file with your PostgreSQL credentials
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/socialnetwork`
);

module.exports.getUserDataById = (userId) => {
    return db.query(`SELECT * FROM users WHERE users.id = $1 `, [userId]);
};

module.exports.getAllUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY users.id LIMIT 5`);
};

module.exports.uploadPictureById = (userId, url) => {
    return db.query(
        `UPDATE users SET profilepicurl = $2 WHERE users.id = $1 RETURNING *;`,
        [userId, url]
    );
};

module.exports.updateBio = (userId, bio) => {
    return db.query(
        `UPDATE users SET bio = $2 WHERE users.id = $1 RETURNING *;`,
        [userId, bio]
    );
};

module.exports.addNewUser = (firstname, lastname, email, hashedPWD) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [firstname, lastname, email, hashedPWD]
    );
};

module.exports.addSecretCode = (email, secretCode) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING *;`,
        [email, secretCode]
    );
};

module.exports.getUserByEmail = (email) => {
    return db.query(
        `SELECT email, password, users.id FROM users WHERE email = $1 `,
        [email]
    );
};

module.exports.verifySecretCode = (email) => {
    return db.query(
        `SELECT email, code FROM reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY created_at DESC LIMIT 1;`,
        [email]
    );
};

module.exports.updatePassword = (email, hashedPWD) => {
    return db.query(
        `UPDATE users SET password = $2 WHERE email = $1 RETURNING *;`,
        [email, hashedPWD]
    );
};

module.exports.getMatchingUsers = (val) => {
    return db.query(
        `SELECT * FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1 ORDER BY users.id LIMIT 5;`,
        [val + "%"]
    );
};

module.exports.findFriendshipBetweenTwoIds = (userId, otherUserId) => {
    // console.log("DB user1, user2: ", userId, otherUserId);
    return db.query(
        `SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1);`,
        [userId, otherUserId]
    );
};

module.exports.addFriendship = (sender_id, recipient_id) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *;`,
        [sender_id, recipient_id]
    );
};

module.exports.acceptFriendship = (sender_id, recipient_id) => {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1) RETURNING *;`,
        [sender_id, recipient_id]
    );
};

module.exports.deleteOrCancelFriendship = (userId, otherUserId) => {
    return db.query(
        `DELETE  FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1);`,
        [userId, otherUserId]
    );
};

module.exports.getFriendsAndWannabes = (userId) => {
    return db.query(
        `SELECT * FROM friendships WHERE (sender_id = $1 OR recipient_id = $1) AND accepted = accepted`,
        [userId]
    );
};
