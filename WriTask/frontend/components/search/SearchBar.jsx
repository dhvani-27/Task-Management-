"use client";

import { useState } from "react";
import axios from "axios";
import "./search.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchHandler = async (value) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?q=${value}`
      );

      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-wrapper">

      <input
        type="text"
        placeholder="Search Projects, Tasks, Members..."
        value={query}
        onChange={(e) => searchHandler(e.target.value)}
      />

      {query && (
        <div className="search-dropdown">

          <h4>Projects</h4>

          {results.projects?.map((project) => (
            <div key={project._id}>
              {project.projectName}
            </div>
          ))}

          <h4>Tasks</h4>

          {results.tasks?.map((task) => (
            <div key={task._id}>
              {task.taskName}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
