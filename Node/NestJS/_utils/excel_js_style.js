import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx-js-style';
import * as crypto from 'crypto';
import { AcademicPart } from 'src/api/academic_part/entity/academic_part.entity';

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
  
export const writeInternalFile = (data1: AcademicPart[], data2: AcademicPart[], data3: AcademicPart[]) => {
    try { 
        const term_percents = [30,30,40];
        // Create Workbook
        let pathFile = `${__dirname}`;
        let fileName = `report_student_${getRandomFileName()}.xlsx`;
        let wb = xlsx.utils.book_new();
        const terms = [data1, data2, data3];
        let bytes = null;
        const headerStyle = { font: { bold: true, }, fill: { fgColor: { rgb: "DDDDDD" } } };
        const totalAPStyle = { font: { bold: true, }, fill: { fgColor: { rgb: "E2FFD6" } } };
        const totalStyle = { font: { bold: true, }, fill: { fgColor: { rgb: "B1FA93" } } };
        const headers = [
            {v: 'Parte_Academica', t: "s", s: {...headerStyle} },
            {v: 'Concepto_Academico', t: "s", s: {...headerStyle} },
            {v: 'Grupo_Competencia', t: "s", s: {...headerStyle} },
            {v: 'Competencia', t: "s", s: {...headerStyle} },
            {v: 'Actividad', t: "s", s: {...headerStyle} },
            {v: 'Calificacion_1', t: "s", s: {...headerStyle} }, 
            {v: 'Calificacion_2', t: "s", s: {...headerStyle} },
            {v: 'Adicional', t: "s", s: {...headerStyle} },
            {v: 'total', t: "s", s: {...headerStyle} },
        ];
        
        for (let index = 0; index < terms.length; index++) {
            let excelData = [];
            const data = terms[index];
            let totalTerm = 0;
            excelData.push(headers);
            for (let index2 = 0; index2 < data.length; index2++) {
                const ap = data[index2];
                let totalAP = 0;
                for (let index3 = 0; index3 < ap.concepts.length; index3++) {
                    const element3 = ap.concepts[index3];
                    for (let index4 = 0; index4 < element3.groups.length; index4++) {
                        const element4 = element3.groups[index4];
                        for (let index5 = 0; index5 < element4.competencies.length; index5++) {
                            const element5 = element4.competencies[index5];
                            let activityData = [];
                            for (let index6 = 0; index6 < element5.activities.length; index6++) {
                                const activity = element5.activities[index6];
                                const evaluations = activity.forms[0]?.evaluations.sort((a, b) => a.order_value - b.order_value );
                                const value1 = evaluations[0] ? evaluations[0].order_value === 1 ? Number(evaluations[0].value) : 0 : 0;
                                const value2 = evaluations[1] ? evaluations[1].order_value === 2 ? Number(evaluations[1].value) : 0 : 0;
                                const value3 = evaluations[2] ? evaluations[2].order_value === 3 ? Number(evaluations[2].value) : 0 : 0;
                                const totalAc = value1 + value2 + value3;
                                totalAP += value1 + value2 + value3;
                                activityData = [ap.name, element3.name, element4.name, element5.name, activity.name, value1, value2, value3, totalAc];
                                excelData.push(activityData);
                            }                            
                        }
                    }
                }
                totalTerm += totalAP;
                excelData.push(Array.from({ length: 9 }).map((_, index) => ( index === 8 ? {v: totalAP, t: "n", s: {...totalAPStyle} } : {v: '', t: "s", s: {...totalAPStyle} } )));
            }
            excelData.push(Array.from({ length: 9 }).map((_, i) => ( i === 8 ? {v: totalTerm, t: "n", s: {...totalAPStyle} } : {v: '', t: "s", s: {...totalAPStyle} } )));
            excelData.push(Array.from({ length: 9 }).map((_, i) => ( i === 8 ? {v: totalTerm / term_percents[index], t: "n", s: {...totalAPStyle} } : {v: '', t: "s", s: {...totalAPStyle} } )));
            excelData.push(Array.from({ length: 9 }).map((_, i) => ( i === 8 ? {v: totalTerm / term_percents[index] * (term_percents[index] / 100), t: "n", s: {...totalStyle} } : {v: '', t: "s", s: {...totalStyle} } )));
            let ws = xlsx.utils.aoa_to_sheet(excelData);
            xlsx.utils.book_append_sheet(wb, ws, `Corte${index + 1}`);
            excelData = [];
        }
        // Escribir el libro de trabajo en un archivo
        const buffer = xlsx.write(wb, { type: 'buffer' });
        fs.writeFileSync(path.join(pathFile, fileName), buffer);

        bytes = readBase64InternalFile(pathFile, fileName);       
        deleteInternalFile(pathFile, fileName);
        return bytes;

        
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


