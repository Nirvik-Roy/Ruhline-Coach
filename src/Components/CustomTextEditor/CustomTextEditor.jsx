import React, { useRef, useEffect, useState, useCallback } from "react";
import DOMPurify from 'dompurify';
import "./CustomTextEditor.css";

function CustomTextEditor({
    name,
    required,
    defaultValue = "",
    onChange,
    label,
    readOnly = false
}) {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const isInternalChange = useRef(false);

    // Configure DOMPurify to allow basic formatting
    const purifyConfig = {
        ALLOWED_TAGS: [
            'b', 'i', 'u', 'strong', 'em', 'ul', 'ol', 'li',
            'p', 'br', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        ],
        ALLOWED_ATTR: ['style'], // Allow style attributes for basic formatting
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'], // Remove event handlers
        ALLOWED_STYLE: ['font-weight', 'font-style', 'text-decoration'], // Only allow these styles
        KEEP_CONTENT: true // Keep content even if tags are removed
    };

    // Helper function to normalize empty content
    const normalizeContent = useCallback((htmlContent) => {
        if (!htmlContent) return "";

        // First sanitize with DOMPurify to ensure clean HTML
        const sanitized = DOMPurify.sanitize(htmlContent, purifyConfig);

        const testDiv = document.createElement('div');
        testDiv.innerHTML = sanitized;

        const hasContent = testDiv.textContent && testDiv.textContent.trim().length > 0;
        const meaningfulElements = testDiv.querySelectorAll('*');
        let hasMeaningfulElements = false;

        meaningfulElements.forEach(el => {
            if (el.textContent && el.textContent.trim().length > 0) {
                hasMeaningfulElements = true;
            }
            if (el.hasAttributes() && el.attributes.length > 0) {
                hasMeaningfulElements = true;
            }
        });

        if (!hasContent && !hasMeaningfulElements) {
            return "";
        }

        return sanitized;
    }, []);

    // Sync content to parent
    const syncContent = useCallback(() => {
        if (!editorRef.current) return;

        const rawContent = editorRef.current.innerHTML;
        const normalizedContent = normalizeContent(rawContent);

        if (textareaRef.current) {
            textareaRef.current.value = normalizedContent;
        }

        if (onChange) {
            onChange(normalizedContent);
        }
    }, [onChange, normalizeContent]);

    // Clean up empty content
    const cleanEditorContent = useCallback(() => {
        if (!editorRef.current) return;

        const html = editorRef.current.innerHTML;
        const normalized = normalizeContent(html);

        if (html !== normalized) {
            editorRef.current.innerHTML = normalized;
        }
    }, [normalizeContent]);

    // Handle defaultValue changes from parent - ONLY when not focused
    useEffect(() => {
        // Only update from parent if the editor is not focused
        // This prevents cursor jumps while typing
        if (!isFocused && editorRef.current) {
            const normalizedDefault = normalizeContent(defaultValue);
            if (editorRef.current.innerHTML !== normalizedDefault) {
                isInternalChange.current = false;
                editorRef.current.innerHTML = normalizedDefault;
                if (textareaRef.current) {
                    textareaRef.current.value = normalizedDefault;
                }
            }
        }
    }, [defaultValue, normalizeContent, isFocused]);

    // Initialize on mount
    useEffect(() => {
        if (editorRef.current) {
            const normalizedDefault = normalizeContent(defaultValue);
            editorRef.current.innerHTML = normalizedDefault;
            if (textareaRef.current) {
                textareaRef.current.value = normalizedDefault;
            }
        }
    }, []); // Empty deps - only run once

    const applyStyle = (command, value = null) => {
        if (readOnly) return;
        document.execCommand(command, false, value);
        setTimeout(cleanEditorContent, 0);
        editorRef.current.focus();
        syncContent();
    };

    const handleEditorInput = () => {
        if (readOnly) return;
        isInternalChange.current = true;
        syncContent();
    };

    const handleEditorFocus = () => {
        setIsFocused(true);
    };

    const handleEditorBlur = () => {
        setIsFocused(false);
        cleanEditorContent();
        syncContent();
    };

    const handleEditorPaste = (e) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        // Try to get HTML content first
        let html = e.clipboardData.getData('text/html');

        if (html) {
            // Sanitize the HTML with DOMPurify
            const cleanHtml = DOMPurify.sanitize(html, purifyConfig);

            // Insert the cleaned HTML
            document.execCommand('insertHTML', false, cleanHtml);
        } else {
            // Fallback to plain text if no HTML is available
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
        }

        setTimeout(() => {
            cleanEditorContent();
            syncContent();
        }, 0);
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
                    onFocus={handleEditorFocus}
                    onBlur={handleEditorBlur}
                    onPaste={handleEditorPaste}
                    onKeyDown={(e) => {
                        if (readOnly) {
                            e.preventDefault();
                            return;
                        }

                        if (e.key === 'Backspace' || e.key === 'Delete') {
                            setTimeout(() => {
                                cleanEditorContent();
                                syncContent();
                            }, 0);
                        }
                    }}
                    placeholder={readOnly ? "" : "Type here..."}
                />
            </div>
        </div>
    );
}

export default CustomTextEditor;