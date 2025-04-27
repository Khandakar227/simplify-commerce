"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Tiptap = ({onContentChange}:{onContentChange:(data:string)=>void}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
        const htmlContent = editor.getHTML();
        onContentChange(htmlContent);
      },
  });

  useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  return (
    <div className="w-full">
      {/* Toolbar */}
      {editor && (
        <div className="flex flex-wrap justify-center items-center gap-2 toolbar bg-white bg-opacity-15 rounded-t-md py-1">
          <button
            className="font-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            style={{ marginRight: "5px" }}
          >
            B
          </button>
          <button
            className="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            style={{ marginRight: "5px" }}
          >
            I
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            style={{ marginRight: "5px" }}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            style={{ marginRight: "5px" }}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            style={{ marginRight: "5px" }}
          >
            p
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            style={{ marginRight: "5px" }}
          >↩</button>
          <button onClick={() => editor.chain().focus().redo().run()}>↪</button>
        </div>
      )}
      <div className="w-full bg-white rounded-b-md">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
