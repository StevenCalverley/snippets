"use client";

import { startTransition, useState } from "react";
import Editor from "@monaco-editor/react";
import * as actions from "@/actions";

import type { Snippet } from "@/db/prisma/client";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const handleClick = () => {
    startTransition(async () => {
      await actions.editSnippet(snippet.id, code);
    });
  };

  //   const editSnippetAction = actions.editSnippet.bind(null, snippet.id, snippet.code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />

      <button className="p-2 border rounded" onClick={handleClick}>
        Save
      </button>
    </div>
  );
}
