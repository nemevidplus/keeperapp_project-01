import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/styles.css";

function Editor() {
    // Get the id parameter from the URL
    const { id } = useParams();

    return <div>
        <Header />
        <h1>Hello</h1>
        <p>{id}</p>
        <Footer />
    </div>
}

export default Editor;