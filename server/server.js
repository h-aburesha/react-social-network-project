const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;
// const { fileUpload, uploader } = require("./file-upload");
const cookieSession = require("cookie-session");
const {
    addNewUser,
    getUserByEmail,
    addSecretCode,
    verifySecretCode,
    updatePassword,
} = require("./db");

const { sendEmail } = require("./ses");
const encrypt = require("./encrypt");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId }); // instead of null. use value from req.session
});

app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        // console.log("req.body", req.body);
        const hashedPWD = await encrypt.hash(password);
        // console.log(hashedPWD);
        const { rows } = await addNewUser(
            firstname,
            lastname,
            email,
            hashedPWD
        );
        console.log(rows[0]);
        req.session.userId = rows[0].id;
        res.json({
            success: true,
            user: rows[0],
        });
    } catch (err) {
        res.json({
            success: false,
        });
        console.log("error in addNewUser", err);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("req.body", req.body);
        const { rows } = await getUserByEmail(email);
        // console.log("db-email-rows: ", rows);
        if (rows[0]) {
            req.session.userId = rows[0].id;
            // console.log("req.session.userId:", req.session.userId);
            const passedTest = await encrypt.compare(
                password,
                rows[0].password
            );
            console.log("passedTest? :", passedTest);
            if (passedTest) {
                res.json({
                    success: true,
                });
                // res.redirect("/");
            } else {
                res.json({
                    success: false,
                });
            }
        }
    } catch (err) {
        console.log("err app.post /login: ", err);
    }
});
app.post("/password/reset/start", async (req, res) => {
    const { email } = req.body;
    console.log("req.body", req.body);
    try {
        const { rows } = await getUserByEmail(email);
        if (rows[0]) {
            // Save a new code and the matching email to the database
            const secretCode = cryptoRandomString({ length: 6 });
            await addSecretCode(email, secretCode);
            console.log(email, secretCode);
            res.json({ success: true });
        } else {
            res.json({ success: false });
            return;
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

app.post("/password/reset/verify", (req, res) => {
    const { code, password, email } = req.body;
    console.log("req.body", req.body);
    verifySecretCode(email).then(({ rows }) => {
        if (rows[0].code === code && rows[0].email === email) {
            console.log("WOHOOOO MATCH! ");
            encrypt
                .hash(password)
                .then((hashedPWD) => {
                    return updatePassword(email, hashedPWD);
                })
                .then(({ rows }) => {
                    console.log("Password Updated in DB", rows);
                    res.json({ success: true });
                });
        } else {
            console.log("Code expired?");
            res.json({ success: false });
        }
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
