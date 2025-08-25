import PDFDocument from 'pdfkit';

export const font_size = 10;
export const totalPDFDocumentWith = 615;
export const totalPDFDocumentHeight = 795;

export const start_pos_y = 100;
export const posYAddition = 20;

export const validateAdditionPage = (
  doc: typeof PDFDocument,
  posY: number,
  onAdd?: () => void
): number => {
  if (posY >= 650) {
    addPDFPage(doc);
    posY = 100;
    onAdd?.();
  }
  return posY;
};

export const addPDFPage = (doc: typeof PDFDocument) => {
  doc.addPage();
};

export const writeBoldPDFDoc = (
  doc: typeof PDFDocument,
  value: string,
  posX: number,
  posY: number,
  fonSize = 15
) => {
  doc
    .font('api-assets/pdf-fonts/sen/Sen-Bold.ttf')
    .fontSize(fonSize)
    .text(value, posX, posY);
};

export const writePDFDoc = (
  doc: typeof PDFDocument,
  value: string,
  posX: number,
  posY: number,
  fonSize = 15
) => {
  doc
    .font('api-assets/pdf-fonts/sen/Sen-Regular.ttf')
    .fontSize(fonSize)
    .text(value, posX, posY);
};

export const writeLinePDFDoc = (doc: typeof PDFDocument, posY: number) => {
  doc.save().moveTo(10, posY).lineTo(550, posY).fill('#000000');
};

export const writeTableLinePDFDoc = (doc: typeof PDFDocument, posY: number) => {
  doc.save().moveTo(20, posY).lineTo(590, posY).fill('#000000');
};

export const writeImagePDFDoc = (
  doc: typeof PDFDocument,
  pathImage: string,
  posX: number,
  posY: number,
  fitW: number,
  fitH: number = fitW
) => {
  doc.image(pathImage, posX, posY, {
    fit: [fitW, fitH],
    align: 'center',
    valign: 'center',
  });
};

export const buildRectangle = (
  doc: typeof PDFDocument,
  posX: number,
  posY: number,
  fitW: number,
  fitH: number,
  color: string
) => {
  doc.save().rect(posX, posY, fitW, fitH).fill(color);
};

export const finishPDFDocument = (doc: typeof PDFDocument) => {
  doc.end();
};
