"use client";
import SearchBar from "../search/SearchBar";
import CreateDropdown from "../create/CreateDropdown";
import NotificationDropdown from "../notifications/NotificationDropdown";
import CalendarDropdown from "../calendar/CalendarDropdown";
import HelpDropdown from "../help/HelpDropdown";
import UserMenu from "../profile/UserMenu";

import {
 FaBell,
 FaCalendarAlt,
 FaQuestionCircle,
 FaUserCircle,
 FaPlus,
 FaSearch
} from "react-icons/fa";

import "./navbar.css";

export default function Navbar() {
 return (
  <nav className="navbar">

   {/* Logo */}

   <a href="/dashboard" className="logo-section">
    <img src="/images/logo.png" alt="WriTask logo" />
    <span>WriTask</span>
   </a>

   {/* Search */}

   <div className="search-container">
    <FaSearch className="search-icon" />

    <input
     type="text"
     placeholder="Search Projects, Tasks, Members..."
    />
   </div>

   {/* Right Side */}

   <div className="right-section">

    {/* Create */}

    <button className="create-btn">
      <FaPlus />
      Create
    </button>

    {/* Notification */}

    <button className="icon-btn">
      <FaBell />
      <span className="badge">5</span>
    </button>

    {/* Calendar */}

    <button className="icon-btn">
      <FaCalendarAlt />
    </button>

    {/* Help */}

    <button className="icon-btn">
      <FaQuestionCircle />
    </button>

    {/* Profile */}

    <button className="profile-btn">
      <FaUserCircle />
      Admin
    </button>

   </div>

  </nav>
 );
}
