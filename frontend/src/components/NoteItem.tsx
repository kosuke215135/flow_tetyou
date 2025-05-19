import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';

const lowlight = createLowlight(all)


type PostItemProps = {
    content: string;
    created_at: string;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0からスタートするので+1する
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

const NoteItem = ({content, created_at}: PostItemProps) => {
    const parsed = JSON.parse(content)
    const editor = useEditor({
        extensions: [
          StarterKit.configure({ codeBlock: false }),
          TaskItem.configure({ nested: true }),
          TaskList,
          Link.configure({ openOnClick: true }),
          CodeBlockLowlight.configure({ lowlight }),
          Placeholder.configure({ placeholder: "Write something …" }),
        ],
        content: parsed.body,
        editable: false,
        editorProps: {
          attributes: {
            class: "note",
          },
        },
    });

    if (!editor) return null;
      

  return (
    <div>
        {formatDate(new Date(created_at))}
        <EditorContent editor={editor} />
    </div>
  );
};

export default NoteItem;