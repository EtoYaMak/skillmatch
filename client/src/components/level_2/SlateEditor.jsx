// Import React dependencies.
import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

function SlateEditor() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  return (
    // Add the editable component inside the context.
    <Slate editor={editor} initialValue={initialValue}>
      <Editable />
    </Slate>
  );
}

export default SlateEditor;
