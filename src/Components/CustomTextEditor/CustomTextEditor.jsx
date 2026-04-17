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

    const purifyConfig = {
        ALLOWED_TAGS: [
            'b', 'i', 'u', 'strong', 'em', 'ul', 'ol', 'li',
            'p', 'br', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        ],
        ALLOWED_ATTR: [],
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style', 'class',
            'color', 'bgcolor', 'width', 'height', 'font', 'align'],
        KEEP_CONTENT: true
    };

    // ✅ Recursively strips ALL presentation attributes from every node
    const stripInlineStyles = useCallback((element) => {
        const attributesToRemove = ['style', 'class', 'color', 'bgcolor',
            'width', 'height', 'align', 'valign', 'font'];
        attributesToRemove.forEach(attr => element.removeAttribute(attr));
        Array.from(element.children).forEach(child => stripInlineStyles(child));
    }, []);

    const normalizeContent = useCallback((htmlContent) => {
        if (!htmlContent) return "";

        const sanitized = DOMPurify.sanitize(htmlContent, purifyConfig);

        const testDiv = document.createElement('div');
        testDiv.innerHTML = sanitized;

        // ✅ Strip styles from normalized content too, not just pasted content
        Array.from(testDiv.querySelectorAll('*')).forEach(el => stripInlineStyles(el));

        const hasContent = testDiv.textContent?.trim().length > 0;
        if (!hasContent && !testDiv.querySelector('br, img')) return "";

        return testDiv.innerHTML;
    }, [stripInlineStyles]);

    const syncContent = useCallback(() => {
        if (!editorRef.current) return;
        const rawContent = editorRef.current.innerHTML;
        const normalizedContent = normalizeContent(rawContent);
        if (textareaRef.current) textareaRef.current.value = normalizedContent;
        if (onChange) onChange(normalizedContent);
    }, [onChange, normalizeContent]);

    const cleanEditorContent = useCallback(() => {
        if (!editorRef.current) return;
        const html = editorRef.current.innerHTML;
        const normalized = normalizeContent(html);
        if (html !== normalized) editorRef.current.innerHTML = normalized;
    }, [normalizeContent]);

    useEffect(() => {
        if (!isFocused && editorRef.current) {
            const normalizedDefault = normalizeContent(defaultValue);
            if (editorRef.current.innerHTML !== normalizedDefault) {
                isInternalChange.current = false;
                editorRef.current.innerHTML = normalizedDefault;
                if (textareaRef.current) textareaRef.current.value = normalizedDefault;
            }
        }
    }, [defaultValue, normalizeContent, isFocused]);

    useEffect(() => {
        if (editorRef.current) {
            const normalizedDefault = normalizeContent(defaultValue);
            editorRef.current.innerHTML = normalizedDefault;
            if (textareaRef.current) textareaRef.current.value = normalizedDefault;
        }
    }, []);

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

    const handleEditorFocus = () => setIsFocused(true);

    const handleEditorBlur = () => {
        setIsFocused(false);
        cleanEditorContent();
        syncContent();
    };

    const handleEditorPaste = (e) => {
        if (readOnly) { e.preventDefault(); return; }
        e.preventDefault();

        const html = e.clipboardData.getData('text/html');

        if (html) {
            // Step 1: Sanitize with DOMPurify (removes forbidden tags/attrs)
            const sanitized = DOMPurify.sanitize(html, purifyConfig);

            // Step 2: DOM-level strip (catches anything DOMPurify missed)
            const temp = document.createElement('div');
            temp.innerHTML = sanitized;
            Array.from(temp.querySelectorAll('*')).forEach(el => stripInlineStyles(el)); // ✅ Now actually called

            // Step 3: Insert clean HTML at cursor
            document.execCommand('insertHTML', false, temp.innerHTML);
        } else {
            // Fallback: plain text (no formatting at all)
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
        }

        setTimeout(() => { cleanEditorContent(); syncContent(); }, 0);
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
                        if (readOnly) { e.preventDefault(); return; }
                        if (e.key === 'Backspace' || e.key === 'Delete') {
                            setTimeout(() => { cleanEditorContent(); syncContent(); }, 0);
                        }
                    }}
                    placeholder={readOnly ? "" : "Type here..."}
                />
            </div>
        </div>
    );
}

export default CustomTextEditor;