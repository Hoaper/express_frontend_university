'use client';
import React, { useState, useEffect } from 'react';

interface DropdownItem {
    title: string;
    value: string;
}

interface DropdownProps {
    items: DropdownItem[];
    onSelect: (value: string) => void;
    initialText: string;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onSelect, initialText = "Select" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [arrowRotation, setArrowRotation] = useState(0);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
        setArrowRotation(prevRotation => (prevRotation === 0 ? 180 : 0));
    };

    const handleBlur = () => {
        setIsOpen(() => false);
        setArrowRotation(() => 0);
    };

    const handleItemClick = (item: DropdownItem) => {
        setSelectedItem(() => item.title);
        onSelect(item.value);
        setIsOpen(() => false);
        setArrowRotation(() => 0);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Trigger button with animated arrow */}
            <button
                type="button"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300 transform transition-transform"
                onClick={toggleDropdown}
            >
                {selectedItem || initialText}
                {/* Animated Dropdown arrow */}
                <svg style={{ transform: `rotate(${arrowRotation}deg)` }} className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {/* Dropdown content */}
            {isOpen && (
                <div className="z-50 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onBlur={handleBlur}>
                    <div className="py-1">
                        {/* Dropdown items */}
                        {items.map((item, index) => (
                            <a key={index} href="#" onClick={() => handleItemClick(item)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{item.title}</a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
