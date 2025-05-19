import type { Note } from '../types/note';
import NoteItem from './NoteItem';


type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  return (
    <div>
      <h2>Notes</h2>
        {notes.slice().reverse().map((note) => (
          <NoteItem key={note.id} content={note.text} created_at={note.created_at} />
        ))}
    </div>
  );
};

export default NoteList;