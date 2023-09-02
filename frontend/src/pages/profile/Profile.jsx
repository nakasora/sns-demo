import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TimeLine from "../../components/timeline/TimeLine";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, []);
  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"}
                className="profileCoverImg"
              />
              <img
                src={
                  PUBLIC_FOLDER + user.profilePicture ||
                  PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
