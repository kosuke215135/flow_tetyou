import { useState, useEffect } from 'react'
import './App.css'
import NoteList from './components/NoteList';
import axios from 'axios';
import type { Note } from "./types/note";
import Editor from './components/Editor';


function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const res = await axios.get<Note[]>("/api/notes");
    setNotes(res.data);
  }

  useEffect(() =>{
    fetchNotes();
  }, []);

  return (
    <div>
      <Editor onPost={fetchNotes} />
      <NoteList notes={notes} />
    </div>
  )
}

export default App
