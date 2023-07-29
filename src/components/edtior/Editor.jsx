import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Editor = ({ value, onChange }) => {
  return (
    <div>
      <MDEditor value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
