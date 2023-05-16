import { NextRequest } from 'next/server';

export async function POST(req: Request) {
    const data = await req.formData();
    // const { fields, files } = await new Promise<any>((resolve, reject) => {
    //     form.parse(req, (err: Error, fields: any, files: any) => {
    //         if (err) reject(err);
    //         resolve({fields: fields, files: files});
    //     });
    // });


    // console.log("length: ", files.files.length);
    // console.log("files: ", files);
    // console.log(fields);


    console.log(data.get('file'));

    return new Response();
}

export const config = {
    api: { bodyParser: false },
}