/**
 * Converts HTML content to plain text suitable for PDF rendering
 * Handles lists, formatting, and other HTML elements
 */
export const htmlToPDFText = (html: string): string => {
  if (!html) return '';

  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Function to process a node and convert it to text
  const processNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      switch (tagName) {
        case 'ul':
          // Convert unordered list to bullet points
          const ulItems = Array.from(element.children)
            .map((li) => processNode(li))
            .filter((text) => text.trim())
            .map((text) => `• ${text.trim()}`)
            .join('\n');
          return ulItems;

        case 'ol':
          // Convert ordered list to numbered points
          const olItems = Array.from(element.children)
            .map((li, index) => processNode(li))
            .filter((text) => text.trim())
            .map((text) => `${index + 1}. ${text.trim()}`)
            .join('\n');
          return olItems;

        case 'li':
          // Process list item content
          return Array.from(element.childNodes)
            .map((child) => processNode(child))
            .join('')
            .trim();

        case 'p':
          // Process paragraph content
          const pContent = Array.from(element.childNodes)
            .map((child) => processNode(child))
            .join('');
          return pContent.trim() + '\n\n';

        case 'br':
          return '\n';

        case 'strong':
        case 'b':
          // Bold text - keep as is for now (PDF will handle formatting)
          return Array.from(element.childNodes)
            .map((child) => processNode(child))
            .join('');

        case 'em':
        case 'i':
          // Italic text - keep as is for now
          return Array.from(element.childNodes)
            .map((child) => processNode(child))
            .join('');

        case 'u':
          // Underlined text - keep as is for now
          return Array.from(element.childNodes)
            .map((child) => processNode(child))
            .join('');

        default:
          // For other elements, process their children
          return Array.from(element.childNodes)
            .map((child) => processNode(child))
            .join('');
      }
    }

    return '';
  };

  // Process all child nodes
  const result = Array.from(tempDiv.childNodes)
    .map((child) => processNode(child))
    .join('')
    .trim();

  // Clean up extra whitespace and newlines
  return result
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple newlines with double newlines
    .replace(/[ \t]+/g, ' ') // Replace multiple spaces/tabs with single space
    .trim();
};
