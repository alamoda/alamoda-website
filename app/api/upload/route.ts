import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req: Request) {
    const data = await req.formData();
    const files = data.getAll('image');
    const links = [];
    //console.log("files in backend are", files)
    for (const file of files) {
        //console.log("file is ", file);

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
            const ext = file.name.split('.').pop();
            const newFilename = Date.now() + '.' + ext;

            const response = await s3Client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: newFilename,
                Body: body,
                ContentType: file!.type,
                ACL: 'public-read',
            }));

            //console.log('File uploaded successfully:', response);

            const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
            links.push(link);
        }
    }

    return new Response(JSON.stringify(links));
}

export const config = {
    api: { bodyParser: false },
}