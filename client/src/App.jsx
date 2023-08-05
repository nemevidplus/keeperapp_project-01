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

  useEffect(() => {
    // Fetch data from the server
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5555/notes"); // Make a GET request to the server
        console.log(res); //test
        setAllNotes(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes(); // Call fetchNotes function when component mounts
  }, []);

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
      {AllNotes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
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
