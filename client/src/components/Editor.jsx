import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/styles.css";
import axios from "axios";

function Editor() {
    // Get the id parameter from the URL
    const { id } = useParams();

    // keep the original note as state
    const [originalNote, setOriginalNote] = useState({
        title: "",
        content: ""
    });

    // save the edited note as state
    const [editedNote, setEditedNote] = useState({
        title: "",
        content: ""
    });

    // check the note is edited or not
    const [isChanged, setIsChanged] = useState(false);

    // "useEffect" to fetch data everytime id (2nd parameter) changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send GET request to server with note's id
                const res = await axios.get("http://localhost:5555/notes/" + id);
                setOriginalNote({
                    title: res.data.title,
                    content: res.data.content
                });

                setEditedNote({
                    title: originalNote.title,
                    content: originalNote.content
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id]);

    // Copy original note when it gets data from server
    useEffect(() => {
        setEditedNote({
            title: originalNote.title,
            content: originalNote.content
        });
    }, [originalNote]);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setEditedNote((prevNote) => ({
            ...prevNote,
            [name]: value
        }));

        setIsChanged(true);
    }

    // test to check editedNote onChange
    useEffect(() => {
        console.log(editedNote.title);
        console.log(editedNote.content);
        console.log(isChanged);
    }, [editedNote]);

    // Disregard any changes and rollback to the original note
    function handleCancel(event) {
        setEditedNote({
            ...originalNote
        });

        setIsChanged(false);
    }

    // Access to useNavigate function
    let navigate = useNavigate();

    // Update note according to user's compilation
    async function handleSave(event) {
        // Send PATCH request to server with note's id
        await axios.patch("http://localhost:5555/notes/" + id, editedNote);

        setIsChanged(false);

        navigate("/");
    }


    return <div>
        <Header />
        <h1>Hello</h1>
        <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleOnChange}
        />
        <input
            type="text"
            name="content"
            value={editedNote.content}
            onChange={handleOnChange}
        />
        {isChanged &&
            <div>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>}
        <Footer />
    </div>
}

export default Editor;