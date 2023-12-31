import { Chat, Notifications, Search } from "@mui/icons-material";
import React from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../state/AuthContext";
import Logout from "../../pages/logout/Logout";

const Topbar = () => {
  const { user } = useAuth();
  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <span className="logo">Real SNS</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : `${PUBLIC_FOLDER}/person/noAvatar.png`
              }
              className="topbarImg"
            ></img>
          </Link>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default Topbar;
