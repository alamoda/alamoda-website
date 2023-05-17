import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

export async function POST(req: Request) {
    const data = await req.formData();
    const file = data.get('image');
    console.log(file);

    if (file instanceof File) {

        const fileBuffer = await file.arrayBuffer();
        const typedArray = new Uint8Array(fileBuffer);
        const body = Buffer.from(typedArray);

        const s3Client = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            }
        });

        const bucketName = 'alamoda-website';
        const key = 'images/my-image.jpg';

        try {
            const response = await s3Client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: body,
                ContentType: file!.type,
                ACL: 'public-read',
            }));
            console.log('File uploaded successfully:', response);
            const link = `https://${bucketName}.s3.amazonaws.com/${file.name}`;
            
            return new Response(link);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    return new Response();
}

export const config = {
    api: { bodyParser: false },
}