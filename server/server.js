const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;
// const { fileUpload, uploader } = require("./file-upload");
const cookieSession = require("cookie-session");
const { addNewUser, comparePasswordByEmail } = require("./db");
const { sendEmail } = require("./ses");
const encrypt = require("./encrypt");

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

app.post("/register", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log("req.body", req.body);
    encrypt.hash(password).then((hashedPWD) => {
        console.log(hashedPWD);
        addNewUser(firstname, lastname, email, hashedPWD)
            .then(({ rows }) => {
                console.log(rows[0]);
                req.session.userId = rows[0].id;
                // res.json({
                //     success: true,
                //     user: rows[0],
                // });
            })
            .catch((err) => {
                console.log("error in addNewUser", err);
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    comparePasswordByEmail(email).then(({ rows }) => {
        console.log("db-email-rows: ", rows);
        if (rows[0]) {
            req.session.userId = rows[0].id;
            console.log("req.session.userId:", req.session.userId);
            encrypt
                .compare(password, rows[0].password)
                .then((passedTest) => {
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
                })
                .catch((err) => {
                    console.log("err app.post /login: ", err);
                });
        }
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
