import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import RichEditorToolbar from "./RichEditorToolbar";
import { useForm } from "react-hook-form";
import axios from "axios";


const lowlight = createLowlight(all)

type Props = {
    onPost: () => void;
};

const Editor = ({ onPost }: Props) => {
  //フォームの作成
  const { handleSubmit, setValue } = useForm();
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskItem.configure({ nested: true }),
      TaskList,
      Link.configure({ openOnClick: true }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: "Write something …" }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "textbox",
      },
    },
    //フィールドの登録
    onUpdate: ({ editor }) => {
      //JSONに変換
      const json = editor.getJSON();
      setValue("body", json);
    },
  });

  if (!editor) {
    return null;
  }

  const submit = async (data: any) => {
      const text = JSON.stringify(data)
      try {
          const response = await axios.post("/api/note", {
              text,
          });
          onPost();
          alert(`サーバからのメッセージ: ${response.data.message}`)
      } catch (error) {
          console.error("送信エラー:", error);
          alert("エラーが発生しました");
      }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="editor-wrapper">
          <EditorContent editor={editor} className="editor"/>
          <div className="editor-footer">
            <RichEditorToolbar editor={editor} />
            <button className="submit-button">記録</button>
          </div>
      </div>
    </form>
  );
};
  
export default Editor;