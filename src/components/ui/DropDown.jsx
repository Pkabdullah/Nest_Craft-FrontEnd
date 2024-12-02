import React, { useState } from "react";

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);
  const [subOptionsVisible, setSubOptionsVisible] = useState(null);

  const handleSubOptionSelect = (subOption) => {
    setSelectedOption(subOption);
    setIsOpen(false);
    setSubOptionsVisible(null);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-full h-8 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-00 hover:bg-gray-50 "
        >
          {selectedOption}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.79l3.71-3.58a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 010-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute  z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    setSubOptionsVisible(
                      subOptionsVisible === index ? null : index
                    );
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                >
                  {option.label}
                </button>

                {subOptionsVisible === index && (
                  <div className="pl-4">
                    {option.subOptions.map((subOption, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleSubOptionSelect(subOption)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mb-1" // Add margin between sub-options
                      >
                        {subOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
