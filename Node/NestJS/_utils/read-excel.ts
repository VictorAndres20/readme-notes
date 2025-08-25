import * as xlsx from 'xlsx';

export const readExcelByBytes = <T>(base64String: string) => {
  const excelBuffer = Buffer.from(base64String, 'base64');
  const workbook = xlsx.read(excelBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json<T>(worksheet);
};
