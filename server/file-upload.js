const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");
const aws = require("aws-sdk");
const fs = require("fs");

const diskStorage = multer.diskStorage({
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            // second argument in callback() specifies the file name
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, // file should not exceed 2 MB
    },
});

function fileUpload(req, res, next) {
    const { AWS_KEY, AWS_SECRET, AWS_BUCKET } = process.env;

    const s3 = new aws.S3({
        accessKeyId: AWS_KEY,
        secretAccessKey: AWS_SECRET,
    });

    // console.log("file: ", req.file);
    // console.log("process.env.AWS_BUCKET");
    // console.log("AWS Crap: ", AWS_KEY, AWS_SECRET, AWS_BUCKET);
    if (!req.file) {
        console.log("[socialnetwork:s3] file not there");
        res.statusCode = 400;
        res.send();
    } else {
        const { filename, mimetype, size, path } = req.file;
        const fileContent = fs.readFileSync(path);

        s3.putObject({
            Bucket: AWS_BUCKET,
            ACL: "public-read", // file is publically available and can be read by anyone
            Key: filename, //filename,
            Body: fileContent, // file content
            ContentType: mimetype,
            ContentLength: size,
        })
            .promise()
            .then(() => {
                // We know upload was succesful we save url into `res.locals`
                res.locals.fileUrl = `https://s3.amazonaws.com/${AWS_BUCKET}/${filename}`;
                next();
            })
            .catch((err) => {
                console.log("[socialnetwork:s3] error uploading to s3", err);
                res.sendStatus(500);
            });
    }
}

module.exports = { uploader, fileUpload };
