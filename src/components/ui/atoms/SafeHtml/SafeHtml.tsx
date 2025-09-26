import React from 'react';
import DOMPurify from 'dompurify';
import type { SafeHtmlProps } from './types';

const SafeHtml: React.FC<SafeHtmlProps> = ({
  content,
  className = '',
  tag = 'div',
}) => {
  if (!content) return null;

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'ul',
      'ol',
      'li',
      'a',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });

  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <>
      <style>{`
        .safe-html ul {
          list-style-type: disc;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        .safe-html ol {
          list-style-type: decimal;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        .safe-html li {
          margin-bottom: 4px;
        }
        .safe-html ul ul {
          list-style-type: circle;
        }
        .safe-html ul ul ul {
          list-style-type: square;
        }
      `}</style>
      <Tag
        className={`safe-html ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </>
  );
};

export default SafeHtml;
