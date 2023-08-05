import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  function handleInput(event) {

    const { name, value } = event.target;

    if (name === "title") {
      setNote((prevValue) => ({
        title: value,
        content: prevValue.content
      }));
    } else if (name === "content") {
      setNote((prevValue) => ({
        title: prevValue.title,
        content: value
      }));
    }
  }

  function handleClick() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleInput}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={note.content}
          onChange={handleInput}
          onClick={handleClick}
        />
        <Zoom in={isExpanded}>
          <Fab
            onClick={(event) => {
              props.addNote(note);
              setNote({ title: "", content: "" });
              event.preventDefault();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
