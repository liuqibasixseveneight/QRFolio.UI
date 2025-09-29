import { useRef, useCallback, useEffect } from 'react';

export type RichTextEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
  className?: string;
};

const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Enter text...',
  height = 200,
  disabled = false,
  className = '',
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const formatText = useCallback(
    (command: string) => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand(command, false);
        handleInput();
      }
    },
    [handleInput]
  );

  const insertList = useCallback(
    (listType: 'ul' | 'ol') => {
      if (editorRef.current) {
        editorRef.current.focus();

        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);

          // Check if we're already in a list
          let container = range.commonAncestorContainer;
          if (container.nodeType === Node.TEXT_NODE) {
            container = container.parentNode!;
          }

          const existingList = (container as Element).closest('ul, ol');

          if (existingList) {
            // If we're in a list, remove it
            const listItems = existingList.querySelectorAll('li');
            const parent = existingList.parentNode;

            if (parent) {
              // Move all content out of list items
              listItems.forEach((li) => {
                while (li.firstChild) {
                  parent.insertBefore(li.firstChild, existingList);
                }
              });
              // Remove the empty list
              existingList.remove();
            }
          } else {
            // Create new list
            const list = document.createElement(listType);
            const listItem = document.createElement('li');

            // If there's selected text, put it in the list item
            if (!range.collapsed) {
              const selectedContent = range.extractContents();
              listItem.appendChild(selectedContent);
            } else {
              // Add a space to make the list item visible
              listItem.textContent = ' ';
            }

            list.appendChild(listItem);
            range.deleteContents();
            range.insertNode(list);

            // Position cursor inside the list item
            const newRange = document.createRange();
            newRange.setStart(listItem, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }

        handleInput();
      }
    },
    [handleInput]
  );

  // Update content when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <>
      <style>{`
        .rich-text-editor ul {
          list-style-type: disc;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        .rich-text-editor ol {
          list-style-type: decimal;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        .rich-text-editor li {
          margin-bottom: 4px;
        }
        .rich-text-editor ul ul {
          list-style-type: circle;
        }
        .rich-text-editor ul ul ul {
          list-style-type: square;
        }
      `}</style>
      <div
        className={`rich-text-editor border border-gray-300 rounded ${className}`}
        style={{ height: `${height}px` }}
      >
        {/* Simple Toolbar */}
        <div className='flex gap-1 p-2 border-b border-gray-200 bg-gray-50'>
          <button
            type='button'
            onClick={() => formatText('bold')}
            disabled={disabled}
            className='px-2 py-1 text-sm font-bold border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
            title='Bold'
          >
            B
          </button>
          <button
            type='button'
            onClick={() => formatText('italic')}
            disabled={disabled}
            className='px-2 py-1 text-sm italic border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
            title='Italic'
          >
            I
          </button>
          <button
            type='button'
            onClick={() => formatText('underline')}
            disabled={disabled}
            className='px-2 py-1 text-sm underline border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
            title='Underline'
          >
            U
          </button>
          <div className='w-px bg-gray-300 mx-1' />
          <button
            type='button'
            onClick={() => insertList('ul')}
            disabled={disabled}
            className='px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
            title='Bullet List'
          >
            •
          </button>
          <button
            type='button'
            onClick={() => insertList('ol')}
            disabled={disabled}
            className='px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
            title='Numbered List'
          >
            1.
          </button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          className='p-3 outline-none resize-none overflow-auto'
          style={{
            height: `${height - 50}px`,
            minHeight: '100px',
          }}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
      </div>
    </>
  );
};

export default RichTextEditor;
