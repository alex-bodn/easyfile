"use client"

import { useState, useRef, useEffect } from "react";

export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if(selectedFile) {
            setFile(selectedFile);
        }
    }

    const handleUpload = async () => {
        if(!file) return;
        setUploading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`/upload`, {
                method: "POST",
                body: formData
            });

            if(!res.ok) throw new Error("Upload failed!");

            setMessage("File upload successfully!");
            setFile(null);

            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            setMessage("File upload failed!")
        } finally {
            setUploading(false);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center h-[400px] lg:w-1/3 w-full h-44 rounded-md shadow-xl">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:bg-blue-200 hover:bg-blue-100 dark:border-blue-200 dark:hover:border-blue-500 dark:hover:bg-blue-300"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                    className="w-8 h-8 mb-4 text-blue-200 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                </svg>
                <p className="mb-2 text-sm text-blue-500 dark:text-blue-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-blue-500 dark:text-blue-400">
                    ANY TYPE (MAX. 10MB)
                </p>
                
                {file && (
                <p className="text-sm text-blue-500 dark:text-blue-400">
                    {`You selected file! NAME: ${file.name} TYPE: ${file.type} SIZE: ${(
                    file.size / (1024 * 1024)
                    ).toFixed(2)} MB`}
                </p>
                )}
                
                </div>
                <input
                    ref = {fileInputRef}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="rounded-full w-40 h-10 mt-10 font-bold bg-blue-500 border-x-blue-600 hover:bg-blue-600 disabled:bg-blue-400"
            >
                { uploading ? "Uploading..." : "Upload" }
            </button>
            {message && <p className="text-center font-mono text-gray-500">{message}</p>}
        </div>
    )
}