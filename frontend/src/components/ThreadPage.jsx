import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ThreadPage.css";
import Header from "./Header";

const ThreadPage = () => {
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyValue, setReplyValue] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/threads/${id}`);
        setThread(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchThread();
  }, [id]);

  const handleReply = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/threads/${id}/replies`,
        {
          body: replyValue,
          parent_id: replyTo,
        },
      );
      setThread(res.data);
      setReplyValue("");
      setReplyTo(null);
    } catch (err) {
      console.error(err);
    }
  };

  const renderReplies = (replies, parentId) => {
    return replies
      .filter((reply) => reply.parent_id === parentId)
      .map((reply) => (
        <div
          key={reply.replie_id}
          className={`comment ${parentId ? "nested" : ""}`}
        >
          <span className="comment-user">{reply.users.username}:</span>
          <span className="comment-text">{reply.body}</span>
          <span
            className="reply-link"
            onClick={() => setReplyTo(reply.replie_id)}
          >
            [reply]
          </span>
          {replyTo === reply.replie_id && (
            <div className="reply-box">
              <input
                type="text"
                className="reply-input"
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
              />
              <button onClick={handleReply}>Submit</button>
              <button onClick={() => setReplyTo(null)}>Cancel</button>
            </div>
          )}
          {renderReplies(thread.replies, reply.replie_id)}
        </div>
      ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!thread) {
    return <div>Thread not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="thread-container">
        <div className="thread-title">{thread.title}</div>
        <div className="thread-content-box">{thread.body}</div>
        <div className="reply-section">
          <div className="reply-box">
            <span className="reply-label">Reply</span>
            <input
              type="text"
              className="reply-input"
              value={replyValue}
              onChange={(e) => setReplyValue(e.target.value)}
            />
            <button onClick={handleReply}>Submit</button>
          </div>
        </div>
        <div className="comments-section">
          {renderReplies(thread.replies, null)}
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
