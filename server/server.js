const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;
const { fileUpload, uploader } = require("./file-upload");
const cookieSession = require("cookie-session");
const { addNewUser } = require("./db");
const { sendEmail } = require("./ses");

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
    res.json({ userId: null }); // instead of null. use value from req.session
});

app.post("/add-formdata", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log("req.body", req.body);

    // encrypt
    //     .hash(password)
    //     .then((hashedPWD) => {
    //         return addNewUser(
    //             firstname,
    //             lastname,
    //             email,
    //             hashedPWD,
    //             fileUrl,
    //             bio
    //         );
    //     })
    //     .then(({ rows }) => {
    //         req.session.user_id = rows[0].id;
    //         res.json({
    //             success: true,
    //             user: rows[0],
    //         });
    //     })
    //     .catch((err) => {
    //         console.log("error in addNewUser", err);
    //     });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
