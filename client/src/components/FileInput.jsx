import React, { useState, useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";

function FileInput({ onFileChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the selected file in state
    if (onFileChange) {
      onFileChange(file); // Pass the selected file to the parent component
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        className="form-control-file file-input w-full bg-black/25 text-white/40 text-lg"
        onChange={handleFileInputChange}
      />
      <div
        className="form-control-file file-input w-full bg-black/25 text-white/60 hover:text-white flex items-center justify-center font-Inter text-xl"
        onClick={openFileInput}
      >
        <BsFillImageFill size={22} style={{ marginRight: "8px" }} />
        {selectedFile ? selectedFile.name : "Select a file"}
      </div>
    </>
  );
}
export default FileInput; // Export the FileInput component as the default export
