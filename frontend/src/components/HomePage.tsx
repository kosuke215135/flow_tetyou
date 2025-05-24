import { useState, useEffect } from 'react'
import NoteList from './NoteList';
import axios from 'axios';
import type { Note } from "../types/note";
import Editor from './Editor';
import type { User } from '../types/user';
import { getUserInfo } from '../services/getUserInfo';

axios.defaults.withCredentials = true



function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const fetchNotes = async () => {
    const user: User = await getUserInfo();
    const res = await axios.get<Note[]>("/api/notes", {params: {userId: user.id}});
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

export default Home
