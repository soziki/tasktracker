import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

export function SearchBar() {
  const context = useContext(TaskContext);
  const [searchVal, setSearchVal] = useState('');

  if (!context) return null;

  const { searchTaskById } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchVal(value);
    
    // Automatically trigger the context network search on change!
    searchTaskById(value);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label 
        htmlFor="search-id" 
        className="text-sm font-bold text-gray-700"
      >
        Search by Exact Task ID:
      </label>
      <input
        id="search-id"
        type="text"
        placeholder="Type a unique ID (e.g. 12)..."
        value={searchVal}
        onChange={handleChange}
        className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
      />
    </div>
  );
}