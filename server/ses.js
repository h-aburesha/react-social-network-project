require("dotenv").config();
const aws = require("aws-sdk");

const { AWS_KEY, AWS_SECRET, AWS_REGION } = process.env;

const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION,
});

const sendEmail = () => {
    ses.sendEmail({
        Source: "Funky Chicken <funky.chicken@spiced.academy>",
        Destination: {
            ToAddresses: ["disco.duck@spiced.academy"],
        },
        Message: {
            Body: {
                Text: {
                    Data: "We can't wait to start working with you! Please arrive on Monday at 9:00 am. Dress code is casual so don't suit up.",
                },
            },
            Subject: {
                Data: "Your Application Has Been Accepted!",
            },
        },
    })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
};

module.exports = { sendEmail };
