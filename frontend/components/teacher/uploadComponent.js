import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadComponent = ({ file, setFile, text, setText, handleSubmit }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      setText(contents);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upload File</h1>
      <div className="mb-6">
        <input
          type="file"
          className="bg-gray-100 rounded p-2"
          onChange={handleFileChange}
        />
      </div>
      <button
        className="px-3 py-1 text-white bg-blue-500 rounded"
        onClick={() => handleSubmit()}
      >
        Upload
      </button>
      {text && (
        <div>
          <h2 className="text-xl font-bold mb-2">Text Contents:</h2>
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
