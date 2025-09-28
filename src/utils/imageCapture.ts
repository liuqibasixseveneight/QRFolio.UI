// @ts-ignore
import * as domtoimage from 'dom-to-image-more';

export interface ImageCaptureOptions {
  quality?: number;
  backgroundColor?: string;
  scale?: number;
}

export interface ImageCaptureResult {
  dataUrl: string;
  fileName: string;
}

export const captureElementAsImage = async (
  element: HTMLElement,
  fileName: string,
  options: ImageCaptureOptions = {}
): Promise<ImageCaptureResult> => {
  const { quality = 0.95, backgroundColor = '#ffffff', scale = 2 } = options;

  const tempStyle = document.createElement('style');
  tempStyle.id = 'temp-qr-border-removal';
  tempStyle.textContent = `
    * {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    .logo, [class*="logo"], svg[class*="logo"], svg[class*="Logo"] {
      border: unset !important;
      outline: unset !important;
      box-shadow: unset !important;
    }
    canvas, svg, div[class*="qr"], div[class*="QR"] {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  `;
  document.head.appendChild(tempStyle);

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const dataUrl = await domtoimage.toPng(element, {
      quality,
      bgcolor: backgroundColor,
      width: element.offsetWidth * scale,
      height: element.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      },
    });

    return { dataUrl, fileName };
  } finally {
    const tempStyleElement = document.getElementById('temp-qr-border-removal');
    if (tempStyleElement) {
      document.head.removeChild(tempStyleElement);
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
