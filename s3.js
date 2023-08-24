const AWS = require('aws-sdk');
const fs = require('fs');
const env = require("dotenv").config();

// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});

const s3 = new AWS.S3();
const bucketName = 'my-test-b2b';
const fileName = 'example.jpg'; // Change this to your image file name

// Read the image file
const fileContent = fs.readFileSync(fileName);

// Set up parameters for S3 upload
const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ACL: 'public-read' // Make the uploaded object publicly accessible
};

// Upload the image
s3.upload(params, (err, data) => {
    if (err) {
        console.error("Error uploading:", err);
    } else {
        const imageUrl = data.Location; // Extract the uploaded image URL
        console.log("Image uploaded successfully. URL:", imageUrl);

        // Now you can use imageUrl to display or share the uploaded image.
    }
});
