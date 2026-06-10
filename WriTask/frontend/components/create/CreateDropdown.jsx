

"use client";

import { useState } from "react";
import "./create.css";

export default function CreateDropdown() {

 const [open,setOpen]=useState(false);

 return(
  <div className="create-container">

   <button
    onClick={()=>setOpen(!open)}
    className="create-btn"
   >
    + Create
   </button>

   {open && (

    <div className="create-menu">

      <div>New Project</div>
      <div>New Task</div>
      <div>New Todo</div>
      <div>New Member</div>
      <div>New Milestone</div>

    </div>

   )}

  </div>
 )
}