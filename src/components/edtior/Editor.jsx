import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: true });

const Editor = ({ value, onChange }) => {
  return (
    <div data-color-mode="dark">
      <MDEditor value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
