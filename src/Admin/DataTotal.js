import React from 'react';

const DataTotal = ({ title, total, tags, children }) => {
  return (
    <div className="relative rounded-sm border border-gray-200 bg-white py-6 px-7 shadow-lg">
      <div className="flex h-14 w-14 items-center justify-end">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-center">
        <div>
          {/* Tags Section: Positioned in the Top-Right Corner */}
          {tags && (
            <div className="absolute top-2 right-2 flex gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* Total Value */}
          <h4 style={{ color: "" }} className="text-xl font-bold mb-5">
            {total}
          </h4>
          {/* Title */}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataTotal;
