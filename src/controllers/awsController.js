const aws = require('@aws-sdk/client-s3')

const dotEnv = require('dotenv')

dotEnv.config({ path: "./config.env" })

const s3Client = new aws.S3Client(
    {
        credentials: {
            accessKeyId: process.env.s3AccessId,
        secretAccessKey: process.env.s3SecretKey
        },
        region: process.env.s3Region
    } 
)

const uploadFile = async function(file,folder) {
    
    const uploadParams = {
        ACL: "public-read",
        Bucket: process.env.s3Bucket,
        Key: folder + "/" + new Date().getTime()+file.originalname,
        Body: file.buffer,
    }
    const data = s3Client.send(new aws.PutObjectCommand(uploadParams))

    return `https://${uploadParams.Bucket}.s3.ap-south-1.amazonaws.com/${uploadParams.Key}`
}

module.exports.uploadFile = uploadFile