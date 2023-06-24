'use client'

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Page() {
    const [loadingContent, setLoadingContent] = useState(true);
    const [content, setContent] = useState(null);

    const shareOnFacebook = () => {
        const url = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href;
        window.open(url, '_blank');
    };

    const shareOnTwitter = () => {
        const url = "http://twitter.com/share?text=" + "title" + "&url=" + window.location.href;
        window.open(url, '_blank');
    };

    const shareOnLinkedin = () => {
        const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + window.location.href;
        window.open(url, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    useEffect(() => {
        axios.get('/blog-content/' + "blogid")
            .then(function (response) {
                setContent(response.data);
                setLoadingContent(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <>
            <header className="text-center">
                <p className="mb-4 text-gray-600 text-sm">
                    6/24/2023
                </p>
                <h1 className="font-bold text-6xl font-title text-gray-900">
                    Title
                </h1>
                <p className="mt-10 text-xl text-gray-800">Subtitle</p>
                <p className="mt-10 text-gray-600">By Author</p>
            </header>

            <div className="mt-8 flex justify-center">
                <button onClick={shareOnFacebook}
                    className="px-2 py-1 flex items-center rounded-md border border-gray-400 hover:bg-gray-200 group mr-2">
                    <svg className="h-4 w-4 text-gray-600 mr-2 group-hover:text-blue-500" fill="currentColor"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z">
                        </path>
                    </svg>
                    <span className="text-sm group-hover:text-blue-500">Share</span>
                </button>
                <button onClick={shareOnTwitter}
                    className="px-2 py-1 flex items-center rounded-md border border-gray-400 hover:bg-gray-200 group mr-2">
                    <svg className="h-4 w-4 text-gray-600 mr-2 group-hover:text-blue-500" fill="currentColor"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                        </path>
                    </svg>
                    <span className="text-sm group-hover:text-blue-500">Tweet</span>
                </button >
                <button onClick={shareOnLinkedin}
                    className="px-2 py-1 flex items-center rounded-md border border-gray-400 hover:bg-gray-200 group mr-2" >
                    <svg className="h-4 w-4 text-gray-600 mr-2 group-hover:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                    <span className="text-sm group-hover:text-blue-500">Share</span>
                </button >
                <button onClick={copyLink}
                    className="px-2 py-1 flex items-center rounded-md border border-gray-400 hover:bg-gray-200 group mr-2" >
                    <svg className="h-4 w-4 text-gray-600 mr-2 group-hover:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                        <path
                            d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                    </svg>
                    <span className="text-sm group-hover:text-blue-500">Copy link</span>
                </button >
            </div >

            <hr className="my-8" />

            {!loadingContent ?
                <article className="max-w-[800px] mx-auto prose prose-video:m-0 prose-lg prose-headings:font-normal prose-code:after:content-[''] prose-code:before:content-[''] prose-figcaption:text-center prose-figcaption:italic prose-figcaption:text-sm prose-li:marker:text-black">
                    <Image
                        className="w-full"
                        alt="blog.title"
                        src="/men.jpg"
                        width={1000}
                        height={1000}
                    />
                    <div></div>
                </article>
                :
                <div className="w-full flex justify-center">
                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </>

    )
}