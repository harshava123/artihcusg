import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { saveAs } from "file-saver";
import draftToHtml from "draftjs-to-html";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faRedo, faSave, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";

const WordEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [activeTab, setActiveTab] = useState("home");
    const [isDrawing, setIsDrawing] = useState(false);
    const [pages, setPages] = useState([EditorState.createEmpty()]);
    const [activePageIndex, setActivePageIndex] = useState(0);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const toggleInlineStyle = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const updatePageState = (newEditorState) => {
        const updatedPages = [...pages];
        updatedPages[activePageIndex] = newEditorState; // Update the current page
        setPages(updatedPages); // Update the state
        setEditorState(newEditorState); // Optional: You can also update the main editor state
    };

    const addNewPage = () => {
        setPages([...pages, EditorState.createEmpty()]);
        setActivePageIndex(pages.length); // Set the new page as active
    };

    const exportToWord = () => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const htmlContent = draftToHtml(rawContent);
        const zip = new PizZip();
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.loadZip(zip);
        doc.setData({
            content: htmlContent,
        });
        try {
            doc.render();
            const blob = doc.getZip().generate({ type: "blob" });
            saveAs(blob, "document.docx");
        } catch (error) {
            console.error("Error exporting document", error);
        }
    };

    const undo = () => {
        // Implement undo functionality
    };

    const redo = () => {
        // Implement redo functionality
    };

    const clearAll = () => {
        setEditorState(EditorState.createEmpty());
        clearCanvas();
    };

    const saveChanges = () => {
        // Implement save changes functionality
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseDown = () => {
        setIsDrawing(true);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        contextRef.current.beginPath(); // Reset the path
    };

    const handleMouseMove = (event) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = contextRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        context.lineWidth = 2; // Set line width
        context.lineCap = "round"; // Set line cap
        context.strokeStyle = "black"; // Set line color
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    };

    const startDrawing = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        clearCanvas();
    };

    console.log("Active Page Index:", activePageIndex);
    console.log("Pages Array:", pages);

    return (
        <div className="flex flex-col items-center w-full h-screen">
            {/* Header Section */}
            <header className="w-full bg-gray-200 shadow-lg">
                {/* MS Word NavBar */}
                <div className="p-2 flex flex-col md:flex-row justify-between items-center">
                    {/* Tabs */}
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab("home")}
                            className={`${activeTab === "home" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setActiveTab("insert")}
                            className={`${activeTab === "insert" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Insert
                        </button>
                        <button
                            onClick={() => setActiveTab("layout")}
                            className={`${activeTab === "layout" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Layout
                        </button>
                        <button
                            onClick={() => setActiveTab("view")}
                            className={`${activeTab === "view" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            View
                        </button>
                        <button
                            onClick={() => setActiveTab("design")}
                            className={`${activeTab === "design" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Design
                        </button>
                        <button
                            onClick={() => setActiveTab("reference")}
                            className={`${activeTab === "reference" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Reference
                        </button>
                        <button
                            onClick={() => setActiveTab("mailing")}
                            className={`${activeTab === "mailing" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Mailing
                        </button>
                        <button
                            onClick={() => setActiveTab("review")}
                            className={`${activeTab === "review" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Review
                        </button>
                        <button
                            onClick={() => setActiveTab("help")}
                            className={`${activeTab === "help" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            Help
                        </button>
                    </div>
                    {/* File Options */}
                    <div className="flex space-x-2 mt-2 md:mt-0"> {/* Reduced space between buttons */}
                        <button
                            onClick={undo}
                            className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 flex items-center" // Reduced padding
                        >
                            <FontAwesomeIcon icon={faUndo} />
                        </button>
                        <button
                            onClick={redo}
                            className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 flex items-center" // Reduced padding
                        >
                            <FontAwesomeIcon icon={faRedo} />
                        </button>
                        <button
                            onClick={clearAll}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" // Reduced padding
                        >
                            Clear All
                        </button>
                        <button
                            onClick={saveChanges}
                            className="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-600" // Reduced padding
                        >
                            <FontAwesomeIcon icon={faSave} /> Save Changes
                        </button>
                        <button
                            onClick={exportToWord}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" // Reduced padding
                        >
                            Export as .docx
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("drawing");
                                startDrawing();
                            }}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                            <FontAwesomeIcon icon={faPen} /> Draw
                        </button>
                        <button
                            onClick={addNewPage}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Add Page
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center flex-grow p-4">
                {/* Editor Section */}
                {activeTab === "home" && (
                    <div className="w-full">
                        <Editor
                            editorState={editorState}
                            handleKeyCommand={handleKeyCommand}
                            onChange={setEditorState}
                            placeholder="Start writing..."
                            className="border p-4"
                        />
                    </div>
                )}

                {/* Drawing Section */}
                {activeTab === "drawing" && (
                    <div className="relative border border-gray-300">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            className="w-full h-64"
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default WordEditor;
