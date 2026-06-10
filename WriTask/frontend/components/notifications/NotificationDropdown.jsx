"use client";

import "./notification.css";

export default function NotificationDropdown(){

 return(

  <div className="notification-box">

   <h3>Notifications</h3>

   <div className="notification-item">
      Task Assigned
   </div>

   <div className="notification-item">
      Project Updated
   </div>

   <div className="notification-item">
      Due Date Reminder
   </div>

   <button>
      View All
   </button>

  </div>

 )
}