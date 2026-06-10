"use client";

import Link from "next/link";
import { useState } from "react";

import {
 FaTachometerAlt,
 FaInbox,
 FaTasks,
 FaUsers,
 FaCalendarAlt,
 FaChartBar,
 FaFileAlt,
 FaHistory,
 FaCog,
 FaProjectDiagram,
 FaChevronDown,
 FaChevronRight
} from "react-icons/fa";

export default function Sidebar() {

 const [projectOpen, setProjectOpen] = useState(false);

 return (
  <aside className="sidebar">

   <div className="logo-section">
      <h2>TaskFlow</h2>
   </div>

   <ul>

      <li>
        <Link href="/dashboard">
          <FaTachometerAlt />
          Dashboard
        </Link>
      </li>

      <li>
        <Link href="/inbox">
          <FaInbox />
          Inbox
        </Link>
      </li>

      <li>
        <Link href="/workload">
          <FaTasks />
          Workload
        </Link>
      </li>

      {/* Project Module */}

      <li
        className="submenu-title"
        onClick={() => setProjectOpen(!projectOpen)}
      >
         <div>
           <FaProjectDiagram />
           Projects
         </div>

         {projectOpen ? <FaChevronDown /> : <FaChevronRight />}
      </li>

      {projectOpen && (

      <ul className="submenu">

        <li>
          <Link href="/projects">
            Project List
          </Link>
        </li>

        <li>
          <Link href="/projects/create">
            Create Project
          </Link>
        </li>

        <li>
          <Link href="/projects/timeline">
            Project Timeline
          </Link>
        </li>

        <li>
          <Link href="/projects/members">
            Project Members
          </Link>
        </li>

        <li>
          <Link href="/projects/active">
            Active Projects
          </Link>
        </li>

        <li>
          <Link href="/projects/completed">
            Completed Projects
          </Link>
        </li>

        <li>
          <Link href="/projects/archive">
            Archived Projects
          </Link>
        </li>

      </ul>

      )}

      <li>
        <Link href="/tasks">
          <FaTasks />
          Tasks
        </Link>
      </li>

      <li>
        <Link href="/teams">
          <FaUsers />
          Teams
        </Link>
      </li>

      <li>
        <Link href="/calendar">
          <FaCalendarAlt />
          Calendar
        </Link>
      </li>

      <li>
        <Link href="/reports">
          <FaChartBar />
          Reports
        </Link>
      </li>

      <li>
        <Link href="/documents">
          <FaFileAlt />
          Documents
        </Link>
      </li>

      <li>
        <Link href="/activity">
          <FaHistory />
          Activity
        </Link>
      </li>

      <li>
        <Link href="/admin">
          <FaCog />
          Administration
        </Link>
      </li>

   </ul>

  </aside>
 );
}