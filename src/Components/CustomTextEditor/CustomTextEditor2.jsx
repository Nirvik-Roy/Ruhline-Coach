import React, { useRef, useEffect, useState, useCallback } from "react";
import "./CustomTextEditor.css";


// This texteditor is only for readonly purpose.....
function CustomTextEditor2({
    name,
    required,
    defaultValue = "",
    onChange,
    label,
    readOnly = true,
}) {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const [content, setContent] = useState(defaultValue);
    const [isDirty, setIsDirty] = useState(false);
    const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);

    // Memoized sync function
    const syncContent = useCallback((newContent) => {
        const htmlContent = newContent || (editorRef.current ? editorRef.current.innerHTML : '');

        setContent(htmlContent);

        if (textareaRef.current) {
            textareaRef.current.value = htmlContent;
        }

        if (onChange) {
            onChange(htmlContent);
        }

        setIsDirty(true);
    }, [onChange]);

    // Handle defaultValue changes from parent (e.g., when fetching new data)
    useEffect(() => {
        // Only update if defaultValue actually changed
        if (prevDefaultValue !== defaultValue) {
            if (editorRef.current) {
                // Update the editor content
                editorRef.current.innerHTML = defaultValue;
                // Sync the new content
                syncContent(defaultValue);
                // Reset dirty state if we're setting to a new value from parent
                setIsDirty(false);
            }
            // Update the previous value tracker
            setPrevDefaultValue(defaultValue);
        }
    }, [defaultValue, prevDefaultValue, syncContent]);

    // Initialize on first mount
    useEffect(() => {
        if (editorRef.current && defaultValue && !isDirty) {
            editorRef.current.innerHTML = defaultValue;
            syncContent(defaultValue);
        }
    }, []); // Run only on mount

    // Reset when defaultValue is cleared (e.g., form reset)
    useEffect(() => {
        if (editorRef.current && defaultValue === "" && content !== "") {
            editorRef.current.innerHTML = "";
            syncContent("");
            setIsDirty(false);
        }
    }, [defaultValue, content, syncContent]);

    const applyStyle = (command, value = null) => {
        if (readOnly) return;
        document.execCommand(command, false, value);
        editorRef.current.focus();
        syncContent();
    };

    const handleEditorInput = () => {
        if (readOnly) return;
        syncContent();
    };

    const handleEditorBlur = () => {
        if (readOnly) return;
        syncContent();
    };

    return (
        <div className="input_form">
            <label>
                {label} {required && <span>*</span>}
            </label>

            <div className="editor-container">
                {!readOnly && (
                    <div className="toolbar">
                        <button type="button" onClick={() => applyStyle("bold")} title="Bold">
                            <strong>B</strong>
                        </button>
                        <button type="button" onClick={() => applyStyle("italic")} title="Italic">
                            <em>I</em>
                        </button>
                        <button type="button" onClick={() => applyStyle("underline")} title="Underline">
                            <u>U</u>
                        </button>
                        <button type="button" onClick={() => applyStyle("insertOrderedList")} title="Ordered List">
                            <i className="fa-solid fa-list-ol"></i>
                        </button>
                        <button type="button" onClick={() => applyStyle("insertUnorderedList")} title="Bulleted List">
                            <i className="fa-solid fa-list"></i>
                        </button>
                    </div>
                )}

                <textarea
                    ref={textareaRef}
                    name={name}
                    style={{ display: "none" }}
                    defaultValue={defaultValue}
                    readOnly
                />

                <div
                    ref={editorRef}
                    className={`editor ${readOnly ? 'editor-readonly' : ''}`}
                    contentEditable={!readOnly}
                    suppressContentEditableWarning={true}
                    onInput={handleEditorInput}
                    onBlur={handleEditorBlur}
                    onPaste={(e) => {
                        if (readOnly) {
                            e.preventDefault();
                            return;
                        }
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        document.execCommand('insertText', false, text);
                        syncContent();
                    }}
                    onKeyDown={(e) => {
                        if (readOnly) {
                            e.preventDefault();
                            return;
                        }

                        if (e.key === 'Backspace' || e.key === 'Delete') {
                            setTimeout(() => syncContent(), 0);
                        }
                    }}
                    placeholder={readOnly ? "" : "Type here..."}
                />
            </div>
        </div>
    );
}

export default CustomTextEditor2;