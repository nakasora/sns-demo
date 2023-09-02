import React from "react";

const Online = ({ user }) => {
  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={PUBLIC_FOLDER + user.profilePicture}
          className="rightbarProfileImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
