import React, { useState } from "react";
import { Link } from 'react-router-dom';
const ProgressBar = () => {
    const [percentage, setPercentage] = useState(0);

    const handleUpload = () => {
        // Simulating an upload process
        const interval = setInterval(() => {
            setPercentage((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    return (
        <div className="w-full flex flex-col items-center mt-5">
            <div className="w-3/4 bg-gray-200 rounded-full h-4">
                <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleUpload}
            >
                Start Upload
            </button>
            <p className="mt-2 text-gray-700">{percentage}%</p>
        </div>
    );
};

export default ProgressBar;