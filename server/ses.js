require("dotenv").config();
const aws = require("aws-sdk");

const { AWS_KEY, AWS_SECRET, AWS_REGION } = process.env;

const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION,
});

const sendEmail = (email) => {
    ses.sendEmail({
        Source: " Berry from Jam <sweltering.sweatshirt@spicedling.email> ",
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: {
                    Data: "Please click the following link to reset your password: ",
                },
            },
            Subject: {
                Data: "Password Reset Instructions",
            },
        },
    })
        .promise()
        .then(() => console.log("Email sent!!"))
        .catch((err) => console.log(err));
};

module.exports = { sendEmail };
