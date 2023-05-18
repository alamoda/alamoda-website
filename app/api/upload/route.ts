import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req: Request) {
    const data = await req.formData();
    const key = 'image';
    const files = [];

    console.log(data.get('image'));

    console.log(data.getAll('image'));

    for (const [formDataKey, formDataValue] of data.entries()) {
        if (formDataKey === key) {
            files.push(formDataValue);
        }
    }

    console.log(files);

    //const file = data.get('image');
    //console.log(file);

    // if (file instanceof File) {

    //     const fileBuffer = await file.arrayBuffer();
    //     const typedArray = new Uint8Array(fileBuffer);
    //     const body = Buffer.from(typedArray);

    //     const s3Client = new S3Client({
    //         region: 'us-east-1',
    //         credentials: {
    //             accessKeyId: process.env.S3_ACCESS_KEY!,
    //             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    //         }
    //     });

    //     const bucketName = 'alamoda-website';
    //     const key = '347857834873587.jpg';

    //     const response = await s3Client.send(new PutObjectCommand({
    //         Bucket: bucketName,
    //         Key: key,
    //         Body: body,
    //         ContentType: file!.type,
    //         ACL: 'public-read',
    //     }));

    //     console.log('File uploaded successfully:', response);

    //     const link = `https://${bucketName}.s3.amazonaws.com/${key}`;
    //     return new Response(JSON.stringify(link));
    // }

    return new Response(JSON.stringify(files));

}

export const config = {
    api: { bodyParser: false },
}