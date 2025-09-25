import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./NewThread.css";

function NewThread() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/threads",
        { title, body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <Header />
      <div className="new-thread-container">
        <div className="form-group">
          <label htmlFor="title">New title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="button-group">
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-post" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewThread;
