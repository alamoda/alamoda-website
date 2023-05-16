import multiparty from 'multiparty';

export async function POST(req: any) {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise<any>((resolve, reject) => {
        form.parse(req, (err: Error, fields: any, files: any) => {
            if (err) reject(err);
            resolve({fields: fields, files: files});
        });
    });

    console.log("length: ", files.files.length);
    console.log("files: ", files);
    console.log(fields);

    return new Response();
}

export const config = {
    api: { bodyParser: false },
}