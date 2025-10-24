// @ts-ignore
import * as domtoimage from 'dom-to-image-more';

export type ImageCaptureOptions = {
  quality?: number;
  backgroundColor?: string;
  scale?: number;
};

export type ImageCaptureResult = {
  dataUrl: string;
  fileName: string;
};

export const captureElementAsImage = async (
  element: HTMLElement,
  fileName: string,
  options: ImageCaptureOptions = {}
): Promise<ImageCaptureResult> => {
  const { quality = 0.95, backgroundColor = '#ffffff', scale = 2 } = options;

  // Clone the element to avoid affecting the original DOM
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // Temporarily append the clone to the document (off-screen)
  clonedElement.style.position = 'absolute';
  clonedElement.style.left = '-9999px';
  clonedElement.style.top = '-9999px';
  clonedElement.style.zIndex = '-1';
  clonedElement.style.width = `${element.offsetWidth}px`;
  clonedElement.style.height = `${element.offsetHeight}px`;
  document.body.appendChild(clonedElement);

  // Inject CSS to remove unwanted borders and outlines
  const style = document.createElement('style');
  style.textContent = `
    * {
      outline: none !important;
      border: none !important;
    }
    /* Preserve specific design elements */
    .rounded-xl, .rounded-2xl, .rounded-lg, .rounded-sm {
      border: none !important;
    }
    /* Preserve QR code container styling */
    [class*="bg-gray-50"][class*="shadow-sm"] {
      border: none !important;
      outline: none !important;
    }
    /* Preserve QR code inner container */
    [class*="bg-white"][class*="shadow-sm"] {
      border: none !important;
      outline: none !important;
    }
    /* Remove any focus rings or browser UI */
    *:focus {
      outline: none !important;
      border: none !important;
    }
  `;
  document.head.appendChild(style);

  // Remove unwanted borders and outlines while preserving intended design
  const cleanElementStyling = (element: HTMLElement) => {
    // Remove all borders and outlines
    element.style.setProperty('border', 'none', 'important');
    element.style.setProperty('outline', 'none', 'important');

    // Process children recursively
    Array.from(element.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        cleanElementStyling(child);
      }
    });
  };

  cleanElementStyling(clonedElement);

  // Wait for fonts and images to load
  await new Promise((resolve) => setTimeout(resolve, 200));

  try {
    const dataUrl = await domtoimage.toPng(clonedElement, {
      quality,
      bgcolor: backgroundColor,
      width: element.offsetWidth * scale,
      height: element.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      },
      filter: () => {
        // Keep all nodes, don't filter anything
        return true;
      },
    });

    return { dataUrl, fileName };
  } finally {
    // Clean up the cloned element and injected styles
    if (document.body.contains(clonedElement)) {
      document.body.removeChild(clonedElement);
    }
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  }
};
export const downloadImage = (dataUrl: string, fileName: string): void => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
