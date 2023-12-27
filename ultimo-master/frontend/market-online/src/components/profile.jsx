import React from "react";
import { LuLogOut } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Profile({ user, onClose, onLogout }) {
  return (
    <div className="profile-window">
      <button className="close" onClick={onClose}><IoCloseSharp/></button>
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
      <button onClick={onLogout}><Link to="/" style={{ textDecoration: 'none', color: 'red',  }}><LuLogOut/>Logout</Link></button>
    </div>
  );
}
