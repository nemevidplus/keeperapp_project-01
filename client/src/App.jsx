import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import axios from "axios";
// In the future, if you'll have multiple pages, you can use below
// import { Router, Routes, Route } from "react-router-dom";

function App() {
  const [AllNotes, setAllNotes] = useState([]);

  function addNote(newNote) {
    setAllNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setAllNotes(AllNotes.filter((note, index) => index !== id));
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {AllNotes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
