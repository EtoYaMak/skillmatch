import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css"; // Import the ReactQuill styles

const DisplayHTML = ({ content }) => {
  const editorModules = {
    toolbar: false, // Disable the toolbar
  };

  const editorFormats = [];
  const quillStyles = {
    border: "none",
    outline: "none",
    fontSize: "1.25rem",
    lineHeight: "1.6",
  };

  return (
    <div className="container bg-transparent mx-auto mt-8">
      {/* Use Tailwind CSS classes to style the container */}
      <div className="bg-transparent p-1 rounded-lg">
        <ReactQuill
          value={content}
          readOnly={true} // Set readOnly to true to disable user interaction
          modules={editorModules}
          formats={editorFormats}
          style={quillStyles}
        />
      </div>
    </div>
  );
};

export default DisplayHTML;
