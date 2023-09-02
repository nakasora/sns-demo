import React, { useEffect, useState } from "react";
import "./Post.css";
import { Factory, MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../../state/AuthContext";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useAuth();
  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users/?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);
  const handleLike = async () => {
    try {
      await axios.put(`/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PUBLIC_FOLDER + post.img} className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PUBLIC_FOLDER + "/heart.png"}
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">{like}がいい値を押しました</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
