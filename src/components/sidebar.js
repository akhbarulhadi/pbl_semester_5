// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-6 fixed top-0 left-0 h-full shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li><a href="#section1" className="text-gray-700 hover:text-gray-900">Section 1</a></li>
        <li><a href="#section2" className="text-gray-700 hover:text-gray-900">Section 2</a></li>
        <li><a href="#section3" className="text-gray-700 hover:text-gray-900">Section 3</a></li>
        <li><a href="#section4" className="text-gray-700 hover:text-gray-900">Section 4</a></li>
        <li><a href="#section5" className="text-gray-700 hover:text-gray-900">Section 5</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
