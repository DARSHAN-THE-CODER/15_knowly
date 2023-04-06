import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Upload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

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
      <h1 className="text-3xl font-bold mb-6">Upload Text File</h1>
      <div className="mb-6">
        <input
          type="file"
          className="bg-gray-100 rounded p-2"
          onChange={handleFileChange}
        />
      </div>
      {file && (
        <div className="mb-6">
          <Document file={file}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
      {text && (
        <div>
          <h2 className="text-xl font-bold mb-2">Text Contents:</h2>
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
