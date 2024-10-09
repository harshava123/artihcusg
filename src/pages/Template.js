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
    { id: 2, name: '2', document: doc2 },
    { id: 3, name: '3', document: docu },
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
    const navigate = useNavigate();

    // Handle template selection
    const handleTemplateSelect = (id) => {
        setSelectedTemplate(id);
        const selected = templates.find(template => template.id === id);
        if (selected) {
            const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(selected.document)}&embedded=true`;
            console.log('Viewer URL:', viewerUrl);
            setPreviewDocument(viewerUrl);

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
    const handleContentSelect = (content) => {
        if (content === 'Logo') {
            setSelectedContent('Logo');
        } else {
            setSelectedContent(content);
        }
    };

    // Handle logo upload
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogo(imageUrl); // Store the uploaded image URL
        }
    };

    return (
        <div className="flex h-screen w-auto mb-9">
            {/* Left Sidebar with scrolling */}
            <div className="w-60 bg-gray-100 p-4 space-y-5 border-r border-gray-300" style={{ maxHeight: '100vh' }}>
                {/* Template Icons */}
                <div className='flex items-center mb-6'>
                <button 
                    className="bg-blue-600 text-white p-2 rounded"
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
            <div className="mt-8 space-y-2 overflow-y-auto" style={{ maxHeight: '60vh' }}>
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






            <button
                className="bg-blue-600 text-white py-2 px-4 mt-10 rounded hover:bg-blue-700 w-full"
                onClick={() => navigate('/final')}
            >
                Next
            </button>
        </div>

            {/* Center Panel for Content Display */ }
    <div className="flex-grow p-4 w-full flex justify-center ">
        <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Selected Section</h2>
            {selectedContent === 'Logo' ? (
                <div className='flex  justify-center items-center mt-15'>
                    <label
                        htmlFor="logoUpload"
                        className="cursor-pointer bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Upload Logo
                    </label>
                    <input
                        type="file"
                        id="logoUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleLogoUpload}
                    />
                    {logo && (
                        <div className="mt-4">
                            <img
                                src={logo}
                                alt="Uploaded Logo"
                                className="w-40 h-40 object-contain mx-auto"
                            />
                        </div>
                    )}
                </div>
            ) : (
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
                    style={{ minHeight: '500px' }}
                />
            ) : (
                <div className="flex items-center justify-center text-gray-500">
                    <p>No template selected. Please select a template to preview the document.</p>
                </div>
            )}
        </div>
    </div>
        </div >
    );
}

export default Template;