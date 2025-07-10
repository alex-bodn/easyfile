'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const t = useTranslations('Page');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage('');
    setError(null);
    setFileUrl(null);

    const formData = new FormData();

    try {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 10) {
        setError('File is too large. Maximum size allowed is 10MB.');
        return;
      }

      formData.append('file', file);

      const res = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();

      if (!data.fileId) throw new Error('Invalid response while upload file');

      setFileUrl(`${window.location.origin}/${data.fileId}`);
      setFile(null);

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setError(`${error}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = async () => {
    if (fileUrl) {
      navigator.clipboard.writeText(fileUrl);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-[400px] lg:w-1/2 xl:w-1/3 w-full rounded-md shadow-xl dark:bg-gray-800"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 dark:bg-gray-600 dark:border-gray-900 dark:hover:border-gray-950 dark:hover:bg-gray-700"
      >
        {!file && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-blue-400 dark:text-blue-200">
            <svg
              className="w-8 h-8 mb-4 text-blue-200 dark:text-blue-400"
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
            <p className="mb-2 text-sm">
              <span className="font-semibold">{t('UploadAction')}</span>
            </p>
            <p className="text-xs">ANY TYPE (MAX. 10MB)</p>
          </div>
        )}

        {file && (
          <div>
            <p className="text-sm text-center font-semibold text-blue-500">
              {`You selected file! NAME: ${file.name} TYPE: ${
                file.type
              } SIZE: ${(file.size / (1024 * 1024)).toFixed(2)} MB`}
            </p>
            <p className="text-xs text-center text-gray-400">
              {t('NewFileAction')}
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="rounded-full w-40 h-10 mt-10 font-bold bg-blue-500 border-x-blue-600 hover:bg-blue-600 disabled:bg-blue-400 dark:bg-gray-700 dark:disabled:bg-gray-900"
      >
        {uploading ? `${t('UploadBtn')}...` : `${t('UploadBtn')}`}
      </button>
      {message && (
        <p className="text-center font-mono text-gray-500">{message}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      {fileUrl && (
        <div className="w-full mt-4 p-3">
          <p className="text-blue-300 text-center text-sm">
            {t('Download')} URL:
          </p>
          <div className="flex items-center mt-1">
            <div
              onClick={() => window.open(fileUrl, '_blank')}
              className="flex w-full justify-center px-2 py-1 text-gray-500 border rounded-lg hover:underline cursor-pointer duration-150 transition-all overflow-hidden"
            >
              {fileUrl}
            </div>
            <button
              onClick={handleCopy}
              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-950 duration-150 transition-all"
            >
              {t('Copy')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
