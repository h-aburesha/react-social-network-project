require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env; // add a .env file next to the db.js file with your PostgreSQL credentials
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/socialnetwork`
);

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
        `SELECT email, code FROM reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' ORDER BY created_at DESC LIMIT 1;;`,
        [email]
    );
};

module.exports.updatePassword = (email, hashedPWD) => {
    return db.query(
        `UPDATE users SET password = $2 WHERE email = $1 RETURNING *;`,
        [email, hashedPWD]
    );
};

//SELECT * FROM reset_codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';

// module.exports.getImgById = (id) => {
//     return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
// };

// module.exports.getAllImg = () => {
//     return db.query(`
//     SELECT * FROM images
//     ORDER BY id ASC
//     `);
// };

// module.exports.getMoreImages = (lastImgId) => {
//     return db.query(
//         `
//     SELECT id, title, url, (
//         SELECT id FROM images
//         ORDER BY id ASC
//         LIMIT 1
//     ) AS "lowestId" FROM images
//     WHERE id > $1
//     ORDER BY id DESC
//     LIMIT 5;
//     `,
//         [lastImgId]
//     );
// };

// module.exports.addImg = (url, username, title, description) => {
//     return db.query(
//         `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *;`,
//         [url, username, title, description]
//     );
// };

// module.exports.addComment = (comment, username, image_id) => {
//     return db.query(
//         `INSERT INTO comments (comment, username, image_id) VALUES ($1, $2, $3) RETURNING *;`,
//         [comment, username, image_id]
//     );
// };

// module.exports.getAllComments = (image_id) => {
//     return db.query(
//         `
//     SELECT * FROM comments WHERE image_id = $1
//     ORDER BY created_at DESC;
//     `,
//         [image_id]
//     );
// };

// module.exports.addLikes = (imageId) => {
//     return db.query(
//         `
//         UPDATE images
//         SET likes = likes + 1
//         WHERE id = $1
//         RETURNING *;`,
//         [imageId]
//     );
// };
