import React, { useCallback } from "react";
import "trix/dist/trix";
import "trix/dist/trix.css";
import "tributejs/tribute.css";
import Tribute from "tributejs";

function TextEditor({ setDescription }) {
  const textEditor = React.useRef(null);
  const tribute = React.useRef(null);

  const onChange = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  React.useEffect(() => {
    const currentEditor = textEditor.current;
    tribute.current = new Tribute({
      values: [
        { key: "schniz", value: "Gal Schlezinger" },
        { key: "deanshub", value: "Dean Shub" },
      ],
    });
    tribute.current.attach(currentEditor);
    currentEditor?.addEventListener("trix-change", onChange);
    return () => {
      currentEditor?.removeEventListener("trix-change", onChange);
    };
  }, [onChange]);

  return <trix-editor placeholder="Job Description" ref={textEditor} />;
}

export default TextEditor;
