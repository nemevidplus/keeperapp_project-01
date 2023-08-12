import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupButton from "./PopupButton";

function Note(props) {
  // Function to remove a note from database
  async function handleDeleteNote() {
    try {
      // Send DELETE request to server with note's id
      const res = await axios.delete(process.env.REACT_APP_BASE_URL + props.id);

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

  // Access to useNavigate function
  let navigate = useNavigate();
  // Function to redirect to "Editor" page
  function routeChange() {
    let path = "/notes/edit/" + props.id;
    navigate(path);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDeleteNote}>
        <DeleteIcon />
      </button>
      <Button onClick={routeChange}>
        <EditNoteIcon />
      </Button>
      <PopupButton
        title={props.title}
        content={props.content} />
    </div>
  );
}

export default Note;
