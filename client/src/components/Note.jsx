import React, { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function Note(props) {

  async function handleDeleteNote() {

    try {
      // Send DELETE request to server with note's id
      const res = await axios.delete("http://localhost:5555/notes/" + props.id);

      console.log(res.data);

      /* Update state in App component to exclude deleted note */
      // This is WRONG solution to achieve above because setAllNotes function is immediately called
      // without waiting update of database.This behavior cause error along with map function in App.jsx
      // props.setAllNotes(res.data.data);
      // This is CORRECT solution
      props.setAllNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== props.id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDeleteNote}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
