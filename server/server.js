const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;
const { sendEmail } = require("./ses");
const encrypt = require("./encrypt");
const cryptoRandomString = require("crypto-random-string");
const { fileUpload, uploader } = require("./file-upload");
const cookieSession = require("cookie-session");

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

const {
    addNewUser,
    getUserByEmail,
    addSecretCode,
    verifySecretCode,
    updatePassword,
    getUserDataById,
    uploadPictureById,
    updateBio,
    getAllUsers,
    getMatchingUsers,
    findFriendshipBetweenTwoIds,
    addFriendship,
    acceptFriendship,
    deleteOrCancelFriendship,
    getFriendsAndWannabes,
} = require("./db");

/* ------------------------
        SOCKET.IO
-------------------------- */

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

io.on("connection", function (socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on("disconnect", function () {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on("thanks", function (data) {
        console.log(data);
    });

    socket.emit("thanks-back", {
        message: "Thanks back to you!! ",
    });

    socket.emit("welcome", {
        message: "Welome. It is nice to see you",
    });
});

/* ------------------------*/

app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});

app.get("/user", async (req, res) => {
    try {
        const { userId } = req.session;
        const { rows } = await getUserDataById(userId);
        res.json({
            success: true,
            user: rows[0],
        });
    } catch (error) {
        console.log("err get('/user'): ", error);
        res.json({
            success: false,
        });
    }
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
        // console.log(rows[0]);
        req.session.userId = rows[0].id;
        res.json({
            success: true,
            user: rows[0],
        });
    } catch (err) {
        res.json({
            success: false,
        });
        console.log("err post(/register): ", err);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { rows } = await getUserByEmail(email);
        if (rows[0]) {
            req.session.userId = rows[0].id;
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
        console.log("err post(/login): ", err);
    }
});

app.post("/logout", async (req, res) => {
    try {
        req.session.userId = null;
        // res.redirect("/");

        res.json({
            success: true,
        });
    } catch (err) {
        console.log("err post(/login): ", err);
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
        console.error("err post(/password/reset/start): ", error);
        res.json({ success: false });
    }
});

app.post("/password/reset/verify", (req, res) => {
    const { code, password, email } = req.body;
    console.log("req.body", req.body);
    verifySecretCode(email)
        .then(({ rows }) => {
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
                console.log("Code probably expired?");
                res.json({ success: false });
            }
        })
        .catch((error) =>
            console.log("err post(/password/reset/verify):", error)
        );
});

app.post(
    "/upload-profile-pic",
    uploader.single("file"),
    fileUpload,
    (req, res) => {
        if (!req.file) {
            res.json({
                success: false,
            });
            return;
        }
        const { fileUrl } = res.locals;
        const { userId } = req.body;
        uploadPictureById(userId, fileUrl).then(({ rows }) => {
            res.json({
                success: true,
                user: rows[0],
            });
        });
    }
);

app.post("/update-bio", async (req, res) => {
    try {
        const { bio, userId } = req.body;
        const { rows } = await updateBio(userId, bio);
        res.json({
            success: true,
            user: rows[0],
        });
    } catch (error) {
        console.log("err post('/update-bio'): ", error);
        res.json({
            success: false,
        });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        // const { userId } = req.session; // Helpful maybe?
        getAllUsers().then(({ rows }) => {
            res.json({
                success: true,
                users: rows, // ---> OPTIMIZE LATER <--- //
            });
        });
    } catch (error) {
        console.log("err get('/users'): ", error);
        res.json({
            success: false,
        });
    }
});

app.get("/api/users/search", async (req, res) => {
    try {
        const { name } = req.query;
        getMatchingUsers(name).then(({ rows }) => {
            // console.log(rows);
            res.json({
                success: true,
                users: rows,
            });
        });
    } catch (error) {
        console.log("err get('/users/search'): ", error);
        res.json({
            success: false,
        });
    }
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        getUserDataById(id).then(({ rows }) => {
            // console.log(rows);
            res.json({
                success: true,
                user: rows[0],
            });
        });
        // console.log(":id ", id);
    } catch (error) {
        console.log("error in /api/user/:id ", error);
    }
});

app.get("/api/friend-request/:otherUserId", async (req, res) => {
    try {
        let friendshipStatus;
        const addFriendText = "Add Friend";
        const cancelRequestText = "Cancel Request";
        const pendingRequestText = "Pending Friendship";
        const unfriendText = "Unfriend";

        const { otherUserId } = req.params;
        const { userId } = req.session;
        const { rows } = await findFriendshipBetweenTwoIds(userId, otherUserId);
        // console.log("friendship !rows[0]: ", rows);
        if (!rows.length) {
            friendshipStatus = addFriendText;
            // console.log("friendship !rows[0]: ", rows);
        } else if (!rows[0].accepted && rows[0].sender_id === userId) {
            friendshipStatus = cancelRequestText;
        } else if (!rows[0].accepted && rows[0].recipient_id === userId) {
            friendshipStatus = pendingRequestText;
        } else if (rows[0].accepted) {
            friendshipStatus = unfriendText;
        }
        return res.json({ friendshipStatus });
    } catch (error) {
        console.log("error in friend-request: ", error);
    }
});

app.post("/api/update-friendship", async (req, res) => {
    try {
        const addFriendText = "Add Friend";
        const cancelRequestText = "Cancel Request";
        const pendingRequestText = "Pending Friendship";
        const unfriendText = "Unfriend";

        const { otherUserId, buttonText } = req.body;
        const { userId } = req.session;

        console.log(
            "otherUserId: ",
            otherUserId,
            "userId: ",
            userId,
            "buttonText: ",
            buttonText
        );
        if (buttonText === cancelRequestText || buttonText === unfriendText) {
            deleteOrCancelFriendship(userId, otherUserId);
            console.log("Unfriend or Cancel Requested from Client");
            res.json({ buttonText: addFriendText });
        }
        if (buttonText === pendingRequestText) {
            acceptFriendship(userId, otherUserId);
            console.log("Friendship Accepted");
            res.json({ buttonText: unfriendText });
        }
        if (buttonText === addFriendText) {
            addFriendship(userId, otherUserId);
            console.log("Friendship Requested from userId:", userId);
            res.json({ buttonText: cancelRequestText });
        }
    } catch (error) {
        console.log("error in findFriendship: ", error);
    }
});

app.get("/api/friends", async (req, res) => {
    try {
        const { userId } = req.session;
        const { rows } = await getFriendsAndWannabes(userId);
        // console.log("api/friends rows: ", rows);
        res.json({
            success: true,
            friendships: rows,
        });
    } catch (error) {
        console.log("err get('/friends'): ", error);
        res.json({
            success: false,
        });
    }
});

app.post("/api/friends", async (req, res) => {
    try {
        const { sender_id, recipient_id, accepted } = req.body;
        if (accepted) {
            const { rows } = await acceptFriendship(sender_id, recipient_id);
            res.json({
                success: true,
                friendships: rows,
            });
        } else if (!accepted) {
            const { rows } = await deleteOrCancelFriendship(
                sender_id,
                recipient_id
            );
            res.json({
                success: true,
                friendships: rows,
            });
        }
    } catch (error) {
        console.log("err post('/friends'): ", error);
        res.json({
            success: false,
        });
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
