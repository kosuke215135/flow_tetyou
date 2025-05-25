import { useState, useEffect } from 'react'
import NoteList from './NoteList';
import axios from 'axios';
import type { Note } from "../types/note";
import Editor from './Editor';
import type { User } from '../types/user';
import { getUserInfo } from '../services/getAuthInfo';
import Header from './Header';

axios.defaults.withCredentials = true
// バックエンドAPIのベースURL


function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  // ノートの取得を行う
  const fetchNotes = async () => {
    const user: User = await getUserInfo();
    const res = await axios.get<Note[]>("/api/notes", {params: {userId: user.id}});
    setNotes(res.data);
  };

  useEffect(() =>{
    fetchNotes();
  }, []);

  return (
    <div className='main-content-area'>
      <Header />
      <Editor onPost={fetchNotes} />
      <NoteList notes={notes} />
    </div>
  )
}

export default Home
