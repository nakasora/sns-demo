import React from "react";
import { Users } from "../../DummyData";

const CloseFriend = ({ user }) => {
  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img
        src={PUBLIC_FOLDER + user.profilePicture}
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
