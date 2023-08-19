import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
    <div className="mb-4">
      <Link to="/" className="block p-2 hover:bg-gray-400">
        Contact
      </Link>
      <Link to="/chartsAndMap" className="block p-2 hover:bg-gray-400">
        Charts And Maps
      </Link>
    </div>
  </div>
  );
};

export default Sidebar;
