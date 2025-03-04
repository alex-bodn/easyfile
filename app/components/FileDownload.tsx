"use client"

import { useState, useEffect } from "react";

import { FaFolder } from "react-icons/fa";

type FileType = {
    name: string;
    size: number;
    createdAt: string;
};

export default function FileDownload(params: { fileId: string | undefined }) {
    const { fileId } = params;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [file, setFile] = useState<FileType | null>(null);

    useEffect(() => {
        setLoading(true);

        if(!fileId) {
            setError(`Cant find file with ${fileId} id!`);
            setLoading(false)

            return;
        };

        let isMounted = true; 

        const fetchData = async () => {
          try {
            const response = await fetch(`/api/filesInfo/${fileId}`);
              
            const result = await response.json();
            if (!response.ok) throw new Error(result.error ? result.error : `Failed to fetch`);
  
            if (isMounted) {
              setFile(result.data);
              setLoading(false);
            }
          } catch (err) {
            if (isMounted) {
              setError((err as Error).message);
              setLoading(false);
            }
          }
        };
    
        fetchData();
    
        return () => {
          isMounted = false;
        };
    }, [fileId])

    async function handleDownload() {
        const downloadUrl = `${window.location.origin}/api/files/${fileId}`;
        const link = document.createElement("a");
        
        link.href = downloadUrl;
        link.setAttribute("download", "");
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return(
        <div className="flex flex-col items-center justify-center h-[400px] lg:w-1/3 w-full rounded-md shadow-xl">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:bg-blue-200 dark:border-blue-200 "
            >       

                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="flex justify-center items-center  mb-3 text-sm text-gray-500">
                        <FaFolder className="text-blue-500 mr-3 w-12 h-12" />
                        { !loading && file ? (
                             <div className="flex flex-col">
                                <span className="font-semibold text-xl text-blue-500" >File found!</span>
                                <span>File Name: {file?.name}</span>
                                <span>Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                <span>Added at {file?.createdAt}</span>
                            </div>
                        ) : (
                            <div>
                                <span className="font-semibold">Please wait, we searching your file...</span>
                                {error && <p className="text-red-500 text-sm">{error}</p>}    
                            </div>
                        )}                       
                    </div>    
                </div>
            </label>
            { !loading && !error && (
                <button
                onClick={handleDownload}
                disabled={!file}
                className="rounded-full w-40 h-10 mt-10 font-bold bg-blue-500 border-x-blue-600 hover:bg-blue-600 disabled:bg-blue-400"
                >
                   Download
                </button>
            )}
        </div>
    )
}