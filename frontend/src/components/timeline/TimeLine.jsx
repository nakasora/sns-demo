import React, { useEffect, useState } from "react";
import "./TimeLine.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { useAuth } from "../../../state/AuthContext";

const TimeLine = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchPost = async () => {
      const response = username
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get(`/api/posts/timeline/${user._id}`);
      setPosts(response.data);
    };
    fetchPost();
  }, [username, user._id]);
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
