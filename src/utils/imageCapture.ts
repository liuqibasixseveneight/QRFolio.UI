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
  document.body.appendChild(clonedElement);

  // Apply border removal directly to the cloned element without CSS injection
  const removeBordersFromClone = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);

    // Only remove borders if they exist and won't cause layout shifts
    if (
      computedStyle.border !== 'none' &&
      computedStyle.borderWidth !== '0px'
    ) {
      element.style.setProperty('border', 'none', 'important');
    }
    if (
      computedStyle.outline !== 'none' &&
      computedStyle.outlineWidth !== '0px'
    ) {
      element.style.setProperty('outline', 'none', 'important');
    }
    if (computedStyle.boxShadow !== 'none') {
      element.style.setProperty('box-shadow', 'none', 'important');
    }

    // Process children recursively
    Array.from(element.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        removeBordersFromClone(child);
      }
    });
  };

  removeBordersFromClone(clonedElement);

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const dataUrl = await domtoimage.toPng(clonedElement, {
      quality,
      bgcolor: backgroundColor,
      width: clonedElement.offsetWidth * scale,
      height: clonedElement.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      },
    });

    return { dataUrl, fileName };
  } finally {
    // Clean up the cloned element
    if (document.body.contains(clonedElement)) {
      document.body.removeChild(clonedElement);
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
