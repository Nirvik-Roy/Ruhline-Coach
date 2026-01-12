import React, { useRef } from "react";
import "./CustomTextEditor.css"; // optional for styling

function CustomTextEditor({ label, required, defaultValue }) {
    const editorRef = useRef(null);

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
    };

    return (
        <div className="input_form">
            <label>
                {label} {required && <span>*</span>}
            </label>

            <div className="editor-container">
                {/* Toolbar */}
                <div className="toolbar">
                    <button onClick={() => applyStyle("bold")}>B</button>
                    <button onClick={() => applyStyle("italic")}>I</button>
                    <button onClick={() => applyStyle("underline")}>U</button>

                    {/* LIST BUTTONS */}
                    {/* <button onClick={() => applyStyle("insertUnorderedList")}>
            • List
          </button> */}
                    <button onClick={() => applyStyle("insertOrderedList")}>
                        <i class="fa-solid fa-list"></i>
                    </button>
                </div>

                {/* Editable Typing Area */}
                <div
                    ref={editorRef}
                    className="editor"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                >
                    {defaultValue}
                </div>
            </div>
        </div>
    );
}

export default CustomTextEditor;
