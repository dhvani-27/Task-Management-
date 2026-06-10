import React from 'react';

export default function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results && results.length > 0 ? (
        <ul className="results-list">
          {results.map((result, index) => (
            <li key={index} className="result-item">
              {result.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No results found</p>
      )}
    </div>
  );
}
