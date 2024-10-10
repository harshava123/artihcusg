import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import template1 from "../images/template1.png";
// import temp from "../images/temp.jpg"; // Existing image for template 4
import doc1 from "../Docs/doc1.docx";
import docu from "../Docs/docu.pdf";
import doc2 from "../Docs/doc2.docx";
import { HiTemplate } from "react-icons/hi";
import { CgTemplate } from "react-icons/cg";

// Sample data for document templates
const templates = [
    { id: 1, name: '1', document: docu },
    { id: 2, name: '2', document: docu},
    { id: 3, name: '3', document: docu},
    { id: 4, name: 'Add', document: doc1 },  // Integrated Template 4
];

const documentStructure = [
    {
        id: '1', title: 'Document Control',
        subHeadings: [
            {
                id: '1.1', title: 'Customer',
                subSubHeadings: [
                    { id: '1.1.1', title: 'Logo', content: 'Logo' }, // Logo section
                    { id: '1.1.2', title: 'Sign-off Authority', content: 'Customer sign-off authority content...' }
                ]
            },
            {
                id: '1.2', title: 'Vendor',
                subSubHeadings: [
                    { id: '1.2.1', title: 'Logo', content: 'Vendor logo content...' },
                    { id: '1.2.2', title: 'Sign-off Authority', content: 'Vendor sign-off authority content...' }
                ]
            },
            { id: '1.3', title: 'Document Title', content: 'Document Title content...' },
            { id: '1.4', title: 'Project Identification', content: 'Project Identification content...' },
            {
                id: '1.5', title: 'Version',
                subSubHeadings: [
                    { id: '1.5.1', title: 'Generate Version', content: 'Generate Version content...' },
                    { id: '1.5.2', title: 'Edit Document', content: 'Edit Document content...' }
                ]
            },
        ]
    },
    { id: '2', title: 'Scope Items', content: 'Scope items content...' },
    {
        id: '3', title: 'Table of contents',
        subHeadings: [
            { id: '3.1', title: 'Introduction', content: 'Introduction content...' },
            { id: '3.2', title: 'Document Overview', content: 'Document Overview content...' },
            { id: '3.3', title: 'Purpose of this document', content: 'Purpose content...' },
            { id: '3.4', title: 'How to read document', content: 'How to read content...' },
            { id: '3.5', title: 'Glossary', content: 'Glossary content...' },
            {
                id: '3.6', title: 'Process area-1',
                subSubHeadings: [
                    { id: '3.6.1', title: 'Process definition', content: 'Process definition content...' },
                    { id: '3.6.2', title: 'Process details', content: 'Process details content...' },
                    { id: '3.6.3', title: 'Business benefits', content: 'Business benefits content...' },
                    { id: '3.6.4', title: 'Key process flow', content: 'Key process flow content...' },
                    { id: '3.6.5', title: 'Process flowchart', content: 'Process flowchart content...' },
                    { id: '3.6.6', title: 'Process narrative', content: 'Process narrative content...' },
                ]
            },
            { id: '3.7', title: 'Organizational structure', content: 'Organizational structure content...' },
            { id: '3.8', title: 'Master data considerations', content: 'Master data considerations content...' },
            { id: '3.9', title: 'Major business pain points', content: 'Pain points content...' },
            { id: '3.10', title: 'Reports', content: 'Reports content...' },
            { id: '3.11', title: 'Enhancements', content: 'Enhancements content...' },
            { id: '3.12', title: 'Conversions', content: 'Conversions content...' },
            { id: '3.13', title: 'Forms and Labels', content: 'Forms and Labels content...' },
            { id: '3.14', title: 'Interfaces', content: 'Interfaces content...' },
            { id: '3.15', title: 'Key integration points', content: 'Key integration points content...' },
            { id: '3.16', title: 'Gap analysis', content: 'Gap analysis content...' }
        ]
    }
];

function Template() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [previewDocument, setPreviewDocument] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [showTemplates, setShowTemplates] = useState(false);
    const [openSections, setOpenSections] = useState({});
    const [logo, setLogo] = useState(null); // State to store uploaded logo
    const [sidebarWidth, setSidebarWidth] = useState(350); // Initial width of the sidebar
    const [isResizing, setIsResizing] = useState(0);
    const [percentage, setPercentage] = useState(0); // Percentage for the progress bar
    const [savedMessage, setSavedMessage] = useState(''); // State for saved message
    const [customerName, setCustomerName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [warehouseNumber, setWarehouseNumber] = useState('');
    const navigate = useNavigate();

    const handleMouseDown = (e) => {
        setIsResizing(true);
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            setSidebarWidth(e.clientX);
        }
    };
    const handleMouseUp = () => {
        setIsResizing(false);
    };
    const startResizing = () => {
        setIsResizing(true);
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const handleResize = (e) => {
        if (isResizing) {
            const newWidth = e.clientX;
            if (newWidth >= 150 && newWidth <= 500) { // Set min/max width limits
                setSidebarWidth(newWidth);
            }
        }
    };
    // Handle template selection
    const handleTemplateSelect = (id) => {
        setSelectedTemplate(id);
        const selected = templates.find(template => template.id === id);
        if (selected) {
            
            setPreviewDocument(selected.document);

            // Automatically navigate to WordEditor if Template 4 is selected
            if (id === 4) {
                navigate('/editor', { state: { templateId: id } });
            }
        }
    };

    // Toggle section for showing sub-headings or sub-sub-headings
    const toggleSection = (id) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Handle click to display content in the center panel
// Handle click to display content in the center panel
const handleContentSelect = (content) => {
    if (content === 'Logo' || content === 'Vendor logo content...') {
        setSelectedContent(content); // Allow both Customer and Vendor logo to trigger the same logic
    } else if (content === 'Customer sign-off authority content...') {
        setSelectedContent('Customer sign-off authority content...');
    } else {
        setSelectedContent(content);
    }
};

    
    
    

    const handleSignOffSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., save to state, API call, etc.
        console.log("Customer Name:", customerName);
        console.log("Project Name:", projectName);
        console.log("Project Type:", projectType);
        console.log("Warehouse Number:", warehouseNumber);
        // Reset the form after submission
        setCustomerName('');
        setProjectName('');
        setProjectType('');
        setWarehouseNumber('');
    };

    // Handle logo upload
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogo(imageUrl);
            setPercentage(0); // Reset percentage when a new logo is uploaded
        }
    };

    const handleSave = () => {
        if (logo) { // Check if a logo has been uploaded
            setPercentage(100); // Set percentage to 100% when saved
            setSavedMessage('Logo saved successfully!'); // Set saved message
        } else {
            alert("Please upload a logo before saving.");
        }
    };
    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    };
    const handleDrop = (event) => {
        event.preventDefault(); // Prevent default behavior
        const file = event.dataTransfer.files[0]; // Get the dropped file
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogo(imageUrl);
            setPercentage(0); // Reset percentage when a new logo is uploaded
        }
    };

    return (
        <div className="flex h-screen w-auto mb-3 onMouseMove={handleResize} onMouseUp={stopResizing}"
        onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            {/* Left Sidebar with scrolling */}
            <div className=" bg-gray-100 p-4 space-y-5 border-r border-gray-300" 
            style={{ width: `${sidebarWidth}px`, maxHeight: '100vh' }}>
                {/* Template Icons */}
                <div className='flex items-center mb-6'>
                <button 
                    className="bg-gray-700 text-white p-2 rounded"
                    onClick={() => setShowTemplates(!showTemplates)} // Toggle visibility on button click
                >
                    <CgTemplate />
                </button>
                <h2 className="text-xl font-bold ml-4">Templates</h2>
            </div>
                {/* Display templates only if showTemplates is true */}
                {showTemplates && (
                <div className="space-y-4 flex flex-row gap-5 mt-10">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={`relative cursor-pointer p-2 rounded-md transition-transform duration-200 hover:scale-105 ${selectedTemplate === template.id ? 'bg-blue-100' : 'bg-white'}`}
                            onClick={() => handleTemplateSelect(template.id)}
                        >
                            <div className="flex justify-center">
                                    <CgTemplate className="" />
                                </div>
                            <p className="text-center mt-2 text-sm truncate">{template.name}</p>
                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2 text-2xl text-green-500">✔️</div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Document Structure - Headings and Sub-headings */}
            <div className="mt-8 space-y-2 overflow-y-scroll" style={{ maxHeight: '75vh' }}>
                {documentStructure.map(section => (
                    <div key={section.id}>
                        <h3
                            className="font-bold text-lg cursor-pointer flex items-center"
                            onClick={() => toggleSection(section.id)}
                        >
                            {openSections[section.id] ? '-' : '+'} {section.title}
                        </h3>
                        {openSections[section.id] && (
                            <div className="pl-4 space-y-1">
                                {section.subHeadings && section.subHeadings.map(sub => (
                                    <div key={sub.id}>
                                        <h4
                                            className="cursor-pointer text-blue-700"
                                            onClick={() => toggleSection(sub.id)}
                                        >
                                            {openSections[sub.id] ? '-' : '+'} {sub.title}
                                        </h4>
                                        {openSections[sub.id] && (
                                            <div className="pl-4">
                                                {sub.subSubHeadings ? sub.subSubHeadings.map(subSub => (
                                                    <p
                                                        key={subSub.id}
                                                        className="cursor-pointer text-gray-600"
                                                        onClick={() => handleContentSelect(subSub.content)}
                                                    >
                                                        {subSub.title}
                                                    </p>
                                                )) : (
                                                    <p
                                                        className="cursor-pointer text-gray-600"
                                                        onClick={() => handleContentSelect(sub.content)}
                                                    >
                                                        {sub.title}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {section.content && (
                                    <p
                                        className="cursor-pointer text-gray-600"
                                        onClick={() => handleContentSelect(section.content)}
                                    >
                                        {section.content}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>






            {/* <button
                className="bg-blue-600 text-white py-2 px-4 mt-10 rounded hover:bg-blue-700 w-full"
                onClick={() => navigate('/final')}
            >
                Next
            </button> */}
        </div>
         {/* Resizer */}
         <div className="w-1 bg-gray-400 cursor-col-resize" onMouseDown={startResizing}></div>

            {/* Center Panel for Content Display */ }
    <div className="flex-grow p-4 w-full flex justify-center ">
        <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Selected Section</h2>
            {(selectedContent === 'Logo' || selectedContent === 'Vendor logo content...') ? (
                        <div className='flex flex-col justify-center items-center mt-16'>
                            <div
                                className="border-dashed border-4 border-gray-400 p-8 rounded-lg w-80 cursor-pointer"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <p className="text-center text-gray-500">Drag and drop your logo here or click to upload</p>
                                <label
                                    htmlFor="logoUpload"
                                    className="cursor-pointer bg-gray-500 text-white p-2 rounded-lg mt-4 block"
                                >
                                    Upload {selectedContent === 'Vendor logo content...' ? 'Vendor Logo' : 'Customer Logo'}
                                </label>
                                <input
                                    type="file"
                                    id="logoUpload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleLogoUpload}
                                />
                            </div>
                            {logo && (
                                <div className="mt-4">
                                    <img
                                        src={logo}
                                        alt="Uploaded Logo"
                                        className="w-40 h-40 object-contain mx-auto"
                                    />
                                </div>
                            )}
                      
                      <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                 
                 {savedMessage && <p className="mt-2 text-green-600">{savedMessage}</p>}
                            
                            <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-green-500 h-full rounded-full"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
            ) : 
            
            
             selectedContent === 'Customer sign-off authority content...' ? ( // Matching with the actual content
                <div>
                    <h1 className='text-2xl mb-2'>Sign-off Authority</h1>
                    <div className='flex justify-center'>
                        <form onSubmit={handleSignOffSubmit} className="space-y-4 w-auto">
                            {/* Input fields for customer sign-off authority */}
                            <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="border p-2 rounded w-full" />
                            <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} required className="border p-2 rounded w-full" />
                            <input type="text" placeholder="Project Type" value={projectType} onChange={(e) => setProjectType(e.target.value)} required className="border p-2 rounded w-full" />
                            <input type="text" placeholder="Warehouse Number" value={warehouseNumber} onChange={(e) => setWarehouseNumber(e.target.value)} required className="border p-2 rounded w-full" />
                            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
                        </form>
                    </div>
                </div>
            ) : 
            
            
            
            (
                <p>{selectedContent || 'No content selected...'}</p>
            )}
        </div>
    </div>


    {/* Right Sidebar with Document Preview */ }
    <div className="w-1/3 bg-gray-50 p-6 space-y-4 border-l border-gray-300 shadow-lg" style={{ maxHeight: '100vh' }}>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Document Preview</h2>

        <div className="bg-white rounded-lg overflow-hidden shadow-inner h-full flex items-center justify-center">
            {previewDocument ? (
                <iframe
                    src={previewDocument}
                    title="Document Preview"
                    
                    className="w-full h-full rounded-lg border-none"
                    style={{ minHeight: '250px' }}
                />
            ) : (
                <div className="flex text-gray-500">
                    <p>No template selected. Please select a template to preview the document.</p>
                </div>
            )}
        </div>
    </div>
        </div >
    );
}

export default Template;