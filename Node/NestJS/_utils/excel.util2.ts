import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import * as crypto from 'crypto';
import { fileExists } from './files.util';

export const getRandomFileName = () => {
    return crypto.randomUUID();
}

export const existInternalFile = (path: string): boolean => {
  try {
    return fs.existsSync(path);
  } catch(err) {
    console.error(err);
    throw new Error(err.message);
  }
}
  
export const writeInternalFile = (pathFile: string, fileName: string, jsonContent: string) => {
  try {                             
      const jsonData = JSON.parse(jsonContent);
      const cantProd_order=[];
      let i=0
      for (i; i < jsonData.length ; i++)
      {
        cantProd_order.push(jsonData[i].ordersDetail.length);
      }
      const excelData = [];
      i=0;  
      //crear los encabezados de las columnas
      excelData.push(['NOM CLIENTE','REF-PRODUCTO','COLOR','QUANTITY','POS']);
      let z=0;
      for (i;i<cantProd_order.length;i++)
      {
        let j=0;          
        for(j;j<cantProd_order[i];j++)
        {
          excelData.push([jsonData[i].ordersDetail[j].productPrice.client.name,jsonData[i].ordersDetail[j].productPrice.product.ref,jsonData[i].ordersDetail[j].color.cod,jsonData[i].ordersDetail[j].quantity,i+"-"+j]);
        }
      }
      
      // Crear Excel y una hoja de cálculo
      // Pero abrir existente si existe 
      let wb = xlsx.utils.book_new();
      if(fileExists(path.join(pathFile, fileName))){
        wb = xlsx.readFile(path.join(pathFile, fileName));
      }
      
      // Abrir hoja de cálculo si existe
      let ws = wb.Sheets['HT- Ordenes'];

      //Si no, crear una nueva
      if(!ws){
        ws = xlsx.utils.aoa_to_sheet(excelData);
        // Agregar la hoja de cálculo NUEVA al libro de trabajo
        xlsx.utils.book_append_sheet(wb, ws, 'HT- Ordenes');
      } else {
        // Agregar datos a la hoja de cálculo existente
        const newRowIndex = xlsx.utils.sheet_add_json(wb, excelData, { skipHeader: true, origin: -1 });
      }

      
                              
      // Escribir el libro de trabajo en un archivo
      const buffer = xlsx.write(wb, { type: 'buffer' });
      fs.writeFileSync(path.join(pathFile, fileName), buffer);
        
      } catch(err) {
        console.log(err.message);
        throw new Error(err.message);
      }
  }

export const readBase64InternalFile = (pathFile: string, fileName: string) : string => {
  try {
    return fs.readFileSync(path.join(pathFile, fileName), {encoding: 'base64'});
  } catch(err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export const deleteInternalFile = (pathFile: string, fileName: string) => {
  try {
    fs.unlinkSync(path.join(pathFile, fileName))
  } catch(err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}


