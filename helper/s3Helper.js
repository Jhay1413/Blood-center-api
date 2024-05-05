// s3Helper.js
const S3 = require('aws-sdk/clients/s3');

function createS3Client() {
  const s3Client = new S3({
    forcePathStyle: false,
    endpoint: process.env.BUCKET_ENDPOINT,
    region: "SGP1",
    credentials: {
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_PRIVATE_KEY
    }
  });

  return s3Client;
}

module.exports = createS3Client;