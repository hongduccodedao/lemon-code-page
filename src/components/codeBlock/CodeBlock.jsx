import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

const CodeBlock = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
