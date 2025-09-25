import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [threads, setThreads] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/threads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setThreads(response.data);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    const getUsernameFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUsername(payload.username);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchThreads();
    getUsernameFromToken();
  }, []);

  return (
    <div>
      <Header username={username} />
      <div className="dashboard-container">
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search..." />
          <Link to="/new-thread">
            <button className="new-title-btn">new title</button>
          </Link>
        </div>
        <ul className="thread-list">
          {threads.map((thread) => (
            <li key={thread.thread_id} className="thread-item">
              <Link to={`/thread/${thread.thread_id}`}>
                <h3>{thread.title}</h3>
                <p>post by: {thread.users.username}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
