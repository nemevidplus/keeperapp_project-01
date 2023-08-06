import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";

const root = ReactDOM.createRoot(document.getElementById("root"));

// BrowserRouter enables client-side routing for 'App' component
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/notes/edit/:id" element={<Editor />} />
        </Routes>
    </BrowserRouter>
);

