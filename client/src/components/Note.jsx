import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import Editor from "./Editor";

function Note(props) {
  // For popup with MUI
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // Function to remove a note from database
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
      <Button>
        <EditNoteIcon />
      </Button>
      <Button onClick={handleClickOpen('paper')} >
        <VisibilityIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Note;
